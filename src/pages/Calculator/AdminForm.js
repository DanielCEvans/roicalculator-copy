import { useEffect } from "react";
import { Box, Typography, theme, Grid } from "@hero-design/react";
import StatisticCard from "../../components/Statistic";
import useStore from "../../context/store";
import NumberFormInput from "../../components/NumberFormInput";
import SelectFormInput from "../../components/SelectFormInput";

const payrollFrequency = [
  { value: "weekly", text: "Weekly" },
  { value: "fortnightly", text: "Fortnightly" },
  { value: "monthly", text: "Monthly" },
];

const payrollCycles = {
  weekly: 4,
  fortnightly: 2,
  monthly: 1,
};

// This function will return the total hours spent per month on employment tasks based on user input values of the Admin form.
const calculateHoursSpentOnEmploymentTasks = (details) => {
  const {
    onboardsPerYear,
    hoursSpentPerOnboard,
    timeSheetsPerMonth,
    hoursSpentPerTimesheet,
    frequencyOfPayroll,
    hoursSpentPerPayroll,
    performanceReviewCycles,
    hoursSpentPerPerformanceReview,
    additionalTasks,
  } = details;

  const numberOfPayrollCycles = payrollCycles[frequencyOfPayroll] || 0;

  const totalHoursPerMonth =
    (onboardsPerYear * hoursSpentPerOnboard) / 12 +
    timeSheetsPerMonth * hoursSpentPerTimesheet +
    numberOfPayrollCycles * hoursSpentPerPayroll +
    (performanceReviewCycles * hoursSpentPerPerformanceReview) / 12 +
    additionalTasks;

  return +totalHoursPerMonth;
};

