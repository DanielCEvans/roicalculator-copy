import React from "react";
import { useState } from "react";
import {
  Grid,
  InPageNavigation,
  Card,
  Box,
  PageHeader,
  Button,
  Icon,
  theme,
} from "@hero-design/react";
import GeneralPage from "./GeneralPage";
import AdminHoursPage from "./AdminHoursPage";
import OptionalDetailsPage from "./OptionalDetailsPage";
import StatisticCard from "./Statistic";
import PagesPrinted from "./PagesPrinted";
import { useNavigate } from "react-router-dom";

function VerticalExample(props) {
  const navigate = useNavigate();
  let currency;
  if (props.formData.country === "AU") {
    currency = "AUD";
  } else if (props.formData.country === "NZ") {
    currency = "NZD";
  } else if (props.formData.country === "UK") {
    currency = "GBP";
  } else if (props.formData.country === "SG") {
    currency = "SGD";
  } else if (props.formData.country === "MY") {
    currency = "MYR";
  } else {
    currency = "AUD";
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    // currencyDisplay: "narrowSymbol",
  });
  const [selectedItemId, setSelectedItemId] = useState("general");
  // const [adminDetails, setAdminDetails] = useState({
  //   onboardsPerYear: "",
  //   hoursSpentPerOnboard: "",
  //   timeSheetsPerMonth: "",
  //   hoursSpentPerTimesheet: "",
  //   frequencyOfPayroll: "",
  //   hoursSpentPerPayroll: "",
  //   performanceReviewCycles: "",
  //   hoursSpentPerPerformanceReview: "",
  //   additionalTasks: "",
  // });

  const onClickItem = (item) => {
    // The user will first arrive at the 'general' page.
    // Need to make sure the required fields on that page have been filled prior to the user leaving the page
    // If the user tries to calculate immediately without filling in requried fields, error messages will be shown
    // Only check for errors
    let currentErrors;
    if (selectedItemId === "general") {
      currentErrors = checkGeneralPageErrors();
      // console.log(props.formData);
      // currentErrors.country === false &&
      //   currentErrors.plan === false &&
      //   currentErrors.admins === false &&
      //   currentErrors.fullTimeEmployees === false &&
      //   setSelectedItemId(item.id);
      if (!currentErrors) setSelectedItemId(item.id);
    }

    if (selectedItemId === "adminDetails") {
      currentErrors = checkAdminPageErrors();
      if (!currentErrors) setSelectedItemId(item.id);
    }
    // if (
    //   item.id === "adminDetails" ||
    //   item.id === "additional" ||
    //   item.id === "pagesPrinted"
    // ) {
    //   // Only check errors when user tries to click away from the General tab
    //   currentErrors = checkGeneralPageErrors();
    //   currentErrors.country === false &&
    //     currentErrors.plan === false &&
    //     currentErrors.admins === false &&
    //     currentErrors.fullTimeEmployees === false &&
    //     setSelectedItemId(item.id);
    // }

    // condition which checks if only errors are found on the admin page and if so, sets the selected item state to the adminDetails page
    if (!currentErrors) setSelectedItemId(item.id);
  };

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

  const checkAdminPageErrors = () => {
    let currentAdminErrors = { ...props.adminErrors };

    if (!props.adminDetails.onboardsPerYear) {
      currentAdminErrors = { ...currentAdminErrors, onboardsPerYear: true };
    } else {
      currentAdminErrors = { ...currentAdminErrors, onboardsPerYear: false };
    }

    if (!props.formData.hoursSpentOnEmploymentTasks) {
      currentAdminErrors = {
        ...currentAdminErrors,
        hoursSpentOnEmploymentTasks: true,
      };
    } else {
      currentAdminErrors = {
        ...currentAdminErrors,
        hoursSpentOnEmploymentTasks: false,
      };
    }

    props.setAdminErrors({ ...currentAdminErrors });

    // if there are current errors, set the errors and return true
    return Object.values(currentAdminErrors).find((error) => error === true);
  };

  const checkGeneralPageErrors = () => {
    let currentGeneralErrors = { ...props.generalErrors };

    if (!props.formData.country) {
      currentGeneralErrors = { ...currentGeneralErrors, country: true };
    } else {
      currentGeneralErrors = { ...currentGeneralErrors, country: false };
    }

    if (!props.formData.plan) {
      currentGeneralErrors = { ...currentGeneralErrors, plan: true };
    } else {
      currentGeneralErrors = { ...currentGeneralErrors, plan: false };
    }

    if (!props.formData.admins) {
      currentGeneralErrors = { ...currentGeneralErrors, admins: true };
    } else {
      currentGeneralErrors = { ...currentGeneralErrors, admins: false };
    }

    if (!props.formData.fullTimeEmployees) {
      currentGeneralErrors = {
        ...currentGeneralErrors,
        fullTimeEmployees: true,
      };
    } else {
      currentGeneralErrors = {
        ...currentGeneralErrors,
        fullTimeEmployees: false,
      };
    }

    props.setGeneralErrors({ ...currentGeneralErrors });

    // if there are current errors, set the errors and return true
    return Object.values(currentGeneralErrors).find((error) => error === true);
    // return currentErrors;
  };

  let savingsBackgroundColor;
  if (!props.totalTable.year1NetBenefits) {
    savingsBackgroundColor = "white";
  } else if (props.totalTable.year1NetBenefits > 0) {
    savingsBackgroundColor = theme.colors.palette.grotesqueGreenLight75;
  } else {
    savingsBackgroundColor = theme.colors.palette.pinkLight75;
  }

  let savingsFontColour;
  if (!props.totalTable.year1NetBenefits) {
    savingsFontColour = theme.colors.palette.violetDark45;
  } else if (props.totalTable.year1NetBenefits > 0) {
    savingsFontColour = theme.colors.palette.grotesqueGreenDark45;
  } else {
    savingsFontColour = theme.colors.palette.pinkDark45;
  }

  const handleSubmit = (e) => {
    // Preventing default form behaviour, is this required considering I don't really have a form?
    e.preventDefault();
    // If the user tries to calculate immediately without filling in requried fields, error messages will be shown
    const generalErrors = checkGeneralPageErrors();
    const adminErrors = checkAdminPageErrors();

    if (!generalErrors && adminErrors) {
      setSelectedItemId("adminDetails");
    }

    if (!generalErrors && !adminErrors) {
      props.runCalculations();
      if (!props.hasCalculated) props.setHasCalculated(true);
    }

    // currentErrors.country === false &&
    //   currentErrors.plan === false &&
    //   currentErrors.admins === false &&
    //   currentErrors.fullTimeEmployees === false &&
    //   currentErrors.onboardsPerYear === true &&
    //   setSelectedItemId("adminDetails");
    // console.log(currentErrors);
    // if (!errors) {
    //   props.runCalculations();
    //   if (!props.hasCalculated) props.setHasCalculated(true);
    // }
    // if (!generalPageErrors && !adminPageErrors) {
    //   props.runCalculations();
    //   props.setHasCalculated(true);
    // }
  };

  const handleSeeFullResults = () => {
    props.setSelectedItemId("results");
    navigate("/results");
  };

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
              selectedItemId={selectedItemId}
            />
          </Grid.Col>
          <Grid.Col span={[12, 20, 20, 20, 20]}>
            {selectedItemId === "general" && (
              <GeneralPage
                {...props}
                checkGeneralPageErrors={checkGeneralPageErrors}
              />
            )}
            {selectedItemId === "adminDetails" && (
              <AdminHoursPage
                // formData={props.formData}
                // setFormData={props.setFormData}
                // adminDetails={props.adminDetails}
                // setAdminDetails={props.setAdminDetails}
                // errors={props.generalErrors}
                checkAdminPageErrors={checkAdminPageErrors}
                {...props}
              />
            )}
            {selectedItemId === "additional" && (
              <OptionalDetailsPage {...props} />
            )}
            {selectedItemId === "pagesPrinted" && (
              <PagesPrinted
                formData={props.formData}
                setFormData={props.setFormData}
                printingDetails={props.printingDetails}
                setPrintingDetails={props.setPrintingDetails}
                {...props}
              />
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
              disabled={!props.hasCalculated}
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
              subtitle="3 Year Total"
              value={
                props.totalTable.threeYearTotalROI
                  ? `${props.totalTable.threeYearTotalROI.toFixed(0)}%`
                  : "0%"
              }
              backgroundColor="white"
              fontColor={theme.colors.palette.violetDark45}
            />
          </Grid.Col>
          <Grid.Col span={[8, 8, 8, 8, 8]}>
            <StatisticCard
              title="Net Savings"
              subtitle="Year 1"
              value={
                props.totalTable.year1NetBenefits
                  ? `${formatter.format(props.totalTable.year1NetBenefits)}`
                  : "$0.00"
              }
              backgroundColor={savingsBackgroundColor}
              fontColor={savingsFontColour}
              type="money"
            />
          </Grid.Col>
        </Grid.Row>
      </Grid>
      {/* <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="filled"
          intent="primary"
          size="medium"
          text="Calculate"
          type="submit"
          onClick={handleSubmit}
        />
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "600px",
          }}
        >
          <StatisticCard
            title="ROI"
            value={props.formData.hoursSpentOnEmploymentTasks.toFixed(2)}
            backgroundColor={theme.colors.palette.violetLight90}
            fontColor={theme.colors.palette.violetDark45}
            type="time"
          />
          <StatisticCard
            title="Savings"
            value={props.formData.hoursSpentOnEmploymentTasks.toFixed(2)}
            backgroundColor={theme.colors.palette.violetLight90}
            fontColor={theme.colors.palette.violetDark45}
            type="time"
            sx={{ p: "large" }}
          />
        </Box>
      </Box> */}
    </Box>
  );
}

export default VerticalExample;
