import { useEffect } from "react";
import {
  Box,
  Typography,
  Input,
  theme,
  Grid,
  Select,
  Tooltip,
} from "@hero-design/react";
import StatisticCard from "./Statistic";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const payrollFrequency = [
  { value: "weekly", text: "Weekly" },
  { value: "fortnightly", text: "Fortnightly" },
  { value: "monthly", text: "Monthly" },
];

const AdminForm = ({
  formData,
  setFormData,
  adminDetails,
  setAdminDetails,
  adminErrors,
  checkAdminPageErrors,
  hasCalculated,
  runCalculations,
}) => {
  const handleInputChange = (e) => {
    // this functions needs to update the state values, calculate the total hours per month if possible
    // maybe the total hours per month function can update the setHoursSpentOnEmploymentTasks state

    // This is required because the select input type in react automatically returns the value
    // There is only one select element so we that it is
    if (typeof e === "string") {
      setAdminDetails({ ...adminDetails, frequencyOfPayroll: e });
    } else {
      setAdminDetails({
        ...adminDetails,
        [e.target.id]: +e.target.value,
      });
    }
  };

  useEffect(() => {
    // When adminDetails changes, this function will run and set the number of hours spent per month on employment tasks
    // console.log(adminDetails);
    // this function will need to calculate the monthly hours and set the state
    // Because the state is at the app level, this triggers an entire re-render of the application
    // which takes the user back to the General page.

    let numberOfPayrollCycles;
    if (adminDetails.frequencyOfPayroll === "weekly") {
      // If payroll done weekly, and there is assumed to be 48 working weeks in a year, convert hours into months
      // number of payroll cycles per month will be 48/12 which is 4
      numberOfPayrollCycles = 4;
    } else if (adminDetails.frequencyOfPayroll === "fortnightly") {
      // If payroll done fortnightly, and there is assumed to be 24 working fortnights in a year, convert hours into months
      // number of payroll cycles per month will be 24/12 which is 2
      numberOfPayrollCycles = 2;
    } else if (adminDetails.frequencyOfPayroll === "monthly") {
      numberOfPayrollCycles = 1;
    } else {
      numberOfPayrollCycles = 0;
    }
    let totalHoursPerMonth =
      (adminDetails.onboardsPerYear * adminDetails.hoursSpentPerOnboard) / 12 +
      adminDetails.timeSheetsPerMonth * adminDetails.hoursSpentPerTimesheet +
      numberOfPayrollCycles * adminDetails.hoursSpentPerPayroll +
      (adminDetails.performanceReviewCycles *
        adminDetails.hoursSpentPerPerformanceReview) /
        12 +
      adminDetails.additionalTasks;

    // I might need to divide the total hours per month by the number of admins to get the total hours per month
    // per admin which is used when calculating the employment team financial gains!!!
    setFormData({
      ...formData,
      hoursSpentOnEmploymentTasks: +totalHoursPerMonth,
    });
  }, [adminDetails]);

  useEffect(() => {
    // Run this code if props.errors has been initialised.
    // This means it is not the first render and the user has either input some values, tried to submit a calculation, or tried to change a page in the InPageNavigation

    // When the formData state changes for this General Page, the errors will be updated AFTER the state of formData has been updated.
    // This means that if an error message is displayed, it will disappear when a user enters a valid value
    if (Object.keys(adminErrors).length !== 0) {
      // checkGeneralPageErrors();

      const currentErrors = checkAdminPageErrors();

      // NEED TO MAKE SURE THAT THE CALCULATIONS ARE BEING RUN WITH THE MOVE UP TO DATE HOURS SPENT PER MONTH ON EMPLOYMENT TASKS FIGURE!!!
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
            <Box style={{ marginBottom: theme.space.medium }}>
              <Typography.Text
                tagName="label"
                htmlFor="onboardsPerYear"
                fontWeight="bold"
                intent={adminErrors.onboardsPerYear ? "danger" : null}
              >
                Number of onboards per year
              </Typography.Text>
              <Input
                type="number"
                value={adminDetails.onboardsPerYear}
                onChange={handleInputChange}
                id="onboardsPerYear"
                style={{
                  marginTop: theme.space.small,
                }}
                invalid={adminErrors.onboardsPerYear}
                min={0}
              />
              {adminErrors.onboardsPerYear && (
                <Typography.Text fontSize={12} intent="danger">
                  Required
                </Typography.Text>
              )}
            </Box>
          </Grid.Col>
          <Grid.Col span={[12, 12, 12, 12, 12]}>
            <Box style={{ alignItems: "center", display: "flex" }}>
              <Typography.Text
                tagName="label"
                htmlFor="hoursSpentPerOnboard"
                fontWeight="bold"
              >
                Hours spent per onboard
              </Typography.Text>
              <Tooltip
                style={{
                  marginLeft: theme.space.small,
                  paddingTop: "2px",
                }}
                target={
                  <AiOutlineQuestionCircle style={{ color: "#7622d7" }} />
                }
                content="Time spent preparing new employees in your organisation, from collecting employment details, organising and printing documents, induction content, ordering equipment etc."
              />
            </Box>
            <Input
              type="number"
              value={adminDetails.hoursSpentPerOnboard}
              onChange={handleInputChange}
              id="hoursSpentPerOnboard"
              style={{
                marginTop: theme.space.small,
                marginBottom: theme.space.medium,
              }}
              min={0}
            />
          </Grid.Col>
        </Grid.Row>
        <Grid.Row gutter={["large", "large"]}>
          <Grid.Col span={[12, 12, 12, 12, 12]}>
            <Typography.Text
              tagName="label"
              htmlFor="timeSheetsPerMonth"
              fontWeight="bold"
            >
              Number of timesheets per month
            </Typography.Text>
            <Input
              type="number"
              value={adminDetails.timeSheetsPerMonth}
              onChange={handleInputChange}
              id="timeSheetsPerMonth"
              style={{
                marginTop: theme.space.small,
                marginBottom: theme.space.medium,
              }}
              min={0}
            />
          </Grid.Col>
          <Grid.Col span={[12, 12, 12, 12, 12]}>
            <Box style={{ alignItems: "center", display: "flex" }}>
              <Typography.Text
                tagName="label"
                htmlFor="hoursSpentPerTimesheet"
                fontWeight="bold"
              >
                Hours spent per timesheet
              </Typography.Text>
              <Tooltip
                style={{ marginLeft: theme.space.small, paddingTop: "2px" }}
                target={
                  <AiOutlineQuestionCircle style={{ color: "#7622d7" }} />
                }
                content="Time spent checking, filing and processing timesheets, seeking managers for approvals etc."
              />
            </Box>
            <Input
              type="number"
              value={adminDetails.hoursSpentPerTimesheet}
              onChange={handleInputChange}
              id="hoursSpentPerTimesheet"
              style={{
                marginTop: theme.space.small,
                marginBottom: theme.space.medium,
              }}
              min={0}
            />
          </Grid.Col>
        </Grid.Row>
        <Grid.Row gutter={["large", "large"]}>
          <Grid.Col span={[12, 12, 12, 12, 12]}>
            <Typography.Text
              tagName="label"
              htmlFor="frequencyOfPayroll"
              fontWeight="bold"
            >
              Frequency of payroll
            </Typography.Text>
            <Select
              options={payrollFrequency}
              value={adminDetails.frequencyOfPayroll}
              onChange={handleInputChange}
              placeholder="Select..."
              id="frequencyOfPayroll"
              style={{
                marginTop: theme.space.small,
                marginBottom: theme.space.medium,
              }}
            />
          </Grid.Col>
          <Grid.Col span={[12, 12, 12, 12, 12]}>
            <Box style={{ alignItems: "center", display: "flex" }}>
              <Typography.Text
                tagName="label"
                htmlFor="hoursSpentPerPayroll"
                fontWeight="bold"
              >
                Hours spent per pay run
              </Typography.Text>
              <Tooltip
                style={{ marginLeft: theme.space.small, paddingTop: "2px" }}
                target={
                  <AiOutlineQuestionCircle style={{ color: "#7622d7" }} />
                }
                content="Time spent processing pay for employees, such as finalising leave and entitlements, finalising expenses, processing bonuses and allowances, and finalising company journals"
              />
            </Box>
            <Input
              type="number"
              value={adminDetails.hoursSpentPerPayroll}
              onChange={handleInputChange}
              id="hoursSpentPerPayroll"
              style={{
                marginTop: theme.space.small,
                marginBottom: theme.space.medium,
              }}
              min={0}
            />
          </Grid.Col>
        </Grid.Row>
        <Grid.Row gutter={["large", "large"]}>
          <Grid.Col span={[12, 12, 12, 12, 12]}>
            <Typography.Text
              tagName="label"
              htmlFor="performanceReviewCycles"
              fontWeight="bold"
            >
              Number of performance review cycles per year
            </Typography.Text>
            <Input
              type="number"
              value={adminDetails.performanceReviewCycles}
              onChange={handleInputChange}
              id="performanceReviewCycles"
              style={{
                marginTop: theme.space.small,
                marginBottom: theme.space.medium,
              }}
              min={0}
            />
          </Grid.Col>
          <Grid.Col span={[12, 12, 12, 12, 12]}>
            <Box style={{ alignItems: "center", display: "flex" }}>
              <Typography.Text
                tagName="label"
                htmlFor="hoursSpentPerPerformanceReview"
                fontWeight="bold"
              >
                Hours spent per performance review
              </Typography.Text>
              <Tooltip
                style={{ marginLeft: theme.space.small, paddingTop: "2px" }}
                target={
                  <AiOutlineQuestionCircle style={{ color: "#7622d7" }} />
                }
                content="Time spent organising, filing and recording performance reviews on behalf of the organisation"
              />
            </Box>
            <Input
              type="number"
              value={adminDetails.hoursSpentPerPerformanceReview}
              onChange={handleInputChange}
              id="hoursSpentPerPerformanceReview"
              style={{
                marginTop: theme.space.small,
                marginBottom: theme.space.medium,
              }}
              min={0}
            />
          </Grid.Col>
        </Grid.Row>
        <Grid.Row gutter={["large", "large"]}>
          <Grid.Col span={[12, 12, 12, 12, 12]}>
            <Box style={{ alignItems: "center", display: "flex" }}>
              <Typography.Text
                tagName="label"
                htmlFor="additionalTasks"
                fontWeight="bold"
              >
                Hours spent on any additional admin tasks per month
              </Typography.Text>
              <Tooltip
                style={{ marginLeft: theme.space.small, paddingTop: "2px" }}
                target={
                  <AiOutlineQuestionCircle style={{ color: "#7622d7" }} />
                }
                content="E.g. organising and delivering employee training, carrying out engagement surveys, organising and updating rosters, offboarding staff, preparing administrative reports etc."
              />
            </Box>
            <Input
              type="number"
              value={adminDetails.additionalTasks}
              onChange={handleInputChange}
              id="additionalTasks"
              style={{
                marginTop: theme.space.small,
                marginBottom: theme.space.xlarge,
              }}
              min={0}
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