const AdminForm = ({ checkAdminPageErrors, runCalculations }) => {
  const {
    formData,
    setFormData,
    adminDetails,
    setAdminDetails,
    adminErrors,
    hasCalculated,
  } = useStore();

  const handleInputChange = (e) => {
    setAdminDetails(e.target.id, +e.target.value);
  };
  const handleSelectInputChange = (e, id) => {
    setAdminDetails(id, e);
  };

  // When any of the values in the Admin form change, the total hours spent on employment
  // tasks will be calculated and the value will be set in the formData state.
  useEffect(() => {
    const hoursSpentOnEmploymentTasks =
      calculateHoursSpentOnEmploymentTasks(adminDetails);
    setFormData("hoursSpentOnEmploymentTasks", hoursSpentOnEmploymentTasks);
  }, [adminDetails, setFormData]);

  // This code will run if the total hours spent on employment tasks changes or the onboards per year changes.
  // This allows for the calculations to be run any time the user changes any inputs which leads to a better UX.
  useEffect(() => {
    // This check prevents the error messages from showing without the user having an opportunity to enter values.
    // e.g. without this check, the error messages would show when the user first lands on the admin form page.
    if (Object.keys(adminErrors).length !== 0) {
      const currentErrors = checkAdminPageErrors();
      if (!currentErrors && hasCalculated) runCalculations();
    }
  }, [formData.hoursSpentOnEmploymentTasks, adminDetails.onboardsPerYear]);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        border: "1px solid rgb(218, 219, 222)",
        borderRadius: "10px",
        p: "medium",
      }}
    >
      <Grid>
        <Grid.Row gutter={["large", "large"]}>
          <Grid.Col span={[12, 12, 12, 12, 12]}>
            <NumberFormInput
              title="Number of onboards per year"
              htmlFor="onboardsPerYear"
              value={adminDetails.onboardsPerYear}
              id="onboardsPerYear"
              handleInputChange={handleInputChange}
              intent={adminErrors.onboardsPerYear && "danger"}
              invalid={adminErrors.onboardsPerYear}
            />
          </Grid.Col>
          <Grid.Col span={[12, 12, 12, 12, 12]}>
            <NumberFormInput
              title="Hours spent per onboard"
              htmlFor="hoursSpentPerOnboard"
              value={adminDetails.hoursSpentPerOnboard}
              id="hoursSpentPerOnboard"
              handleInputChange={handleInputChange}
              toolTipContent="Time spent preparing new employees in your organisation, from collecting employment details, organising and printing documents, induction content, ordering equipment etc."
            />
          </Grid.Col>
        </Grid.Row>
        <Grid.Row gutter={["large", "large"]}>
          <Grid.Col span={[12, 12, 12, 12, 12]}>
            <NumberFormInput
              title="Number of timesheets per month"
              htmlFor="timeSheetsPerMonth"
              value={adminDetails.timeSheetsPerMonth}
              id="timeSheetsPerMonth"
              handleInputChange={handleInputChange}
            />
          </Grid.Col>
          <Grid.Col span={[12, 12, 12, 12, 12]}>
            <NumberFormInput
              title="Hours spent per timesheet"
              htmlFor="hoursSpentPerTimesheet"
              value={adminDetails.hoursSpentPerTimesheet}
              id="hoursSpentPerTimesheet"
              handleInputChange={handleInputChange}
              toolTipContent="Time spent checking, filing and processing timesheets, seeking managers for approvals etc."
            />
          </Grid.Col>
        </Grid.Row>
        <Grid.Row gutter={["large", "large"]}>
          <Grid.Col span={[12, 12, 12, 12, 12]}>
            <SelectFormInput
              title="Frequency of payroll"
              htmlFor="frequencyOfPayroll"
              options={payrollFrequency}
              value={adminDetails.frequencyOfPayroll}
              id="frequencyOfPayroll"
              handleInputChange={handleSelectInputChange}
            />
          </Grid.Col>
          <Grid.Col span={[12, 12, 12, 12, 12]}>
            <NumberFormInput
              title="Hours spent per pay run"
              htmlFor="hoursSpentPerPayroll"
              value={adminDetails.hoursSpentPerPayroll}
              id="hoursSpentPerPayroll"
              handleInputChange={handleInputChange}
              toolTipContent="Time spent processing pay for employees, such as finalising leave and entitlements, finalising expenses, processing bonuses and allowances, and finalising company journals"
            />
          </Grid.Col>
        </Grid.Row>
        <Grid.Row gutter={["large", "large"]}>
          <Grid.Col span={[12, 12, 12, 12, 12]}>
            <NumberFormInput
              title="Number of performance review cycles per year"
              htmlFor="performanceReviewCycles"
              value={adminDetails.performanceReviewCycles}
              id="performanceReviewCycles"
              handleInputChange={handleInputChange}
            />
          </Grid.Col>
          <Grid.Col span={[12, 12, 12, 12, 12]}>
            <NumberFormInput
              title="Hours spent per performance review"
              htmlFor="hoursSpentPerPerformanceReview"
              value={adminDetails.hoursSpentPerPerformanceReview}
              id="hoursSpentPerPerformanceReview"
              handleInputChange={handleInputChange}
              toolTipContent="Time spent organising, filing and recording performance reviews on behalf of the organisation"
            />
          </Grid.Col>
        </Grid.Row>
        <Grid.Row gutter={["large", "large"]}>
          <Grid.Col span={[12, 12, 12, 12, 12]}>
            <NumberFormInput
              title="Hours spent on any additional admin tasks per month"
              htmlFor="additionalTasks"
              value={adminDetails.additionalTasks}
              id="additionalTasks"
              handleInputChange={handleInputChange}
              toolTipContent="E.g. organising and delivering employee training, carrying out engagement surveys, organising and updating rosters, offboarding staff, preparing administrative reports etc."
            />
          </Grid.Col>
          <Grid.Col span={[12, 12, 12, 12, 12]}>
            <StatisticCard
              title="Total Hours Per Month"
              value={formData.hoursSpentOnEmploymentTasks.toFixed(2)}
              backgroundColor={theme.colors.palette.violetLight90}
              fontColor={theme.colors.palette.violetDark45}
              type="time"
              style={{ borderColor: "red" }}
              borderColor={
                adminErrors.hoursSpentOnEmploymentTasks ? "red" : null
              }
            />
            {adminErrors.hoursSpentOnEmploymentTasks && (
              <Typography.Text fontSize={12} intent="danger">
                Required
              </Typography.Text>
            )}
          </Grid.Col>
        </Grid.Row>
      </Grid>
    </Box>
  );
};

export default AdminForm;
