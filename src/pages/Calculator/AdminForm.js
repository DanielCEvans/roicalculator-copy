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
import StatisticCard from "../../components/Statistic";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import useStore from "../../context/store";

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

  const handleInputChange = (e, selectElement) => {
    // This is required because of the select input type
    if (selectElement) {
      setAdminDetails(selectElement, e);
    } else {
      setAdminDetails(e.target.id, +e.target.value);
    }
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
  }, [
    formData.hoursSpentOnEmploymentTasks,
    adminDetails.onboardsPerYear,
    adminErrors,
    checkAdminPageErrors,
    runCalculations,
    hasCalculated,
  ]);

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
              // onChange={handleInputChange}
              onChange={(e) => handleInputChange(e, "frequencyOfPayroll")}
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
