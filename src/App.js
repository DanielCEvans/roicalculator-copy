import "./App.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme, Box } from "@hero-design/react";
import SideBar from "./Sidebar";
import CalculatorPage from "./CalculatorPage";
import ResultsPage from "./ResultsPage";
import AboutPage from "./AboutPage";
import calculateROI from "./functions";

const App = () => {
  const [formData, setFormData] = useState({
    country: "",
    plan: "",
    admins: "",
    fullTimeEmployees: "",
    partTimeCasualEmployees: "",
    costsSavedOnTech: "",
    annualServicesSpend: "",
    pagesPerYear: 0,
    implementationType: "",
    // any default values that require the mapping will have to be set during the calculation of the ROI as the country will not be known on the first render
    hrBurdenedRate: "",
    employeeBurdenedRate: "",
    hoursSpentOnEmploymentTasks: 0,
  });

  // These values are not kept in state as they can be derived from state
  const [totalTable, setTotalTable] = useState({});
  const [benefitsTable, setBenefitsTable] = useState({});
  const [costsTable, setCostsTable] = useState({});

  const [generalErrors, setGeneralErrors] = useState({});
  const [adminErrors, setAdminErrors] = useState({});

  // State for the admin hours form
  const [adminDetails, setAdminDetails] = useState({
    onboardsPerYear: "",
    hoursSpentPerOnboard: "",
    timeSheetsPerMonth: "",
    hoursSpentPerTimesheet: "",
    frequencyOfPayroll: "",
    hoursSpentPerPayroll: "",
    performanceReviewCycles: "",
    hoursSpentPerPerformanceReview: "",
    additionalTasks: "",
  });

  const [printingDetails, setPrintingDetails] = useState({
    contractsPerYear: "",
    pagesPerContract: "",
    leaveFormsPerYear: "",
    pagesPerLeaveForm: "",
    reviewsPerYear: "",
    pagesPerReview: "",
    otherPrintingTasks: "",
    pagesPrintedEachYear: 0,
  });

  const [hasCalculated, setHasCalculated] = useState(false);

  // This state has been lifted from the sidebar so it can be set on the 'See Full Results' button
  const [selectedItemId, setSelectedItemId] = useState("calculator");

  let countryPrefix;
  if (formData.country === "AU") {
    countryPrefix = "A$";
  } else if (formData.country === "NZ") {
    countryPrefix = "NZ$";
  } else if (formData.country === "UK") {
    countryPrefix = "£";
  } else if (formData.country === "SG") {
    countryPrefix = "SGD";
  } else if (formData.country === "MY") {
    countryPrefix = "MYR";
  } else {
    countryPrefix = "$";
  }

  const runCalculations = function () {
    // This function could return all the required information to be sent as props to the 'Return' page
    // The data would then be displayed in tables.
    // When the user clicks the calculate button, they could be sent to the 'Return page' or the ROI could be displayed in the top right
    // and the values could change when the input changes?
    const [totalTable, benefitsTable, costsTable] = calculateROI(
      formData,
      adminDetails.onboardsPerYear
    );
    setTotalTable({ ...totalTable });
    setBenefitsTable({ ...benefitsTable });
    setCostsTable({ ...costsTable });
  };

  const calculatorProps = {
    // these are required to pass down to calculator componenet to display and set input values
    formData,
    setFormData,
    runCalculations,
    countryPrefix,
    generalErrors,
    setGeneralErrors,
    adminDetails,
    setAdminDetails,
    printingDetails,
    setPrintingDetails,
    totalTable,
    hasCalculated,
    setHasCalculated,
    setSelectedItemId,
    adminErrors,
    setAdminErrors,
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* This Box displays the entire app and has a display of flex. It contains the sidebar which has some css applied to it,
        and another Box which displays the main content of the app; */}
        <Box style={{ display: "flex" }} id="app">
          <SideBar
            selectedItemId={selectedItemId}
            setSelectedItemId={setSelectedItemId}
          />
          {/* This Box contains the main content of the page */}
          <Box
            style={{ width: "100%" }}
            sx={{ p: "large", backgroundColor: "grey-light-85" }}
            id="main-content"
          >
            <Routes>
              <Route
                path="/"
                element={<CalculatorPage {...calculatorProps} />}
              />
              <Route
                path="/results"
                element={
                  <ResultsPage
                    totalTable={totalTable}
                    benefitsTable={benefitsTable}
                    costsTable={costsTable}
                    country={formData.country}
                  />
                }
              />
              <Route
                path="/about"
                element={<AboutPage country={formData.country} />}
              />
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default App;
