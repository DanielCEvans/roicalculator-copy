import { useEffect } from "react";
import { Box, Typography, theme, Grid } from "@hero-design/react";
import StatisticCard from "../../components/Statistic";
import { AiOutlinePrinter } from "react-icons/ai";
import useStore from "../../context/store";
import NumberFormInput from "../../components/NumberFormInput";

const PrintingForm = ({ runCalculations }) => {
  const {
    formData,
    setFormData,
    printingDetails,
    setPrintingDetails,
    hasCalculated,
  } = useStore();

  const handleInputChange = (e) => {
    setPrintingDetails(e.target.id, +e.target.value);
  };
  const calculatePagesPerYear = (details) => {
    const {
      contractsPerYear,
      pagesPerContract,
      leaveFormsPerYear,
      pagesPerLeaveForm,
      reviewsPerYear,
      pagesPerReview,
      otherPrintingTasks,
    } = details;

    return (
      contractsPerYear * pagesPerContract +
      leaveFormsPerYear * pagesPerLeaveForm +
      reviewsPerYear * pagesPerReview +
      otherPrintingTasks
    );
  };

  // This will update the pagesPerYear value in the formData state whenever the printingDetails form values change
  useEffect(() => {
    const pagesPerYear = calculatePagesPerYear(printingDetails);
    setFormData("pagesPerYear", pagesPerYear);
  }, [printingDetails]);

  // None of these inputs are required so no errors need to be checked
  useEffect(() => {
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
            <NumberFormInput
              title="Contracts generated per year"
              htmlFor="contractsPerYear"
              value={printingDetails.contractsPerYear}
              id="contractsPerYear"
              handleInputChange={handleInputChange}
            />
          </Grid.Col>
          <Grid.Col span={[12, 12, 12, 12, 12]}>
            <NumberFormInput
              title="Pages printed per contract"
              htmlFor="pagesPerContract"
              value={printingDetails.pagesPerContract}
              id="pagesPerContract"
              handleInputChange={handleInputChange}
            />
          </Grid.Col>
        </Grid.Row>
        <Grid.Row gutter={["large", "large"]}>
          <Grid.Col span={[12, 12, 12, 12, 12]}>
            <NumberFormInput
              title="Leave forms per year"
              htmlFor="leaveFormsPerYear"
              value={printingDetails.leaveFormsPerYear}
              id="leaveFormsPerYear"
              handleInputChange={handleInputChange}
            />
          </Grid.Col>
          <Grid.Col span={[12, 12, 12, 12, 12]}>
            <NumberFormInput
              title="Pages printed per leave form"
              htmlFor="pagesPerLeaveForm"
              value={printingDetails.pagesPerLeaveForm}
              id="pagesPerLeaveForm"
              handleInputChange={handleInputChange}
            />
          </Grid.Col>
        </Grid.Row>
        <Grid.Row gutter={["large", "large"]}>
          <Grid.Col span={[12, 12, 12, 12, 12]}>
            <NumberFormInput
              title="Number of reviews per year"
              htmlFor="reviewsPerYear"
              value={printingDetails.reviewsPerYear}
              id="reviewsPerYear"
              handleInputChange={handleInputChange}
            />
          </Grid.Col>
          <Grid.Col span={[12, 12, 12, 12, 12]}>
            <NumberFormInput
              title="Pages printed per performance review"
              htmlFor="pagesPerReview"
              value={printingDetails.pagesPerReview}
              id="pagesPerReview"
              handleInputChange={handleInputChange}
            />
          </Grid.Col>
        </Grid.Row>
        <Grid.Row gutter={["large", "large"]}>
          <Grid.Col span={[12, 12, 12, 12, 12]}>
            <NumberFormInput
              title="Pages printed per year for any additional tasks"
              htmlFor="otherPrintingTasks"
              value={printingDetails.otherPrintingTasks}
              id="otherPrintingTasks"
              handleInputChange={handleInputChange}
            />
          </Grid.Col>
          <Grid.Col span={[12, 12, 12, 12, 12]}>
            <StatisticCard
              title="Pages Printed Each Year"
              value={formData.pagesPerYear}
              backgroundColor={theme.colors.palette.violetLight90}
              fontColor={theme.colors.palette.violetDark45}
              icon={
                <AiOutlinePrinter
                  size={40}
                  style={{ color: theme.colors.palette.violetDark45 }}
                />
              }
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
