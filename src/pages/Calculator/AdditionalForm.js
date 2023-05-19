import { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  theme,
  Select,
} from "@hero-design/react";
import useStore from "../../context/store";
import { CountryContext } from "../../utils/countryFormatter";
import NumberFormInput from "../../components/NumberFormInput";

const researchData = require("../../data/data.json");

const implementation = [
  { value: "guided", text: "Guided Implementation" },
  { value: "managed", text: "Managed Implementation" },
  { value: "self", text: "Self Implementation" },
];

const AdditionalForm = ({ runCalculations }) => {
  const { formData, setFormData, hasCalculated } = useStore();
  const [openImplementation, setOpenImplementation] = useState(false);

  const countryInfo = useContext(CountryContext);
  const formatter = countryInfo[formData.country].currencyFormatter;
  const countryPrefix = countryInfo[formData.country].currencyPrefix;

  const handleInputChange = (e, selectElement) => {
    // This is required because of the select input type
    if (selectElement) {
      setFormData(selectElement, e);
    } else {
      setFormData(e.target.id, +e.target.value);
    }
  };

  // This will re-run the calculations when any of the inputs on this page change and if the user has already calculated
  // This allows for a better UX as the user can see the results change as they change the inputs
  useEffect(() => {
    hasCalculated && runCalculations();
  }, [formData]);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        border: "1px solid rgb(218, 219, 222)",
        borderRadius: "10px",
        p: "medium",
      }}
    >
      <Typography.Text
        tagName="label"
        htmlFor="implementationType"
        fontWeight="bold"
      >
        Implementation method
      </Typography.Text>
      <Button.Link
        text="Need help with implementation method?"
        size="small"
        sx={{
          marginLeft: "10px",
          cursor: "pointer",
          textDecoration: "none",
        }}
        onClick={() => setOpenImplementation((value) => !value)}
      />
      {openImplementation && (
        <Modal
          title="Implementation Method"
          open
          variant="primary"
          onClose={() => setOpenImplementation(false)}
          body={`Every business has different people management needs. By selecting the most appropriate implementation method for your business, you ensure your Employment Hero account is set up to suit your specific needs. A Guided HR Implementation will lead you through a 30-day implementation journey via regular live, interactive workshops that will help you set up your HR Platform and meet all your HR needs. This costs around $500-$750 AUD (our calculator assumes $750). For organisations with more specific or complex needs, a Managed HR Implementation is recommended. A hyper-personalised implementation with your own project manager that has an upfront cost of approximately $7,500 AUD (our calculator assumes $7,500). A self implementation has no upfront cost and is fully managed by yourself. 
          `}
          footer={
            <>
              <Button
                text="Close"
                onClick={() => setOpenImplementation(false)}
              />
            </>
          }
        />
      )}
      <Select
        options={implementation}
        value={formData.implementationType}
        onChange={(e) => handleInputChange(e, "implementationType")}
        placeholder="Select..."
        id="implementationType"
        style={{
          marginTop: theme.space.small,
          marginBottom: "2px",
        }}
      />
      <Typography.Text
        fontSize={10}
        fontWeight="light"
        intent="subdued"
        style={{ marginBottom: theme.space.medium }}
      >
        If left unselected, guided implementation method will be used
      </Typography.Text>

      <NumberFormInput
        title="Average hourly rate of HR/Payroll administrator"
        subTitle={`If left blank, hourly rate of ${countryPrefix}${researchData[
          formData.country
        ]["hr_hourly_rate"].toFixed(
          2
        )} will be used - determined from research`}
        htmlFor="hrBurdenedRate"
        value={formData.hrBurdenedRate}
        id="hrBurdenedRate"
        handleInputChange={handleInputChange}
        countryPrefix={countryPrefix}
      />
      <NumberFormInput
        title="Average hourly rate of an employee"
        subTitle={`If left blank, hourly rate of ${countryPrefix}${researchData[
          formData.country
        ]["employee_hourly_rate"].toFixed(
          2
        )} will be used - determined from research`}
        htmlFor="employeeBurdenedRate"
        value={formData.employeeBurdenedRate}
        id="employeeBurdenedRate"
        handleInputChange={handleInputChange}
        countryPrefix={countryPrefix}
      />
      <NumberFormInput
        title="Annual cost of current software being replaced or discontinued"
        subTitle={`If left blank, current cost of software of ${formatter.format(
          researchData[formData.country]["costs_saved_on_tech"]
        )} will be used - determined from research`}
        htmlFor="costsSavedOnTech"
        value={formData.costsSavedOnTech}
        id="costsSavedOnTech"
        handleInputChange={handleInputChange}
        countryPrefix={countryPrefix}
        toolTipContent="Costs currently being paid for technology such as Seek, Tanda, Deputy etc."
      />
      <NumberFormInput
        title="Annual costs of service providers used"
        subTitle={`If left blank, annual cost of service providers of ${formatter.format(
          researchData[formData.country]["annual_services_spend"]
        )} will be used - determined from research`}
        htmlFor="annualServicesSpend"
        value={formData.annualServicesSpend}
        id="annualServicesSpend"
        handleInputChange={handleInputChange}
        countryPrefix={countryPrefix}
        toolTipContent="e.g. Employment Laywers, Advisers etc."
      />
    </Box>
  );
};

export default AdditionalForm;
