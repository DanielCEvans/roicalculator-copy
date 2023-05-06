import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme, Box } from "@hero-design/react";
import SideBar from "./components/Sidebar";
import CalculatorPage from "./pages/Calculator/CalculatorPage";
import ResultsPage from "./pages/Results/ResultsPage";
import AboutPage from "./pages/About/AboutPage";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        {/* This Box displays the entire app and has a display of flex. It contains the sidebar which has some css applied to it,
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
      </ThemeProvider>
    </>
  );
};

export default App;
