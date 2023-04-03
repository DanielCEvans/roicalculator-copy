import {
  Box,
  theme,
  Typography,
  Select,
  Input,
  Button,
  Modal,
} from "@hero-design/react/lib";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const countries = [
  { value: "AU", text: "Australia", name: "country" },
  { value: "NZ", text: "New Zealand" },
  { value: "UK", text: "United Kingdom" },
  { value: "MY", text: "Malaysia" },
  { value: "SG", text: "Singapore" },
];

const plans = {
  AU: [
    { value: "Standard HR", text: "Standard HR" },
    { value: "Premium HR", text: "Premium HR" },
    { value: "Platinum HR", text: "Platinum HR" },
    { value: "Standard Payroll", text: "Standard Payroll" },
    { value: "Premium Payroll", text: "Premium Payroll" },
    {
      value: "Standard HR and Learning Plus",
      text: "Standard HR and Learning Plus",
    },
    {
      value: "Premium HR and Learning Plus",
      text: "Premium HR and Learning Plus",
    },
    {
      value: "Platinum HR and Learning Plus",
      text: "Platinum HR and Learning Plus",
    },
    {
      value: "Standard HR and Standard Payroll",
      text: "Standard HR and Standard Payroll",
    },
    {
      value: "Standard HR and Premium Payroll",
      text: "Standard HR and Premium Payroll",
    },
    {
      value: "Premium HR and Standard Payroll",
      text: "Premium HR and Standard Payroll",
    },
    {
      value: "Premium HR and Premium Payroll",
      text: "Premium HR and Premium Payroll",
    },
    {
      value: "Platinum HR and Standard Payroll",
      text: "Platinum HR and Standard Payroll",
    },
    {
      value: "Platinum HR and Premium Payroll",
      text: "Platinum HR and Premium Payroll",
    },
    {
      value: "Standard HR, Standard Payroll, and Learning Plus",
      text: "Standard HR, Standard Payroll, and Learning Plus",
    },
    {
      value: "Standard HR, Premium Payroll, and Learning Plus",
      text: "Standard HR, Premium Payroll, and Learning Plus",
    },
    {
      value: "Premium HR, Standard Payroll, and Learning Plus",
      text: "Premium HR, Standard Payroll, and Learning Plus",
    },
    {
      value: "Premium HR, Premium Payroll, and Learning Plus",
      text: "Premium HR, Premium Payroll, and Learning Plus",
    },
    {
      value: "Platinum HR, Standard Payroll, and Learning Plus",
      text: "Platinum HR, Standard Payroll, and Learning Plus",
    },
    {
      value: "Platinum HR, Premium Payroll, and Learning Plus",
      text: "Platinum HR, Premium Payroll, and Learning Plus",
    },
  ],
  UK: [
    { value: "Standard HR", text: "Standard HR" },
    { value: "Premium HR", text: "Premium HR" },
    { value: "Platinum HR", text: "Platinum HR" },
    { value: "Standard Payroll", text: "Standard Payroll" },
    { value: "Premium Payroll", text: "Premium Payroll" },
    {
      value: "Standard HR and Learning Plus",
      text: "Standard HR and Learning Plus",
    },
    {
      value: "Premium HR and Learning Plus",
      text: "Premium HR and Learning Plus",
    },
    {
      value: "Platinum HR and Learning Plus",
      text: "Platinum HR and Learning Plus",
    },
    {
      value: "Standard HR and Standard Payroll",
      text: "Standard HR and Standard Payroll",
    },
    {
      value: "Standard HR and Premium Payroll",
      text: "Standard HR and Premium Payroll",
    },
    {
      value: "Premium HR and Standard Payroll",
      text: "Premium HR and Standard Payroll",
    },
    {
      value: "Premium HR and Premium Payroll",
      text: "Premium HR and Premium Payroll",
    },
    {
      value: "Platinum HR and Standard Payroll",
      text: "Platinum HR and Standard Payroll",
    },
    {
      value: "Platinum HR and Premium Payroll",
      text: "Platinum HR and Premium Payroll",
    },
    {
      value: "Standard HR, Standard Payroll, and Learning Plus",
      text: "Standard HR, Standard Payroll, and Learning Plus",
    },
    {
      value: "Standard HR, Premium Payroll, and Learning Plus",
      text: "Standard HR, Premium Payroll, and Learning Plus",
    },
    {
      value: "Premium HR, Standard Payroll, and Learning Plus",
      text: "Premium HR, Standard Payroll, and Learning Plus",
    },
    {
      value: "Premium HR, Premium Payroll, and Learning Plus",
      text: "Premium HR, Premium Payroll, and Learning Plus",
    },
    {
      value: "Platinum HR, Standard Payroll, and Learning Plus",
      text: "Platinum HR, Standard Payroll, and Learning Plus",
    },
    {
      value: "Platinum HR, Premium Payroll, and Learning Plus",
      text: "Platinum HR, Premium Payroll, and Learning Plus",
    },
  ],
  NZ: [
    { value: "Premium HR", text: "Premium HR" },
    { value: "Platinum HR", text: "Platinum HR" },
    { value: "Standard Payroll", text: "Standard Payroll" },
    { value: "Premium Payroll", text: "Premium Payroll" },
    {
      value: "Premium HR and Standard Payroll",
      text: "Premium HR and Standard Payroll",
    },
    {
      value: "Premium HR and Premium Payroll",
      text: "Premium HR and Premium Payroll",
    },
    {
      value: "Platinum HR and Standard Payroll",
      text: "Platinum HR and Standard Payroll",
    },
    {
      value: "Platinum HR and Premium Payroll",
      text: "Platinum HR and Premium Payroll",
    },
  ],
  MY: [
    { value: "Premium HR", text: "Premium HR" },
    { value: "Platinum HR", text: "Platinum HR" },
    { value: "Standard Payroll", text: "Standard Payroll" },
    { value: "Premium Payroll", text: "Premium Payroll" },
    {
      value: "Premium HR and Standard Payroll",
      text: "Premium HR and Standard Payroll",
    },
    {
      value: "Premium HR and Premium Payroll",
      text: "Premium HR and Premium Payroll",
    },
    {
      value: "Platinum HR and Standard Payroll",
      text: "Platinum HR and Standard Payroll",
    },
    {
      value: "Platinum HR and Premium Payroll",
      text: "Platinum HR and Premium Payroll",
    },
  ],
  SG: [
    { value: "Premium HR", text: "Premium HR" },
    { value: "Platinum HR", text: "Platinum HR" },
    { value: "Standard Payroll", text: "Standard Payroll" },
    { value: "Premium Payroll", text: "Premium Payroll" },
    {
      value: "Premium HR and Standard Payroll",
      text: "Premium HR and Standard Payroll",
    },
    {
      value: "Premium HR and Premium Payroll",
      text: "Premium HR and Premium Payroll",
    },
    {
      value: "Platinum HR and Standard Payroll",
      text: "Platinum HR and Standard Payroll",
    },
    {
      value: "Platinum HR and Premium Payroll",
      text: "Platinum HR and Premium Payroll",
    },
  ],
};

