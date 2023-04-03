import React from "react";
import { PageHeader, Button } from "@hero-design/react/lib";
import VerticalExample from "./InPageNavigation";
import Disclaimer from "./Disclaimer";
const CalculatorPage = (props) => {
  return (
    <>
      <PageHeader title="Return On Investment Calculator" />
      <VerticalExample {...props} />
      <Disclaimer />
    </>
  );
};

export default CalculatorPage;
