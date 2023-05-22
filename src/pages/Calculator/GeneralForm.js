import { useEffect, useContext } from "react";
import { CountryContext } from "../../utils/countryFormatter";
import { Box } from "@hero-design/react/lib";
import countries from "../../data/countries.json";
import NumberFormInput from "../../components/NumberFormInput";
import SelectFormInput from "../../components/SelectFormInput";

import useStore from "../../context/store";

const GeneralForm = ({ checkGeneralPageErrors, runCalculations }) => {
  const { formData, setFormData, generalErrors, hasCalculated } = useStore();

  const handleInputChange = (e) => {
    setFormData(e.target.id, +e.target.value);
  };

  useEffect(() => {
    // When the formData state changes for this General Page, the errors will be updated AFTER the state of formData has been updated.
    // This means that if an error message is displayed, it will disappear when a user enters a valid value which is the desired behaviour

    // This prevents the errors from being checked on the first render - i.e. when the user hasn't even had a chance to fill in the required fields
    if (Object.keys(generalErrors).length !== 0) {
      const currentGeneralErrors = checkGeneralPageErrors();
      if (!currentGeneralErrors && hasCalculated) runCalculations();
    }
  }, [formData]);

  const countryInfo = useContext(CountryContext);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        p: "medium",
        border: "1px solid rgb(218, 219, 222)",
        borderRadius: "10px",
      }}
    >
      <form>
        <SelectFormInput
          title="Country"
          htmlFor="country"
          options={countries}
          value={formData.country}
          id="country"
          intent={generalErrors.country && "danger"}
          invalid={generalErrors.country}
          handleInputChangeFunction={setFormData}
        />
        <SelectFormInput
          title="Plan"
          htmlFor="plan"
          options={
            formData.country
              ? countryInfo[formData.country].plans
              : countryInfo["AU"].plans
          }
          value={formData.plan}
          id="plan"
          intent={generalErrors.plan && "danger"}
          invalid={generalErrors.plan}
          handleInputChangeFunction={setFormData}
        />
        <NumberFormInput
          title="Number of full time employees"
          htmlFor="fullTimeEmployees"
          value={formData.fullTimeEmployees}
          id="fullTimeEmployees"
          handleInputChange={handleInputChange}
          intent={generalErrors.fullTimeEmployees && "danger"}
          invalid={generalErrors.fullTimeEmployees}
        />
        <NumberFormInput
          title="Number of part time and casual employees (optional)"
          htmlFor="partTimeCasualEmployees"
          value={formData.partTimeCasualEmployees}
          id="partTimeCasualEmployees"
          handleInputChange={handleInputChange}
          buttonText="How do part time and casual employee numbers affect the ROI?"
          modalTitle="Part time and Casual Employees"
          modalBody="When determining the financial gains from the enhanced efficiency of all employees within the organisation by using Employment Hero's products, the total hours spent per year on employment administration across the entire organisation is first calculated. Our research indicates that on average, 5% of each hour is spent on employment administration. We multiply this percentage by the hours worked by each employee per week, the number of employees in the organisation (excluding HR and Payroll), and the number of weeks in a year. To estimate the return on investment accurately, we differentiate between full time, part time, and casual employees, assuming full time employees work 5 days a week and part time and casual employees work 2.5 days a week."
        />
        <NumberFormInput
          title="Number of people overseeing the employment function (including HR
            and Payroll)"
          htmlFor="admins"
          value={formData.admins}
          id="admins"
          handleInputChange={handleInputChange}
          intent={generalErrors.admins && "danger"}
          invalid={generalErrors.admins}
        />
      </form>
    </Box>
  );
};

export default GeneralForm;
