const researchData = require("../data/data.json");

export default function calculateROI(formData, adminDetails) {
  const NUMBER_OF_YEARS = 3;
  const MONTHS_PER_YEAR = 12;
  const BENEFIT_FACTOR = 0.8;

  function calculateGrowthRate(onboardsPerYear, orgSize) {
    return onboardsPerYear / orgSize + 1;
  }
  // fulTimeEmployees will always be a number as it is a required field and the onChange funciton returns a number
  // partTimeCasualEmployees and casual employees however may be empty string as these fields aren't required and
  // the default state is an empty string "" to avoid displaying '0' when the user first sees the form
  const partTimeCasualEmployees = formData.partTimeCasualEmployees || 0;
  const orgSizeYear1 = formData.fullTimeEmployees + partTimeCasualEmployees;
  const growthRate = calculateGrowthRate(
    adminDetails.onboardsPerYear,
    orgSizeYear1
  );

  const orgSizeYear2 = orgSizeYear1 * growthRate;
  const orgSizeYear3 = orgSizeYear2 * growthRate;

  const adminsYear2 = formData.admins * growthRate;
  const adminsYear3 = adminsYear2 * growthRate;

  const fullTimeEmployeesYear2 = formData.fullTimeEmployees * growthRate;
  const fullTimeEmployeesYear3 = fullTimeEmployeesYear2 * growthRate;

  const partTimeEmployeesYear2 = partTimeCasualEmployees * growthRate;
  const partTimeEmployeesYear3 = partTimeEmployeesYear2 * growthRate;

  // Add above values to formData object
  formData = {
    ...formData,
    partTimeCasualEmployees,
    growthRate,
    orgSizeYear1,
    orgSizeYear2,
    orgSizeYear3,
    adminsYear2,
    adminsYear3,
    fullTimeEmployeesYear2,
    fullTimeEmployeesYear3,
    partTimeEmployeesYear2,
    partTimeEmployeesYear3,
  };

  // Add non-mandatory form fields to formData object
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

  // This currenlty has to be outside the formData object as it is passed to another object later on?
  const upfrontImplementationCost =
    formData.implementationType === "guided"
      ? researchData[formData.country][formData.plan]["cost_2"]["upfront"]
      : formData.implementationType === "managed"
      ? researchData[formData.country][formData.plan]["cost_2"]["managed"]
      : 0;

  // **********************
  // BENEFIT 1
  // **********************
  // Hours saved per month per hr admin if the total hours spent per month (determined from form) / number of admins
  // mulptied by these values which i can't remember where they came from?
  // these figures come from the report - average time saved
  function calculateBenefit1(formData) {
    const TIME_SAVED_YEAR_ONE = 0.39;
    const TIME_SAVED_YEAR_TWO = 0.405;
    const TIME_SAVED_YEAR_THREE = 0.42;
    const timeSavedYear1 =
      (formData.hoursSpentOnEmploymentTasks / formData.admins) *
      TIME_SAVED_YEAR_ONE;
    const timeSavedYear2 =
      (formData.hoursSpentOnEmploymentTasks / formData.admins) *
      TIME_SAVED_YEAR_TWO;
    const timeSavedYear3 =
      (formData.hoursSpentOnEmploymentTasks / formData.admins) *
      TIME_SAVED_YEAR_THREE;

    const year1Benefit1 =
      formData.admins *
      timeSavedYear1 *
      formData.hrBurdenedRate *
      MONTHS_PER_YEAR *
      BENEFIT_FACTOR;
    const year2Benefit1 =
      formData.adminsYear2 *
      timeSavedYear2 *
      formData.hrBurdenedRate *
      MONTHS_PER_YEAR *
      BENEFIT_FACTOR;
    const year3Benefit1 =
      formData.adminsYear3 *
      timeSavedYear3 *
      formData.hrBurdenedRate *
      MONTHS_PER_YEAR *
      BENEFIT_FACTOR;

    return {
      year1Benefit1: year1Benefit1,
      year2Benefit1: year2Benefit1,
      year3Benefit1: year3Benefit1,
    };
  }
  // **********************
  // BENEFIT 2
  // **********************
  const calculateBenefit2 = (formData) => {
    const EMPLOYMENT_ADMIN_HOURS_PER_DAY = 0.05;

    const calcFinancialGainsAdjustment = (
      fullTime,
      partTime,
      year,
      efficiencyAdjustment
    ) => {
      const employmentAdminHoursPerYearFullTime =
        EMPLOYMENT_ADMIN_HOURS_PER_DAY * 5 * 52.18 * fullTime;
      const employmentAdminHoursPerYearPartTime =
        EMPLOYMENT_ADMIN_HOURS_PER_DAY * 2.5 * 52.18 * partTime;
      const orgReductionAdminReductionTimeSinceEH =
        researchData[formData.country][formData.plan]["benefit_2"][
          `year_${year - 1}`
        ];

      const totalHoursSavedPerYear =
        (employmentAdminHoursPerYearFullTime +
          employmentAdminHoursPerYearPartTime) *
        orgReductionAdminReductionTimeSinceEH;
      const totalHoursSavedAdjusted =
        efficiencyAdjustment * totalHoursSavedPerYear;
      const orgOverallFincancialGainsAdjusted =
        formData.employeeBurdenedRate *
        totalHoursSavedAdjusted *
        BENEFIT_FACTOR;
      return orgOverallFincancialGainsAdjusted;
    };

    const EFFICIENCY_ADJUSTMENTS = [0.515, 0.575, 0.634];
    const orgOverallFincancialGainsAdjustedValues = [];

    for (let year = 1; year <= NUMBER_OF_YEARS; year++) {
      const efficiencyAdjustment = EFFICIENCY_ADJUSTMENTS[year - 1];
      const fullTimeEmployees =
        formData[`fullTimeEmployeesYear${year}`] || formData.fullTimeEmployees;
      const partTimeEmployees =
        formData[`partTimeEmployeesYear${year}`] ||
        formData.partTimeCasualEmployees;

      const orgOverallFincancialGainsAdjusted = calcFinancialGainsAdjustment(
        fullTimeEmployees,
        partTimeEmployees,
        year,
        efficiencyAdjustment
      );
      orgOverallFincancialGainsAdjustedValues.push(
        orgOverallFincancialGainsAdjusted
      );
    }
    return orgOverallFincancialGainsAdjustedValues;
  };
  // **********************
  // BENEFIT 3
  // **********************
  const calculateBenefit3 = (formData) => {
    const AVG_PERC_SAVED_IN_SERVICE_PROVIDER_COSTS = 0.246;

    const costSavedInServiceProviders =
      formData.annualServicesSpend * AVG_PERC_SAVED_IN_SERVICE_PROVIDER_COSTS;

    const costSavedInServicesAndTechnology = [];

    for (let year = 1; year <= NUMBER_OF_YEARS; year++) {
      if (year === 1) {
        costSavedInServicesAndTechnology.push(
          costSavedInServiceProviders * BENEFIT_FACTOR
        );
      } else {
        costSavedInServicesAndTechnology.push(
          (costSavedInServiceProviders + formData.costsSavedOnTech) *
            BENEFIT_FACTOR
        );
      }
    }
    return costSavedInServicesAndTechnology;
  };
  // **********************
  // BENEFIT 4
  // **********************
  const calculateBenefit4 = (formData, researchData) => {
    const PERC_PAPER = 0.684;
    const avgReductionInPaper = [0.492, 0.563, 0.653];
    const costSavedInPrinting = [];

    console.log(researchData[formData.country]["printing_costs"]);
    for (let year = 1; year <= NUMBER_OF_YEARS; year++) {
      const employeeDocs =
        formData.pagesPerYear * formData[`orgSizeYear${year}`];
      const printingCosts =
        employeeDocs * researchData[formData.country]["printing_costs"];
      const totalPrintingCosts = PERC_PAPER * printingCosts;

      const totalSaved = totalPrintingCosts * avgReductionInPaper[year - 1];
      const reductionPrintingAdjusted = totalSaved * BENEFIT_FACTOR;

      costSavedInPrinting.push(reductionPrintingAdjusted);
    }
    return costSavedInPrinting;
  };

  // **********************
  // COST 1 - Subscription Costs
  // **********************
  const calculateCost1 = (formData, researchData) => {
    const subscriptionCosts = [];

    for (let year = 1; year <= NUMBER_OF_YEARS; year++) {
      const orgSize = formData[`orgSizeYear${year}`];
      const cost =
        researchData[formData.country][formData.plan]["cost_1"][
          `year_${year - 1}`
        ];
      const subscriptionCost = orgSize * cost * MONTHS_PER_YEAR;

      subscriptionCosts.push(subscriptionCost);
    }

    return subscriptionCosts;
  };
  // **********************
  // COST 2 - Internal Implementation Costs
  // **********************
  const calculateInternalImplementationCosts = (formData) => {
    const IMPLEMENTATION_FACTOR = 1.2;
    const HOURS_SPENT_ON_MAINTENANCE_PER_MONTH = 2;
    const internalImplementationCosts = [];
    // Upfront
    const internalImplementationCostUpfront =
      formData.plan.includes("HR") && formData.plan.includes("Payroll")
        ? 20 * formData.admins * formData.hrBurdenedRate * IMPLEMENTATION_FACTOR
        : 10 *
          formData.admins *
          formData.hrBurdenedRate *
          IMPLEMENTATION_FACTOR;
    internalImplementationCosts.push(internalImplementationCostUpfront);
    // Ongoing
    for (let year = 1; year <= NUMBER_OF_YEARS; year++) {
      const admins =
        year === 1 ? formData.admins : formData[`adminsYear${year}`];
      const internalImplementationCost =
        HOURS_SPENT_ON_MAINTENANCE_PER_MONTH *
        formData.hrBurdenedRate *
        admins *
        IMPLEMENTATION_FACTOR *
        MONTHS_PER_YEAR;

      internalImplementationCosts.push(internalImplementationCost);
    }

    return internalImplementationCosts;
  };

  // Execture all calculations
  const { year1Benefit1, year2Benefit1, year3Benefit1 } =
    calculateBenefit1(formData);
  const [
    orgOverallFincancialGainsAdjustedYear1,
    orgOverallFincancialGainsAdjustedYear2,
    orgOverallFincancialGainsAdjustedYear3,
  ] = calculateBenefit2(formData);

  const [
    costSavedInServicesAndTechnologyYear1,
    costSavedInServicesAndTechnologyYear2,
    costSavedInServicesAndTechnologyYear3,
  ] = calculateBenefit3(formData);
  const [
    reductionPrintingAdjustedYear1,
    reductionPrintingAdjustedYear2,
    reductionPrintingAdjustedYear3,
  ] = calculateBenefit4(formData, researchData);

  const [subscriptionCostYear1, subscriptionCostYear2, subscriptionCostYear3] =
    calculateCost1(formData, researchData);
  const [
    internalImplementationCostUpfront,
    internalImplementationCostYear1,
    internalImplementationCostYear2,
    internalImplementationCostYear3,
  ] = calculateInternalImplementationCosts(formData);

  // Total benefits
  const totalBenefitsYear1 =
    year1Benefit1 +
    orgOverallFincancialGainsAdjustedYear1 +
    costSavedInServicesAndTechnologyYear1 +
    reductionPrintingAdjustedYear1;

  const totalBenefitsYear2 =
    year2Benefit1 +
    orgOverallFincancialGainsAdjustedYear2 +
    costSavedInServicesAndTechnologyYear2 +
    reductionPrintingAdjustedYear2;

  const totalBenefitsYear3 =
    year3Benefit1 +
    orgOverallFincancialGainsAdjustedYear3 +
    costSavedInServicesAndTechnologyYear3 +
    reductionPrintingAdjustedYear3;

  const threeYeartotalbenefit1 = year1Benefit1 + year2Benefit1 + year3Benefit1;
  const threeYeartotalbenefit2 =
    orgOverallFincancialGainsAdjustedYear1 +
    orgOverallFincancialGainsAdjustedYear2 +
    orgOverallFincancialGainsAdjustedYear3;
  const threeYeartotalbenefit3 =
    costSavedInServicesAndTechnologyYear1 +
    costSavedInServicesAndTechnologyYear2 +
    costSavedInServicesAndTechnologyYear3;
  const threeYeartotalbenefit4 =
    reductionPrintingAdjustedYear1 +
    reductionPrintingAdjustedYear2 +
    reductionPrintingAdjustedYear3;

  const threeYeartotalbenefits =
    totalBenefitsYear1 + totalBenefitsYear2 + totalBenefitsYear3;

  // Total Costs
  const totalUpfront =
    upfrontImplementationCost + internalImplementationCostUpfront;
  const totalCostYear1 =
    subscriptionCostYear1 + internalImplementationCostYear1;
  const totalCostYear2 =
    subscriptionCostYear2 + internalImplementationCostYear2;
  const totalCostYear3 =
    subscriptionCostYear3 + internalImplementationCostYear3;
  const threeYearTotalCost =
    totalUpfront + totalCostYear1 + totalCostYear2 + totalCostYear3;

  const subscriptionCostYearTotal =
    subscriptionCostYear1 + subscriptionCostYear2 + subscriptionCostYear3;
  const internalImplementationCostTotal =
    internalImplementationCostUpfront +
    internalImplementationCostYear1 +
    internalImplementationCostYear2 +
    internalImplementationCostYear3;

  // Net benefits
  const upfrontNetBenefits = -totalUpfront;
  const year1NetBenefits = totalBenefitsYear1 - totalCostYear1;
  const year2NetBenefits = totalBenefitsYear2 - totalCostYear2;
  const year3NetBenefits = totalBenefitsYear3 - totalCostYear3;
  const threeYearTotalNetBenefits =
    upfrontNetBenefits + year1NetBenefits + year2NetBenefits + year3NetBenefits;

  // ROI
  const year1Roi = (year1NetBenefits / totalCostYear1) * 100;
  const year2Roi = (year2NetBenefits / totalCostYear2) * 100;
  const year3Roi = (year3NetBenefits / totalCostYear3) * 100;
  const threeYearTotalROI =
    (threeYearTotalNetBenefits / threeYearTotalCost) * 100;

  const totalTable = {
    totalBenefitsYear1,
    totalBenefitsYear2,
    totalBenefitsYear3,
    threeYeartotalbenefits,
    totalUpfront,
    totalCostYear1,
    totalCostYear2,
    totalCostYear3,
    threeYearTotalCost,
    upfrontNetBenefits,
    year1NetBenefits,
    year2NetBenefits,
    year3NetBenefits,
    threeYearTotalNetBenefits,
    year1Roi,
    year2Roi,
    year3Roi,
    threeYearTotalROI,
  };

  const benefitsTable = {
    year1Benefit1,
    year2Benefit1,
    year3Benefit1,
    threeYeartotalbenefit1,
    orgOverallFincancialGainsAdjustedYear1,
    orgOverallFincancialGainsAdjustedYear2,
    orgOverallFincancialGainsAdjustedYear3,
    threeYeartotalbenefit2,
    costSavedInServicesAndTechnologyYear1,
    costSavedInServicesAndTechnologyYear2,
    costSavedInServicesAndTechnologyYear3,
    threeYeartotalbenefit3,
    reductionPrintingAdjustedYear1,
    reductionPrintingAdjustedYear2,
    reductionPrintingAdjustedYear3,
    threeYeartotalbenefit4,
    totalBenefitsYear1,
    totalBenefitsYear2,
    totalBenefitsYear3,
    threeYeartotalbenefits,
  };

  const costsTable = {
    subscriptionCostYear1,
    subscriptionCostYear2,
    subscriptionCostYear3,
    subscriptionCostYearTotal,
    upfrontImplementationCost,
    internalImplementationCostUpfront,
    internalImplementationCostYear1,
    internalImplementationCostYear2,
    internalImplementationCostYear3,
    internalImplementationCostTotal,
    totalCostYear1,
    totalCostYear2,
    totalCostYear3,
    threeYearTotalCost,
  };

  return { totalTable, benefitsTable, costsTable };
}
