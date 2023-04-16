import { PageHeader } from "@hero-design/react/lib";
import PageNavigation from "./PageNavigation";
import Disclaimer from "../../components/Disclaimer";

const CalculatorPage = (props) => {
  return (
    <>
      <PageHeader title="Return On Investment Calculator" />
      <PageNavigation {...props} />
      <Disclaimer />
    </>
  );
};

export default CalculatorPage;
