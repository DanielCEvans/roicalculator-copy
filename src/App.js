import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme, Box } from "@hero-design/react";
import SideBar from "./components/Sidebar";
import CalculatorPage from "./pages/Calculator/CalculatorPage";
import ResultsPage from "./pages/Results/ResultsPage";
import AboutPage from "./pages/About/AboutPage";
import { CountryProvider } from "./utils/countryFormatter";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CountryProvider>
          {/* This Box displays the entire app. It contains the sidebar which has some css applied to it,
        and another Box which displays the main content of the app; */}
          <Box style={{ display: "flex" }} id="app">
            <SideBar />
            {/* This Box contains the main content of the page */}
            <Box
              style={{ width: "100%" }}
              sx={{ p: "large", backgroundColor: "grey-light-85" }}
              id="main-content"
            >
              <Routes>
                <Route path="/" element={<CalculatorPage />} />
                <Route path="/results" element={<ResultsPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </Box>
          </Box>
        </CountryProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
