import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const mapping = require("./data.json");

const NUMBER_OF_YEARS = 3;

// **********************
// Values which will be held in state and derived from state
// **********************

const country = "AU";
const plan = "Platinum HR";
const admins = 2;

const fullTimeEmployees = 50;
const partTimeEmployees = 0;
const casualEmployees = 0;
const orgSize = fullTimeEmployees + partTimeEmployees + casualEmployees;

// At the moment the user enters this as a percentage, could perhaps use a different
// componenet to ensure this?
const growthRate = 1.263;
// Maybe a different input component could make this code unnecessary?
// if (growth_rate == None)
//     growth_rate = 1.263
// else
//     growth_rate = growth_rate/100 + 1

// Could this be done with a recursive function?
const orgSizeYearTwo = orgSize * growthRate;
const orgSizeYearThree = orgSizeYearTwo * growthRate;
const adminsYearTwo = admins * growthRate;
const adminsYearThree = adminsYearTwo * growthRate;
const fullTimeEmployeesYear2 = fullTimeEmployees * growthRate;
const fullTimeEmployeesYear3 = fullTimeEmployeesYear2 * growthRate;
const partTimeEmployeesYear2 = partTimeEmployees * growthRate;
const partTimeEmployeesYear3 = partTimeEmployeesYear2 * growthRate;
const casualEmployeesYear2 = casualEmployees * growthRate;
const casualEmployeesYear3 = casualEmployeesYear2 * growthRate;

// If no annual salary given, use Nat's default values
// I think these values requrie clarification from Nat

// At the moment, going to assume this values have not been input and will use the default
// The default values need to be set in react somehow?
// const hrAnnualSalary = request.form.get("hrAnnualSalary", (type = int));
// const employeeAnnualSalary = request.form.get(
//   "employeeAnnualSalary",
//   (type = int)
// );
// if (hr_annual_salary == None)
const hrBurdenedRate = mapping[country]["hr_hourly_rate"];
// else
// const hrBurdenedRate = hr_annual_salary/1880

// if employee_annual_salary == None:
const employeeBurdenedRate = mapping[country]["employee_hourly_rate"];
// else:
// const employee_burdened_rate = employee_annual_salary/1880

const constsSavedOnTech = mapping[country]["costs_saved_on_tech"];
const annualServicesSpend = mapping[country]["annual_services_spend"];
const pagesPerEmp = 20;

const implementationType = "guided";
let upfrontImplementationCost;
if (implementationType === "guided")
  upfrontImplementationCost = mapping[country][plan]["cost_2"]["upfront"];
else if (implementationType === "managed")
  // Fix this
  upfrontImplementationCost = mapping[country][plan]["cost_2"]["managed"];
// Assume self guided implementation which is 0 dollars
else upfrontImplementationCost = 0;

// **********************
// Where the calculations begin
// **********************

// **********************
// BENEFIT 1
// **********************
const hoursSpentOnEmploymentTasks = 0;
let yearOneBenefitOne;
let yearTwoBenefitOne;
let yearThreeBenefitOne;

if (hoursSpentOnEmploymentTasks === 0) {
  yearOneBenefitOne =
    admins *
    mapping[country][plan]["benefit_1"]["year_0"] *
    hrBurdenedRate *
    12 *
    0.8;
  yearTwoBenefitOne =
    adminsYearTwo *
    mapping[country][plan]["benefit_1"]["year_1"] *
    hrBurdenedRate *
    12 *
    0.8;
  yearThreeBenefitOne =
    adminsYearThree *
    mapping[country][plan]["benefit_1"]["year_2"] *
    hrBurdenedRate *
    12 *
    0.8;
} else {
  const timeSavedYearOne = hoursSpentOnEmploymentTasks * 0.39;
  const timeSavesYearTwo = hoursSpentOnEmploymentTasks * 0.405;
  const timeSavedYearThree = hoursSpentOnEmploymentTasks * 0.42;

  yearOneBenefitOne = admins * timeSavedYearOne * hrBurdenedRate * 12 * 0.8;
  yearTwoBenefitOne =
    adminsYearTwo * timeSavesYearTwo * hrBurdenedRate * 12 * 0.8;
  yearThreeBenefitOne =
    adminsYearThree * timeSavedYearThree * hrBurdenedRate * 12 * 0.8;
}

// **********************
// BENEFIT 2
// **********************
const EMPLOYMENT_ADMIN_HOURS_PER_DAY = 0.05;

