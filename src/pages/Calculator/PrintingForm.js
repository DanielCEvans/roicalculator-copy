import { useEffect } from "react";
import { Box, Typography, Input, theme, Grid } from "@hero-design/react";
import StatisticCard from "../../components/Statistic";
import useStore from "../../context/store";

const PrintingForm = ({ runCalculations }) => {
  const {
    formData,
    setFormData,
    printingDetails,
    setPrintingDetails,
    hasCalculated,
  } = useStore();

  console.log(formData);
  const handleInputChange = (e) => {
    // this functions needs to update the state values, calculate the total hours per month if possible
    // maybe the total hours per month function can update the setHoursSpentOnEmploymentTasks state

    // This is required because the select input type in react automatically returns the value
    // There is only one select element so we that it is 'frequencyOfPayroll'

    setPrintingDetails(e.target.id, +e.target.value);
  };
  useEffect(() => {
    const pagesPerYear =
      printingDetails.contractsPerYear * printingDetails.pagesPerContract +
      printingDetails.leaveFormsPerYear * printingDetails.pagesPerLeaveForm +
      printingDetails.reviewsPerYear * printingDetails.pagesPerReview +
      printingDetails.otherPrintingTasks;
    console.log(pagesPerYear);

    setFormData("pagesPerYear", pagesPerYear);
  }, [printingDetails]);

  useEffect(() => {
    // Run this code if errors has been initialised.
    // This means it is not the first render and the user has either input some values, tried to submit a calculation, or tried to change a page in the InPageNavigation

    // When the formData state changes for this General Page, the errors will be updated AFTER the state of formData has been updated.
    // This means that if an error message is displayed, it will disappear when a user enters a valid value
    // if (Object.keys(adminErrors).length !== 0) {
    // checkGeneralPageErrors();

    // const currentErrors = checkAdminPageErrors();

    // NEED TO MAKE SURE THAT THE CALCULATIONS ARE BEING RUN WITH THE MOVE UP TO DATE HOURS SPENT PER MONTH ON EMPLOYMENT TASKS FIGURE!!!
    hasCalculated && runCalculations();
  }, [formData.pagesPerYear]);

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
            <Typography.Text
              tagName="label"
              htmlFor="contractsPerYear"
              fontWeight="bold"
            >
              Contracts generated per year
            </Typography.Text>
            <Input
              type="number"
              value={printingDetails.contractsPerYear}
              onChange={handleInputChange}
              id="contractsPerYear"
              style={{
                marginTop: theme.space.small,
                marginBottom: theme.space.medium,
              }}
              min={0}
            />
          </Grid.Col>
          <Grid.Col span={[12, 12, 12, 12, 12]}>
            <Typography.Text
              tagName="label"
              htmlFor="pagesPerContract"
              fontWeight="bold"
            >
              Pages printed per contract
            </Typography.Text>
            <Input
              type="number"
              value={printingDetails.pagesPerContract}
              onChange={handleInputChange}
              id="pagesPerContract"
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
              htmlFor="leaveFormsPerYear"
              fontWeight="bold"
            >
              Leave forms per year
            </Typography.Text>
            <Input
              type="number"
              value={printingDetails.leaveFormsPerYear}
              onChange={handleInputChange}
              id="leaveFormsPerYear"
              style={{
                marginTop: theme.space.small,
                marginBottom: theme.space.medium,
              }}
              min={0}
            />
          </Grid.Col>
          <Grid.Col span={[12, 12, 12, 12, 12]}>
            <Typography.Text
              tagName="label"
              htmlFor="pagesPerLeaveForm"
              fontWeight="bold"
            >
              Pages printed per leave form
            </Typography.Text>
            <Input
              type="number"
              value={printingDetails.pagesPerLeaveForm}
              onChange={handleInputChange}
              id="pagesPerLeaveForm"
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
              htmlFor="reviewsPerYear"
              fontWeight="bold"
            >
              Number of reviews per year
            </Typography.Text>
            <Input
              type="number"
              value={printingDetails.reviewsPerYear}
              onChange={handleInputChange}
              id="reviewsPerYear"
              style={{
                marginTop: theme.space.small,
                marginBottom: theme.space.medium,
              }}
              min={0}
            />
          </Grid.Col>
          <Grid.Col span={[12, 12, 12, 12, 12]}>
            <Typography.Text
              tagName="label"
              htmlFor="pagesPerReview"
              fontWeight="bold"
            >
              Pages printed per performance review
            </Typography.Text>
            <Input
              type="number"
              value={printingDetails.pagesPerReview}
              onChange={handleInputChange}
              id="pagesPerReview"
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
              htmlFor="otherPrintingTasks"
              fontWeight="bold"
            >
              Pages printed per year for any additional tasks
            </Typography.Text>
            <Input
              type="number"
              value={printingDetails.otherPrintingTasks}
              onChange={handleInputChange}
              id="otherPrintingTasks"
              style={{
                marginTop: theme.space.small,
                marginBottom: theme.space.xlarge,
              }}
              min={0}
            />
          </Grid.Col>
          <Grid.Col span={[12, 12, 12, 12, 12]}>
            <StatisticCard
              title="Pages Printed Each Year"
              value={formData.pagesPerYear}
              backgroundColor={theme.colors.palette.violetLight90}
              fontColor={theme.colors.palette.violetDark45}
              type="print"
            />
            <Typography.Text
              fontSize={10}
              fontWeight="light"
              intent="subdued"
              style={{ marginTop: "2px" }}
            >
              {`Our research found that on average, 20 pages are printed each year per employee. For your business size, this equates to ${
                20 *
                (formData.fullTimeEmployees + formData.partTimeCasualEmployees)
              } pages printed each year. This figure will be used in the calculation if left blank`}
            </Typography.Text>
          </Grid.Col>
        </Grid.Row>
      </Grid>
    </Box>
  );
};

export default PrintingForm;
