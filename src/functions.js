const mapping = require("./data.json");

// Have main calculation function which calls other functions in this file
// and returns all information required for the result tables

// Code should not execute here unless all mandatory form fields have been entered

export default function calculateROI(formData, onboardsPerYear) {
  const NUMBER_OF_YEARS = 3;
  // Values which are derived from input form data

  // fulTimeEmployees will always be a number as it is a required field and the onChange funciton returns a number
  // partTimeCasualEmployees and casual employees however may be empty string as these fields aren't required and
  // the default state is an empty string "" to avoid displaying '0' when the user first sees the form
  if (!formData.partTimeCasualEmployees) {
    formData = {
      ...formData,
      partTimeCasualEmployees: 0,
    };
  }

  formData = {
    ...formData,
    orgSize: formData.fullTimeEmployees + formData.partTimeCasualEmployees,
  };

  const growthRate = onboardsPerYear / formData.orgSize + 1;
  formData = {
    ...formData,
    growthRate: growthRate,
  };

  formData = {
    ...formData,
    orgSizeYear2: formData.orgSize * formData.growthRate,
  };
  formData = {
    ...formData,
    orgSizeYear3: formData.orgSizeYear2 * formData.growthRate,
  };
  formData = {
    ...formData,
    adminsYear2: formData.admins * formData.growthRate,
  };
  formData = {
    ...formData,
    adminsYear3: formData.adminsYear2 * formData.growthRate,
  };
  formData = {
    ...formData,
    fullTimeEmployeesYear2: formData.fullTimeEmployees * formData.growthRate,
  };
  formData = {
    ...formData,
    fullTimeEmployeesYear3:
      formData.fullTimeEmployeesYear2 * formData.growthRate,
  };
  formData = {
    ...formData,
    partTimeEmployeesYear2:
      formData.partTimeCasualEmployees * formData.growthRate,
  };
  formData = {
    ...formData,
    partTimeEmployeesYear3:
      formData.partTimeEmployeesYear2 * formData.growthRate,
  };
  // At the moment, going to assume these values have not been input and will use the default
  // The default values need to be set in react somehow?

  if (!formData.hrBurdenedRate) {
    formData = {
      ...formData,
      hrBurdenedRate: mapping[formData.country]["hr_hourly_rate"],
    };
  }

  if (!formData.employeeBurdenedRate) {
    formData = {
      ...formData,
      employeeBurdenedRate: mapping[formData.country]["employee_hourly_rate"],
    };
  }

  if (!formData.costsSavedOnTech) {
    formData = {
      ...formData,
      costsSavedOnTech: mapping[formData.country]["costs_saved_on_tech"],
    };
  }

  if (!formData.annualServicesSpend) {
    formData = {
      ...formData,
      annualServicesSpend: mapping[formData.country]["annual_services_spend"],
    };
  }

  // Now the number of pages per employee printed each year is done here to make it less confusing for the user:)
  if (!formData.pagesPerYear) {
    formData = {
      ...formData,
      // assumed to be 20 from nat's research
      pagesPerYear: 20,
    };
  } else {
    formData = {
      ...formData,
      pagesPerYear: formData.pagesPerYear / formData.orgSize,
    };
  }

  if (!formData.implementationType) {
    formData = {
      ...formData,
      // assumed to be guided implementation
      implementationType: "guided",
    };
  }

  let upfrontImplementationCost;
  if (formData.implementationType === "guided")
    upfrontImplementationCost =
      mapping[formData.country][formData.plan]["cost_2"]["upfront"];
  else if (formData.implementationType === "managed")
    upfrontImplementationCost =
      mapping[formData.country][formData.plan]["cost_2"]["managed"];
  // Assume self guided implementation which is 0 dollars
  else upfrontImplementationCost = 0;

  if (!formData.hoursSpentOnEmploymentTasks) {
    formData = {
      ...formData,
      hoursSpentOnEmploymentTasks: 0,
    };
  }

  // **********************
  // Where the calculations begin
  // **********************

  // **********************
  // BENEFIT 1
  // **********************
  let year1Benefit1;
  let year2Benefit1;
  let year3Benefit1;

  // If the user has not input anything for total hours spent on employment tasks, then the time saved
  // per month is dependent upon the plan selected and is pulled from nat's calculated values
  if (formData.hoursSpentOnEmploymentTasks === 0) {
    year1Benefit1 =
      formData.admins *
      mapping[formData.country][formData.plan]["benefit_1"]["year_0"] *
      formData.hrBurdenedRate *
      12 *
      0.8;
    year2Benefit1 =
      formData.adminsYear2 *
      mapping[formData.country][formData.plan]["benefit_1"]["year_1"] *
      formData.hrBurdenedRate *
      12 *
      0.8;
    year3Benefit1 =
      formData.adminsYear3 *
      mapping[formData.country][formData.plan]["benefit_1"]["year_2"] *
      formData.hrBurdenedRate *
      12 *
      0.8;
  } else {
    // If the user DOES input hours spent on employment tasks per month,

    // **********************
    // WHY ?!?!!?0
    // **********************
    // Hours saved per month per hr admin if the total hours spent per month (determined from form) / number of admins
    // mulptied by these values which i can't remember where they came from?
    // these figures come from the report - average time saved

    // THIS IS NOW DIFFERENT TO THE ORIGINAL!
    const timeSavedYear1 =
      (formData.hoursSpentOnEmploymentTasks / formData.admins) * 0.39;
    const timeSavesYear2 =
      (formData.hoursSpentOnEmploymentTasks / formData.admins) * 0.405;
    const timeSavedYear3 =
      (formData.hoursSpentOnEmploymentTasks / formData.admins) * 0.42;

    year1Benefit1 =
      formData.admins * timeSavedYear1 * formData.hrBurdenedRate * 12 * 0.8;
    year2Benefit1 =
      formData.adminsYear2 *
      timeSavesYear2 *
      formData.hrBurdenedRate *
      12 *
      0.8;
    year3Benefit1 =
      formData.adminsYear3 *
      timeSavedYear3 *
      formData.hrBurdenedRate *
      12 *
      0.8;
  }

  // **********************
  // BENEFIT 2 - Organisation financial gains
  // **********************

  // **********************
  // I don't think this is correct! need to calculate HOURS spent each year and also account for number of employees not inclucding admins
  // **********************
  const EMPLOYMENT_ADMIN_HOURS_PER_DAY = 0.05;

  const calcFinancialGainsAdjustment = (
    fullTime,
    partTime,
    // casual,
    year,
    efficiencyAdjustment
  ) => {
    const employmentAdminHoursPerYearFullTime =
      EMPLOYMENT_ADMIN_HOURS_PER_DAY * 5 * 52.18 * fullTime;
    const employmentAdminHoursPerYearPartTime =
      EMPLOYMENT_ADMIN_HOURS_PER_DAY * 2.5 * 52.18 * partTime;
    // const employmentAdminHoursPerYearCasual =
    //   EMPLOYMENT_ADMIN_HOURS_PER_DAY * 2.5 * 52.18 * casual;
    const orgReductionAdminReductionTimeSinceEH =
      mapping[formData.country][formData.plan]["benefit_2"][`year_${year}`];

    const totalHoursSavedPerYear =
      (employmentAdminHoursPerYearFullTime +
        employmentAdminHoursPerYearPartTime) *
      orgReductionAdminReductionTimeSinceEH;
    const totalHoursSavedAdjusted =
      efficiencyAdjustment * totalHoursSavedPerYear;
    const orgOverallFincancialGainsAdjusted =
      formData.employeeBurdenedRate * totalHoursSavedAdjusted * 0.8;
    return orgOverallFincancialGainsAdjusted;
  };

  let efficiencyAdjustment;
  let orgOverallFincancialGainsAdjustedYear1;
  let orgOverallFincancialGainsAdjustedYear2;
  let orgOverallFincancialGainsAdjustedYear3;

  for (let year = 0; year < NUMBER_OF_YEARS; year++) {
    if (year === 0) {
      efficiencyAdjustment = 0.515;
      orgOverallFincancialGainsAdjustedYear1 = calcFinancialGainsAdjustment(
        formData.fullTimeEmployees,
        formData.partTimeCasualEmployees,
        // formData.casualEmployees,
        year,
        efficiencyAdjustment
      );
    } else if (year === 1) {
      efficiencyAdjustment = 0.575;
      orgOverallFincancialGainsAdjustedYear2 = calcFinancialGainsAdjustment(
        formData.fullTimeEmployeesYear2,
        formData.partTimeEmployeesYear2,
        // formData.casualEmployeesYear2,
        year,
        efficiencyAdjustment
      );
    } else {
      efficiencyAdjustment = 0.634;
      orgOverallFincancialGainsAdjustedYear3 = calcFinancialGainsAdjustment(
        formData.fullTimeEmployeesYear3,
        formData.partTimeEmployeesYear3,
        // formData.casualEmployeesYear3,
        year,
        efficiencyAdjustment
      );
    }
  }

  // **********************
  // BENEFIT 3
  // **********************
  const AVG_PERC_SAVED_IN_SERVICE_PROVIDER_COSTS = 0.246;
  const costSavedInServiceProviders =
    formData.annualServicesSpend * AVG_PERC_SAVED_IN_SERVICE_PROVIDER_COSTS;

  let costSavedInServicesAndTechnologyYear1;
  let costSavedInServicesAndTechnologyYear2;
  let costSavedInServicesAndTechnologyYear3;
  for (let year = 0; year < NUMBER_OF_YEARS; year++) {
    if (year == 0) {
      costSavedInServicesAndTechnologyYear1 = costSavedInServiceProviders * 0.8;
    } else {
      // could this be done recursively?
      costSavedInServicesAndTechnologyYear2 =
        (costSavedInServiceProviders + formData.costsSavedOnTech) * 0.8;
      costSavedInServicesAndTechnologyYear3 =
        costSavedInServicesAndTechnologyYear2;
    }
  }

  // **********************
  // BENEFIT 4
  // Can this section be written better? DRY?
  // **********************

  // where does this value come from?
  const PERC_PAPER = 0.684;

  const employeeDocs = formData.pagesPerYear * formData.orgSize;
  const printingCosts =
    employeeDocs * mapping[formData.country]["printing_costs"];

  const totalPrintingCosts = PERC_PAPER * printingCosts;
  const avgReductionInPaperYear1 = 0.492;
  const totalSaved = totalPrintingCosts * avgReductionInPaperYear1;

  const reductionPrintingAdjustedYear1 = totalSaved * 0.8;

  const employeeDocsYear2 = formData.pagesPerYear * formData.orgSizeYear2;
  const printingCostsYear2 = employeeDocsYear2 * 0.5;

  const totalPrintingCostsYear2 = PERC_PAPER * printingCostsYear2;
  const avgReductionInPaperYear2 = 0.563;
  const totalSavedYear2 = totalPrintingCostsYear2 * avgReductionInPaperYear2;

  const reductionPrintingAdjustedYear2 = totalSavedYear2 * 0.8;

  const employeeDocsYear3 = formData.pagesPerYear * formData.orgSizeYear3;
  const printingCostsYear3 = employeeDocsYear3 * 0.5;

  const totalPrintingCostsYear3 = PERC_PAPER * printingCostsYear3;
  const avgReductionInPaperYear3 = 0.653;
  const totalSavedYear3 = totalPrintingCostsYear3 * avgReductionInPaperYear3;

  const reductionPrintingAdjustedYear3 = totalSavedYear3 * 0.8;

  // **********************
  // COSTS
  // **********************

  // **********************
  // COST 1 - Subscription Costs
  // **********************
  const subscriptionCostYear1 =
    formData.orgSize *
    mapping[formData.country][formData.plan]["cost_1"]["year_0"] *
    12;
  const subscriptionCostYear2 =
    formData.orgSizeYear2 *
    mapping[formData.country][formData.plan]["cost_1"]["year_1"] *
    12;
  const subscriptionCostYear3 =
    formData.orgSizeYear3 *
    mapping[formData.country][formData.plan]["cost_1"]["year_2"] *
    12;

  // **********************
  // COST 2 - Internal Implementation Costs
  // **********************

  // Upfront
  let internalImplementationCostUpfront;
  if (formData.plan.includes("HR") && formData.plan.includes("Payroll"))
    internalImplementationCostUpfront =
      20 * formData.admins * formData.hrBurdenedRate * 1.2;
  else
    internalImplementationCostUpfront =
      10 * formData.admins * formData.hrBurdenedRate * 1.2;

  // Ongoing
  const HOURS_SPENT_ON_MAINTENANCE_PER_MONTH = 2;
  const internalImplementationCostYear1 =
    HOURS_SPENT_ON_MAINTENANCE_PER_MONTH *
    formData.hrBurdenedRate *
    formData.admins *
    1.2 *
    12;
  const internalImplementationCostYear2 =
    HOURS_SPENT_ON_MAINTENANCE_PER_MONTH *
    formData.hrBurdenedRate *
    formData.adminsYear2 *
    1.2 *
    12;
  const internalImplementationCostYear3 =
    HOURS_SPENT_ON_MAINTENANCE_PER_MONTH *
    formData.hrBurdenedRate *
    formData.adminsYear3 *
    1.2 *
    12;

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

  return [totalTable, benefitsTable, costsTable];
}
