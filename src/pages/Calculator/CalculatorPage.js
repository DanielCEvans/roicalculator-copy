import { PageHeader } from "@hero-design/react/lib";
import PageNavigation from "./PageNavigation";
import Disclaimer from "../../components/Disclaimer";

const CalculatorPage = () => {
  return (
    <>
      <PageHeader title="Return On Investment Calculator" />
      <PageNavigation />
      <Disclaimer />
    </>
  );
};

export default CalculatorPage;