const GeneralPage = ({
  formData,
  setFormData,
  checkGeneralPageErrors,
  ...props
}) => {
  const [openEmployee, setOpenEmployee] = useState(false);
  const handleInputChange = (e, selectElement) => {
    // this functions needs to update the state values, calculate the total hours per month if possible
    // maybe the total hours per month function can update the setHoursSpentOnEmploymentTasks state

    // This is required because of the select input type
    if (typeof e === "string") {
      setFormData({ ...formData, [selectElement]: e });
    } else {
      setFormData({
        ...formData,
        [e.target.id]: +e.target.value,
      });
    }
  };

  useEffect(() => {
    // Run this code if props.errors has been initialised.
    // This means it is not the first render and the user has either input some values, tried to submit a calculation, or tried to change a page in the InPageNavigation

    // When the formData state changes for this General Page, the errors will be updated AFTER the state of formData has been updated.
    // This means that if an error message is displayed, it will disappear when a user enters a valid value

    // This prevents the errors from being check on the first run - i.e. when the user hasn't even had a chance to fill in the required field
    if (Object.keys(props.generalErrors).length !== 0) {
      // checkGeneralPageErrors();

      const currentGeneralErrors = checkGeneralPageErrors();
      if (!currentGeneralErrors && props.hasCalculated) props.runCalculations();
    }
  }, [formData]);

  return (
    // This Box holds the form for the General information
    <Box
      sx={{
        backgroundColor: "white",
        p: "medium",
        border: "1px solid rgb(218, 219, 222)",
        borderRadius: "10px",
      }}
    >
      <form>
        <Box style={{ marginBottom: theme.space.medium }}>
          <Typography.Text
            tagName="label"
            htmlFor="country"
            fontWeight="bold"
            intent={props.generalErrors.country ? "danger" : null}
          >
            Country
          </Typography.Text>
          <Select
            options={countries}
            value={formData.country}
            onChange={(e) => handleInputChange(e, "country")}
            placeholder="Select..."
            id="country"
            name="country"
            style={{
              marginTop: theme.space.small,
            }}
            invalid={props.generalErrors.country}
          />
          {props.generalErrors.country && (
            <Typography.Text fontSize={12} intent="danger">
              Required
            </Typography.Text>
          )}
        </Box>
        <Box style={{ marginBottom: theme.space.medium }}>
          <Typography.Text
            tagName="label"
            htmlFor="plan"
            fontWeight="bold"
            intent={props.generalErrors.plan ? "danger" : null}
          >
            Plan
          </Typography.Text>
          <Select
            options={formData.country ? plans[formData.country] : plans["AU"]}
            value={formData.plan}
            onChange={(e) => handleInputChange(e, "plan")}
            placeholder="Select..."
            id="plan"
            style={{
              marginTop: theme.space.small,
            }}
            invalid={props.generalErrors.plan}
          />
          {props.generalErrors.plan && (
            <Typography.Text fontSize={12} intent="danger">
              Required
            </Typography.Text>
          )}
        </Box>
        <Box style={{ marginBottom: theme.space.medium }}>
          <Typography.Text
            tagName="label"
            htmlFor="fullTimeEmployees"
            fontWeight="bold"
            intent={props.generalErrors.fullTimeEmployees ? "danger" : null}
          >
            Number of full time employees
          </Typography.Text>
          <Input
            type="number"
            value={formData.fullTimeEmployees}
            onChange={handleInputChange}
            id="fullTimeEmployees"
            style={{
              marginTop: theme.space.small,
            }}
            invalid={props.generalErrors.fullTimeEmployees}
            min={0}
          />
          {props.generalErrors.fullTimeEmployees && (
            <Typography.Text fontSize={12} intent="danger">
              Required
            </Typography.Text>
          )}
        </Box>
        <Typography.Text
          tagName="label"
          htmlFor="partTimeCasualEmployees"
          fontWeight="bold"
        >
          Number of part time and casual employees (optional)
        </Typography.Text>

        <Button.Link
          text="How do part time and casual employee numbers affect the ROI?"
          size="small"
          sx={{
            marginLeft: "10px",
            cursor: "pointer",
            textDecoration: "none",
          }}
          onClick={() => setOpenEmployee((value) => !value)}
        />
        {openEmployee && (
          <Modal
            title="Part time and Casual Employees"
            open
            variant="primary"
            onClose={() => setOpenEmployee(false)}
            body="When determining the financial gains from the enhanced efficiency of all employees within the organisation by using Employment Hero's products, the total hours spent per year on employment administration across the entire organisation is first calculated. Our research indicates that on average, 5% of each hour is spent on employment administration. We multiply this percentage by the hours worked by each employee per week, the number of employees in the organisation (excluding HR and Payroll), and the number of weeks in a year. To estimate the return on investment accurately, we differentiate between full time, part time, and casual employees, assuming full time employees work 5 days a week and part time and casual employees work 2.5 days a week."
            footer={
              <>
                <Button text="Close" onClick={() => setOpenEmployee(false)} />
              </>
            }
            style={{ position: "fixed" }}
          />
        )}
        <Input
          type="number"
          value={formData.partTimeCasualEmployees}
          onChange={handleInputChange}
          id="partTimeCasualEmployees"
          style={{
            marginTop: theme.space.small,
            marginBottom: theme.space.medium,
          }}
          min={0}
        />
        {/* <Typography.Text
          tagName="label"
          htmlFor="casualEmployees"
          fontWeight="bold"
        >
          Number of casual employees (optional)
        </Typography.Text>
        <Input
          type="number"
          value={formData.casualEmployees}
          onChange={handleInputChange}
          id="casualEmployees"
          style={{
            marginTop: theme.space.small,
            marginBottom: theme.space.medium,
          }}
          min={0}
        /> */}
        <Box style={{ marginBottom: theme.space.medium }}>
          <Typography.Text
            tagName="label"
            htmlFor="admins"
            fontWeight="bold"
            intent={props.generalErrors.admins ? "danger" : null}
          >
            Number of people overseeing the employment function (including HR
            and Payroll)
          </Typography.Text>
          <Input
            type="number"
            value={formData.admins}
            onChange={handleInputChange}
            id="admins"
            style={{
              marginTop: theme.space.small,
            }}
            invalid={props.generalErrors.admins}
            min={0}
          />
          {props.generalErrors.admins && (
            <Typography.Text fontSize={12} intent="danger">
              Required
            </Typography.Text>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default GeneralPage;