const calcFinancialGainsAdjustment = (
  fullTime,
  partTime,
  casual,
  year,
  efficiencyAdjustment
) => {
  const employmentAdminHoursPerYearFullTime =
    EMPLOYMENT_ADMIN_HOURS_PER_DAY * 5 * 52.18 * fullTime;
  const employmentAdminHoursPerYearPartTime =
    EMPLOYMENT_ADMIN_HOURS_PER_DAY * 2.5 * 52.18 * partTime;
  const employmentAdminHoursPerYearCasual =
    EMPLOYMENT_ADMIN_HOURS_PER_DAY * 2.5 * 52.18 * casual;
  const orgReductionAdminReductionTimeSinceEH =
    mapping[country][plan]["benefit_2"][`year_${year}`];

  const totalHoursSavedPerYear =
    (employmentAdminHoursPerYearFullTime +
      employmentAdminHoursPerYearPartTime +
      employmentAdminHoursPerYearCasual) *
    orgReductionAdminReductionTimeSinceEH;
  const totalHoursSavedAdjusted = efficiencyAdjustment * totalHoursSavedPerYear;
  const orgOverallFincancialGainsAdjusted =
    employeeBurdenedRate * totalHoursSavedAdjusted * 0.8;
  return orgOverallFincancialGainsAdjusted;
};

let efficiencyAdjustment;
let orgOverallFincancialGainsAdjustedYearOne;
let orgOverallFincancialGainsAdjustedYearTwo;
let orgOverallFincancialGainsAdjustedYearThree;

for (let year = 0; year < NUMBER_OF_YEARS; year++) {
  if (year === 0) {
    efficiencyAdjustment = 0.515;
    orgOverallFincancialGainsAdjustedYearOne = calcFinancialGainsAdjustment(
      fullTimeEmployees,
      partTimeEmployees,
      casualEmployees,
      year,
      efficiencyAdjustment
    );
  } else if (year === 1) {
    efficiencyAdjustment = 0.575;
    orgOverallFincancialGainsAdjustedYearTwo = calcFinancialGainsAdjustment(
      fullTimeEmployeesYear2,
      partTimeEmployeesYear2,
      casualEmployeesYear2,
      year,
      efficiencyAdjustment
    );
  } else {
    efficiencyAdjustment = 0.634;
    orgOverallFincancialGainsAdjustedYearThree = calcFinancialGainsAdjustment(
      fullTimeEmployeesYear3,
      partTimeEmployeesYear3,
      casualEmployeesYear3,
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
  annualServicesSpend * AVG_PERC_SAVED_IN_SERVICE_PROVIDER_COSTS;

let costSavedInServicesAndTechnologyYear1;
let costSavedInServicesAndTechnologyYear2;
let costSavedInServicesAndTechnologyYear3;
for (let year = 0; year < NUMBER_OF_YEARS; year++) {
  if (year == 0) {
    costSavedInServicesAndTechnologyYear1 = costSavedInServiceProviders * 0.8;
  } else {
    // could this be done recursively?
    costSavedInServicesAndTechnologyYear2 =
      (costSavedInServiceProviders + constsSavedOnTech) * 0.8;
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

const employeeDocs = pagesPerEmp * orgSize;
const printingCosts = employeeDocs * mapping[country]["printing_costs"];

const totalPrintingCosts = PERC_PAPER * printingCosts;
const avgReductionInPaperYear1 = 0.492;
const totalSaved = totalPrintingCosts * avgReductionInPaperYear1;

const reductionPrintingAdjustedYear1 = totalSaved * 0.8;

const employeeDocsYear2 = pagesPerEmp * orgSizeYearTwo;
const printingCostsYear2 = employeeDocsYear2 * 0.5;

const totalPrintingCostsYear2 = PERC_PAPER * printingCostsYear2;
const avgReductionInPaperYear2 = 0.563;
const totalSavedYear2 = totalPrintingCostsYear2 * avgReductionInPaperYear2;

const reductionPrintingAdjustedYear2 = totalSavedYear2 * 0.8;

const employeeDocsYear3 = pagesPerEmp * orgSizeYearThree;
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
  orgSize * mapping[country][plan]["cost_1"]["year_0"] * 12;
const subscriptionCostYear2 =
  orgSizeYearTwo * mapping[country][plan]["cost_1"]["year_1"] * 12;
const subscriptionCostYear3 =
  orgSizeYearThree * mapping[country][plan]["cost_1"]["year_2"] * 12;

// **********************
// COST 2 - Internal Implementation Costs
// **********************

// Upfront
let internalImplementationCostUpfront;
if (plan.includes("HR") && plan.includes("Payroll"))
  internalImplementationCostUpfront = 20 * admins * hrBurdenedRate * 1.2;
else internalImplementationCostUpfront = 10 * admins * hrBurdenedRate * 1.2;

// Ongoing
const HOURS_SPENT_ON_MAINTENANCE_PER_MONTH = 2;
const internalImplementationCostYear1 =
  HOURS_SPENT_ON_MAINTENANCE_PER_MONTH * hrBurdenedRate * admins * 1.2 * 12;
const internalImplementationCostYear2 =
  HOURS_SPENT_ON_MAINTENANCE_PER_MONTH *
  hrBurdenedRate *
  adminsYearTwo *
  1.2 *
  12;
const internalImplementationCostYear3 =
  HOURS_SPENT_ON_MAINTENANCE_PER_MONTH *
  hrBurdenedRate *
  adminsYearThree *
  1.2 *
  12;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
