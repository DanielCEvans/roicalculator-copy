import { useState, useEffect } from "react";
import {
  Box,
  theme,
  Typography,
  Select,
  Input,
  Button,
  Modal,
} from "@hero-design/react/lib";
import countries from "../../data/countries.json";
import plans from "../../data/plans.json";

import useStore from "../../context/store";

const GeneralForm = ({ checkGeneralPageErrors, runCalculations }) => {
  const { formData, setFormData, generalErrors, hasCalculated } = useStore();
  const [openEmployee, setOpenEmployee] = useState(false);

  const handleInputChange = (e, selectElement) => {
    // This is required because of the select input type
    if (selectElement) {
      setFormData(selectElement, e);
    } else {
      setFormData(e.target.id, +e.target.value);
    }
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
        <Box style={{ marginBottom: theme.space.medium }}>
          <Typography.Text
            tagName="label"
            htmlFor="country"
            fontWeight="bold"
            intent={generalErrors.country ? "danger" : null}
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
            invalid={generalErrors.country}
          />
          {generalErrors.country && (
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
            intent={generalErrors.plan ? "danger" : null}
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
            invalid={generalErrors.plan}
          />
          {generalErrors.plan && (
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
            intent={generalErrors.fullTimeEmployees ? "danger" : null}
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
            invalid={generalErrors.fullTimeEmployees}
            min={0}
          />
          {generalErrors.fullTimeEmployees && (
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
        <Box style={{ marginBottom: theme.space.medium }}>
          <Typography.Text
            tagName="label"
            htmlFor="admins"
            fontWeight="bold"
            intent={generalErrors.admins ? "danger" : null}
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
            invalid={generalErrors.admins}
            min={0}
          />
          {generalErrors.admins && (
            <Typography.Text fontSize={12} intent="danger">
              Required
            </Typography.Text>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default GeneralForm;
