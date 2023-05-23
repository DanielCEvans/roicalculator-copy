import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CountryContext } from "../../utils/countryFormatter";
import { Grid, InPageNavigation, Box, Button, theme } from "@hero-design/react";
import GeneralForm from "./GeneralForm";
import AdminForm from "./AdminForm";
import PrintingForm from "./PrintingForm";
import AdditionalForm from "./AdditionalForm";
import StatisticCard from "../../components/Statistic";
import calculateROI from "../../utils/functions";
import useStore from "../../context/store";
import { BsCurrencyDollar } from "react-icons/bs";

const items = {
  "": [
    {
      id: "general",
      text: "General",
    },
    {
      id: "adminDetails",
      text: "Admin",
    },
    { id: "pagesPrinted", text: "Printing" },
    {
      id: "additional",
      text: "Additional",
    },
  ],
};

const PageNavigation = () => {
  const navigate = useNavigate();

  const {
    formData,
    adminDetails,
    setGeneralErrors,
    setAdminErrors,
    hasCalculated,
    setHasCalculated,
    setSidebarSelectedItemId,
    formSelectedItemId,
    setFormSelectedItemId,
    setEmploymentBenefits,
    setOrganisationBenefits,
    setTechBenefits,
    setPrintingBenefits,
    setSubscriptionCosts,
    setImplementationCost,
    setOngoingCosts,
    netBenefits,
    setNetBenefits,
    ROIs,
    setRoi,
  } = useStore();

  const countryInfo = useContext(CountryContext);
  const formatter = formData.country
    ? countryInfo[formData.country].currencyFormatter
    : countryInfo["AU"].currencyFormatter;

  // This function will calculate the ROI when the user clicks the 'Calculate' button
  // The required fields for calculating the ROI are checked prior to this function being called
  const runCalculations = () => {
    const [
      employmentBenefits,
      organisationBenefits,
      techBenefits,
      printingBenefits,
      subscriptionCosts,
      implementationCosts,
      onGoingCosts,
      netBenefits,
      ROIs,
    ] = calculateROI(formData, adminDetails);

    // Set the state of the benefits and costs
    setEmploymentBenefits(employmentBenefits);
    setOrganisationBenefits(organisationBenefits);
    setTechBenefits(techBenefits);
    setPrintingBenefits(printingBenefits);
    setSubscriptionCosts(subscriptionCosts);
    setImplementationCost(implementationCosts);
    setOngoingCosts(onGoingCosts);
    setNetBenefits(netBenefits);
    setRoi(ROIs);
  };

  // This function will change the forms in the InpageNavigation component
  // If the form has required fields, this function will check that they have been filled before changing the forms
  const onClickItem = (item) => {
    let currentErrors;
    if (formSelectedItemId === "general") {
      currentErrors = checkGeneralPageErrors();
      if (!currentErrors) setFormSelectedItemId(item.id);
    }

    if (formSelectedItemId === "adminDetails") {
      currentErrors = checkAdminPageErrors();
      if (!currentErrors) setFormSelectedItemId(item.id);
    }

    // condition which checks if only errors are found on the admin page and if so, sets the selected item state to the adminDetails page
    if (!currentErrors) setFormSelectedItemId(item.id);
  };

  // This function will check if any errors are found on the admin page
  const checkAdminPageErrors = () => {
    const currentAdminErrors = {
      onboardsPerYear: !adminDetails.onboardsPerYear,
      hoursSpentOnEmploymentTasks: !formData.hoursSpentOnEmploymentTasks,
    };

    // Set the errors and return true if any errors found
    setAdminErrors(currentAdminErrors);
    return Object.values(currentAdminErrors).some((error) => error);
  };

  // This function will check if any errors are found on the general page
  const checkGeneralPageErrors = () => {
    const currentGeneralErrors = {
      country: !formData.country,
      plan: !formData.plan,
      admins: !formData.admins,
      fullTimeEmployees: !formData.fullTimeEmployees,
    };

    // Set the errors and return true if any errors found
    setGeneralErrors(currentGeneralErrors);
    return Object.values(currentGeneralErrors).some((error) => error);
  };

  const handleSubmit = () => {
    // If the user tries to calculate immediately without filling in requried fields, error messages will be shown
    const generalErrors = checkGeneralPageErrors();
    const adminErrors = checkAdminPageErrors();

    if (!generalErrors && adminErrors) {
      setFormSelectedItemId("adminDetails");
    }

    if (!generalErrors && !adminErrors) {
      runCalculations();
      if (!hasCalculated) setHasCalculated();
    }
  };

  const handleSeeFullResults = () => {
    setSidebarSelectedItemId("results");
    navigate("/results");
  };

  const savingsBackgroundColor = !hasCalculated
    ? "white"
    : netBenefits[0] > 0
    ? theme.colors.palette.grotesqueGreenLight75
    : theme.colors.palette.pinkLight75;

  const savingsFontColour = !hasCalculated
    ? theme.colors.palette.violetDark45
    : netBenefits[0] > 0
    ? theme.colors.palette.grotesqueGreenDark45
    : theme.colors.palette.pinkDark45;

  return (
    <Box
      sx={{
        p: "large",
        backgroundColor: "white",
        border: "1px solid rgb(218, 219, 222)",
        borderRadius: "10px",
      }}
    >
      <Grid>
        <Grid.Row gutter={["small", "small"]}>
          <Grid.Col span={[12, 4, 4, 4, 4]}>
            <InPageNavigation
              items={items}
              onClickItem={onClickItem}
              formSelectedItemId={formSelectedItemId}
            />
          </Grid.Col>
          <Grid.Col span={[12, 20, 20, 20, 20]}>
            {formSelectedItemId === "general" && (
              <GeneralForm
                checkGeneralPageErrors={checkGeneralPageErrors}
                runCalculations={runCalculations}
              />
            )}
            {formSelectedItemId === "adminDetails" && (
              <AdminForm
                checkAdminPageErrors={checkAdminPageErrors}
                runCalculations={runCalculations}
              />
            )}
            {formSelectedItemId === "additional" && (
              <AdditionalForm runCalculations={runCalculations} />
            )}
            {formSelectedItemId === "pagesPrinted" && (
              <PrintingForm runCalculations={runCalculations} />
            )}
          </Grid.Col>
        </Grid.Row>
      </Grid>
      <Grid sx={{ mt: theme.space.xxxlarge }}>
        <Grid.Row gutter={["large", "large"]} style={{ alignItems: "center" }}>
          <Grid.Col span={[8, 8, 8, 8, 8]}>
            <Button
              variant="filled"
              intent="primary"
              size="medium"
              text="Calculate"
              type="submit"
              onClick={handleSubmit}
            />
            <Button
              disabled={!hasCalculated}
              variant="outlined"
              intent="primary"
              size="medium"
              text="See Full Results"
              onClick={handleSeeFullResults}
              sx={{ ml: "medium" }}
            />
          </Grid.Col>
          <Grid.Col span={[8, 8, 8, 8, 8]}>
            <StatisticCard
              title="Return On Investment"
              subtitle="Year 3"
              value={hasCalculated ? `${ROIs[2].toFixed(0)}%` : "0%"}
              backgroundColor="white"
              fontColor={theme.colors.palette.violetDark45}
            />
          </Grid.Col>
          <Grid.Col span={[8, 8, 8, 8, 8]}>
            <StatisticCard
              title="Net Savings"
              subtitle="Year 1"
              value={
                hasCalculated
                  ? `${formatter.format(netBenefits[0])}`
                  : `${formatter.format(0)}`
              }
              backgroundColor={savingsBackgroundColor}
              fontColor={savingsFontColour}
              icon={
                <BsCurrencyDollar
                  size={30}
                  style={{ color: savingsFontColour }}
                />
              }
            />
          </Grid.Col>
        </Grid.Row>
      </Grid>
    </Box>
  );
};

export default PageNavigation;
