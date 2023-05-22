const researchData = require("../data/data.json");

export default function calculateROI(formData, adminDetails) {
  const NUMBER_OF_YEARS = 3;
  const MONTHS_PER_YEAR = 12;
  const BENEFIT_FACTOR = 0.8;
  const IMPLEMENTATION_FACTOR = 1.2;

  function calculateGrowthRate(onboardsPerYear, orgSize) {
    return onboardsPerYear / orgSize + 1;
  }
  // fulTimeEmployees will always be a number as it is a required field and the onChange funciton returns a number
  // partTimeCasualEmployees however may be empty string as these fields aren't required and
  // the default state is an empty string "" to avoid displaying '0' when the user first sees the form
  const partTimeCasualEmployees = formData.partTimeCasualEmployees || 0;
  const orgSize = formData.fullTimeEmployees + partTimeCasualEmployees;
  const growthRate = calculateGrowthRate(adminDetails.onboardsPerYear, orgSize);

  // Add above values to formData object
  formData = {
    ...formData,
    partTimeCasualEmployees,
    orgSize,
    growthRate,
  };

  // Add non-mandatory form fields to formData object using resarch data
  formData = {
    ...formData,
    hrBurdenedRate:
      formData.hrBurdenedRate ||
      researchData[formData.country]["hr_hourly_rate"],
    employeeBurdenedRate:
      formData.employeeBurdenedRate ||
      researchData[formData.country]["employee_hourly_rate"],
    costsSavedOnTech:
      formData.costsSavedOnTech ||
      researchData[formData.country]["costs_saved_on_tech"],
    annualServicesSpend:
      formData.annualServicesSpend ||
      researchData[formData.country]["annual_services_spend"],
    pagesPerYear:
      (formData.pagesPerYear &&
        formData.pagesPerYear / formData.orgSizeYear1) ||
      20,
    implementationType: formData.implementationType || "guided",
  };

  function calculateEmploymentBenefit(formData, year) {
    // Time saved determined from Nat's research.
    // Currently limited to 3 years.
    const TIME_SAVED_RESEARCH_VALUES = {
      1: 0.39,
      2: 0.405,
      3: 0.42,
    };
    const timeSaved =
      (formData.hoursSpentOnEmploymentTasks / formData.admins) *
      TIME_SAVED_RESEARCH_VALUES[year];
    const employmentBenefit =
      formData.admins *
      timeSaved *
      formData.hrBurdenedRate *
      MONTHS_PER_YEAR *
      BENEFIT_FACTOR;
    return employmentBenefit;
  }
  const calculateOrganisationBenefit = (formData, year) => {
    const EMPLOYMENT_ADMIN_HOURS_PER_DAY = 0.05;
    const EFFICIENCY_ADJUSTMENTS_RESEARCH_VALUES = {
      1: 0.515,
      2: 0.575,
      3: 0.634,
    };
    const adminHoursFullTime =
      EMPLOYMENT_ADMIN_HOURS_PER_DAY * 5 * 52.18 * formData.fullTimeEmployees;
    const adminHoursPartTime =
      EMPLOYMENT_ADMIN_HOURS_PER_DAY *
      2.5 *
      52.18 *
      formData.partTimeCasualEmployees;
    const adminReductionTimeSinceEH =
      researchData[formData.country][formData.plan]["benefit_2"][
        `year_${year - 1}`
      ];
    const totalHoursSaved =
      (adminHoursFullTime + adminHoursPartTime) * adminReductionTimeSinceEH;
    const totalHoursSavedAdjusted =
      EFFICIENCY_ADJUSTMENTS_RESEARCH_VALUES[year] * totalHoursSaved;
    const organisationBenefit =
      formData.employeeBurdenedRate * totalHoursSavedAdjusted * BENEFIT_FACTOR;
    return organisationBenefit;
  };
  const calculateTechBenefit = (formData, year) => {
    const AVG_PERC_SAVED_IN_SERVICE_PROVIDER_COSTS = 0.246;

    // This doesn't need to be calculated every iteration of the loop
    const costSavedInServiceProviders =
      formData.annualServicesSpend * AVG_PERC_SAVED_IN_SERVICE_PROVIDER_COSTS;

    const techBenefit =
      year === 1
        ? costSavedInServiceProviders * BENEFIT_FACTOR
        : (costSavedInServiceProviders + formData.costsSavedOnTech) *
          BENEFIT_FACTOR;
    return techBenefit;
  };
  const calculatePrintingBenefit = (formData, year) => {
    const PERC_PAPER = 0.684;
    const avgReductionInPaper = {
      1: 0.492,
      2: 0.563,
      3: 0.653,
    };

    const employeeDocs = formData.pagesPerYear * formData.orgSize;
    const printingCosts =
      employeeDocs * researchData[formData.country]["printing_costs"];
    const totalPrintingCosts = PERC_PAPER * printingCosts;

    const totalSaved = totalPrintingCosts * avgReductionInPaper[year];
    const printingBenefit = totalSaved * BENEFIT_FACTOR;

    return printingBenefit;
  };
  const calculateSubscriptionCost = (formData, year) => {
    const subscriptionCost =
      researchData[formData.country][formData.plan]["cost_1"][
        `year_${year - 1}`
      ] *
      formData.orgSize *
      MONTHS_PER_YEAR;

    return subscriptionCost;
  };
  const calculateImplementationCost = (formData) => {
    const externalImplementationCost =
      formData.implementationType === "guided"
        ? researchData[formData.country][formData.plan]["cost_2"]["upfront"]
        : formData.implementationType === "managed"
        ? researchData[formData.country][formData.plan]["cost_2"]["managed"]
        : 0;

    const internalImplementationCost =
      formData.plan.includes("HR") && formData.plan.includes("Payroll")
        ? 20 * formData.admins * formData.hrBurdenedRate * IMPLEMENTATION_FACTOR
        : 10 *
          formData.admins *
          formData.hrBurdenedRate *
          IMPLEMENTATION_FACTOR;
    return [internalImplementationCost, externalImplementationCost];
  };
  const calculateOngoingCosts = (formData) => {
    const HOURS_SPENT_ON_MAINTENANCE_PER_MONTH = 2;
    const onGoingCost =
      HOURS_SPENT_ON_MAINTENANCE_PER_MONTH *
      formData.hrBurdenedRate *
      formData.admins *
      IMPLEMENTATION_FACTOR *
      MONTHS_PER_YEAR;

    return onGoingCost;
  };

  const employmentBenefits = [];
  const organisationBenefits = [];
  const techBenefits = [];
  const printingBenefits = [];
  const subscriptionCosts = [];
  const implementationCosts = calculateImplementationCost(formData);
  const onGoingCosts = [];
  const netBenefits = [];
  const ROIs = [];

  for (let year = 1; year <= NUMBER_OF_YEARS; year++) {
    const employmentBenefit = calculateEmploymentBenefit(formData, year);
    const organisationBenefit = calculateOrganisationBenefit(formData, year);
    const techBenefit = calculateTechBenefit(formData, year);
    const printingBenefit = calculatePrintingBenefit(formData, year);
    const subscriptionCost = calculateSubscriptionCost(formData, year);
    const onGoingCost = calculateOngoingCosts(formData);
    const netBenefit =
      employmentBenefit +
      organisationBenefit +
      techBenefit +
      printingBenefit -
      subscriptionCost -
      onGoingCost;
    const roi = (netBenefit / (subscriptionCost + onGoingCost)) * 100;

    employmentBenefits.push(employmentBenefit);
    organisationBenefits.push(organisationBenefit);
    techBenefits.push(techBenefit);
    printingBenefits.push(printingBenefit);
    subscriptionCosts.push(subscriptionCost);
    onGoingCosts.push(onGoingCost);
    netBenefits.push(netBenefit);
    ROIs.push(roi);

    // After each iteration, update the org size, admins, full time employees, and part time/casual employees
    // based on the growth rate
    formData = {
      ...formData,
      orgSize: formData.orgSize * growthRate,
      admins: formData.admins * growthRate,
      fullTimeEmployees: formData.fullTimeEmployees * growthRate,
      partTimeCasualEmployees: formData.partTimeCasualEmployees * growthRate,
    };
  }

  return [
    employmentBenefits,
    organisationBenefits,
    techBenefits,
    printingBenefits,
    subscriptionCosts,
    implementationCosts,
    onGoingCosts,
    netBenefits,
    ROIs,
  ];
}
