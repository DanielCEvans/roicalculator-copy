import React, { useState } from "react";
import Disclaimer from "./Disclaimer";
import {
  Box,
  PageHeader,
  Select,
  Input,
  Slider,
  Button,
  theme,
  Typography,
  Modal,
} from "@hero-design/react";

const countries = [
  { value: "AU", text: "Australia" },
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

const implementation = [
  { value: "guided", text: "Guided Implementation" },
  { value: "managed", text: "Managed Implementation" },
  { value: "self", text: "Self Implementation" },
];

const Calculator = function (props) {
  const [openImplementation, setOpenImplementation] = useState(false);
  const [openServiceCosts, setOpenServiceCosts] = useState(false);
  const [openSoftwareCosts, setOpenSoftwareCosts] = useState(false);
  const [openEmpoyeeSalary, setOpenEmployeeSalary] = useState(false);
  const [openAdminSalary, setOpenAdminSalary] = useState(false);
  const [openOrgGrowthRate, setOpenOrgGrowthRate] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    let currentErrors = { ...props.errors };

    if (!props.country) {
      currentErrors = { ...currentErrors, country: true };
    } else {
      currentErrors = { ...currentErrors, country: false };
    }

    if (!props.plan) {
      currentErrors = { ...currentErrors, plan: true };
    } else {
      currentErrors = { ...currentErrors, plan: false };
    }

    if (!props.admins) {
      currentErrors = { ...currentErrors, admins: true };
    } else {
      currentErrors = { ...currentErrors, admins: false };
    }

    if (!props.fullTimeEmployees) {
      currentErrors = { ...currentErrors, fullTimeEmployees: true };
    } else {
      currentErrors = { ...currentErrors, fullTimeEmployees: false };
    }

    props.setErrors({ ...currentErrors });

    // If there are mandatory fields missing, scroll to top
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    // else, execute calculations and send user to 'return' page
    props.runCalculations();
  };

  return (
    <>
      <PageHeader title="Return on Investment Calculator" />
      <Box
        sx={{
          backgroundColor: "#ffffff",
          p: "medium",
          borderRadius: "10px",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "rgb(218, 219, 222)",
          marginBottom: theme.space.small,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box style={{ marginBottom: theme.space.medium }}>
            <Typography.Text
              tagName="label"
              htmlFor="country"
              fontWeight="bold"
              intent={props.errors.country ? "danger" : null}
            >
              Country
            </Typography.Text>
            <Select
              options={countries}
              value={props.country}
              onChange={props.setCountry}
              placeholder="Select..."
              id="country"
              name="country"
              style={{
                marginTop: theme.space.small,
              }}
              invalid={props.errors.country}
            />
            {props.errors.country && (
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
              intent={props.errors.plan ? "danger" : null}
            >
              Plan
            </Typography.Text>
            <Select
              options={props.country ? plans[props.country] : plans["AU"]}
              value={props.plan}
              onChange={props.setPlan}
              placeholder="Select..."
              id="plan"
              style={{
                marginTop: theme.space.small,
              }}
              invalid={props.errors.plan}
            />
            {props.errors.plan && (
              <Typography.Text fontSize={12} intent="danger">
                Required
              </Typography.Text>
            )}
          </Box>
          <Box style={{ marginBottom: theme.space.medium }}>
            <Typography.Text
              tagName="label"
              htmlFor="admins"
              fontWeight="bold"
              intent={props.errors.admins ? "danger" : null}
            >
              Number of people overseeing the employment function (including HR
              and Payroll)
            </Typography.Text>
            <Input
              type="number"
              value={props.admins}
              onChange={(e) => props.setAdmins(+e.target.value)}
              id="admins"
              style={{
                marginTop: theme.space.small,
              }}
              invalid={props.errors.admins}
              min={0}
            />
            {props.errors.admins && (
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
              intent={props.errors.fullTimeEmployees ? "danger" : null}
            >
              Number of full-time employees
            </Typography.Text>
            <Input
              type="number"
              value={props.fullTimeEmployees}
              onChange={(e) => props.setFullTimeEmployees(+e.target.value)}
              id="fullTimeEmployees"
              style={{
                marginTop: theme.space.small,
              }}
              invalid={props.errors.fullTimeEmployees}
              min={0}
            />
            {props.errors.fullTimeEmployees && (
              <Typography.Text fontSize={12} intent="danger">
                Required
              </Typography.Text>
            )}
          </Box>
          <Typography.Text
            tagName="label"
            htmlFor="partTimeEmployees"
            fontWeight="bold"
          >
            Number of part-time employees (optional)
          </Typography.Text>
          <Input
            type="number"
            value={props.partTimeEmployees}
            onChange={(e) => props.setPartTimeEmployees(+e.target.value)}
            id="partTimeEmployees"
            style={{
              marginTop: theme.space.small,
              marginBottom: theme.space.medium,
            }}
            min={0}
          />
          <Typography.Text
            tagName="label"
            htmlFor="casualEmployees"
            fontWeight="bold"
          >
            Number of casual employees (optional)
          </Typography.Text>
          <Input
            type="number"
            value={props.casualEmployees}
            onChange={(e) => props.setCasualEmployees(+e.target.value)}
            id="casualEmployees"
            style={{
              marginTop: theme.space.small,
              marginBottom: theme.space.medium,
            }}
            min={0}
          />
          <Typography.Text
            tagName="label"
            htmlFor="hoursSpentOnEmploymentTasks"
            fontWeight="bold"
          >
            Hours spent per month on employment tasks (eg. onboarding employees,
            processing timesheets, payroll, performance reviews etc.) (optional)
          </Typography.Text>
          <Input
            type="number"
            value={props.hoursSpentOnEmploymentTasks}
            onChange={(e) =>
              props.setHoursSpentOnEmploymentTasks(+e.target.value)
            }
            id="hoursSpentOnEmploymentTasks"
            style={{
              marginTop: theme.space.small,
              marginBottom: theme.space.medium,
            }}
            min={0}
          />
          <Typography.Text
            tagName="label"
            htmlFor="pagesPerEmp"
            fontWeight="bold"
          >
            Pages printed per employee per year (optional)
          </Typography.Text>
          <Input
            type="number"
            value={props.pagesPerEmp}
            onChange={(e) => props.setPagesPerEmp(+e.target.value)}
            id="pagesPerEmp"
            style={{
              marginTop: theme.space.small,
              marginBottom: theme.space.medium,
            }}
            min={0}
          />
          <Typography.Text
            tagName="label"
            htmlFor="growthRate"
            fontWeight="bold"
            // This might not be the best solution?
            sx={{ width: "30%" }}
          >
            Organisation annual growth rate
          </Typography.Text>
          <Button.Link
            text="Need help with organisation growth rate?"
            size="small"
            sx={{
              marginLeft: "10px",
              marginRight: "10px",
              cursor: "pointer",
              textDecoration: "none",
            }}
            onClick={() => setOpenOrgGrowthRate((value) => !value)}
          />
          {openOrgGrowthRate && (
            <Modal
              title="Annual Organisation Growth Rate"
              open
              variant="primary"
              onClose={() => setOpenOrgGrowthRate(false)}
              body="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
              footer={
                <>
                  <Button
                    text="Close"
                    onClick={() => setOpenOrgGrowthRate(false)}
                  />
                </>
              }
              style={{ position: "fixed" }}
            />
          )}
          <Box
            style={{
              border: "1px solid #dadbde",
              padding: theme.space.small,
              marginTop: theme.space.medium,
              marginBottom: theme.space.medium,
              borderRadius: "4px",
            }}
          >
            <Slider
              min={0}
              max={100}
              step={1}
              value={props.growthRate}
              onChange={props.setGrowthRate}
              alwaysShowTooltip
              customTooltipText={`${props.growthRate} %`}
              id="growthRate"
              style={{
                marginTop: theme.space.xxxlarge,
                marginBottom: theme.space.xxxlarge,
              }}
            />
          </Box>
          <Typography.Text
            tagName="label"
            htmlFor="hrBurdenedRate"
            fontWeight="bold"
          >
            HR/Payroll administrator average annual salary (optional)
          </Typography.Text>
          <Button.Link
            text="Need help with admin salary?"
            size="small"
            sx={{
              marginLeft: "10px",
              cursor: "pointer",
              textDecoration: "none",
            }}
            onClick={() => setOpenAdminSalary((value) => !value)}
          />
          {openAdminSalary && (
            <Modal
              title="Average HR/Payroll Admin Salary"
              open
              variant="primary"
              onClose={() => setOpenAdminSalary(false)}
              body="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
              footer={
                <>
                  <Button
                    text="Close"
                    onClick={() => setOpenAdminSalary(false)}
                  />
                </>
              }
              style={{ position: "fixed" }}
            />
          )}
          <Input
            type="number"
            value={props.hrBurdenedRate}
            onChange={(e) => props.setHrBurdenedRate(+e.target.value)}
            id="hrBurdenedRate"
            prefix={<span>{props.countryPrefix}</span>}
            style={{
              marginTop: theme.space.small,
              marginBottom: theme.space.medium,
            }}
            min={0}
          />
          <Typography.Text
            tagName="label"
            htmlFor="employeeBurdenedRate"
            fontWeight="bold"
          >
            Average annual salary of all employees (optional)
          </Typography.Text>
          <Button.Link
            text="Need help with employee salary?"
            size="small"
            sx={{
              marginLeft: "10px",
              cursor: "pointer",
              textDecoration: "none",
            }}
            onClick={() => setOpenEmployeeSalary((value) => !value)}
          />
          {openEmpoyeeSalary && (
            <Modal
              title="Average Employee Salary"
              open
              variant="primary"
              onClose={() => setOpenEmployeeSalary(false)}
              body="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
              footer={
                <>
                  <Button
                    text="Close"
                    onClick={() => setOpenEmployeeSalary(false)}
                  />
                </>
              }
              style={{ position: "fixed" }}
            />
          )}
          <Input
            type="number"
            value={props.employeeBurdenedRate}
            onChange={(e) => props.setEmployeeBurdenedRate(+e.target.value)}
            id="employeeBurdenedRate"
            prefix={<span>{props.countryPrefix}</span>}
            style={{
              marginTop: theme.space.small,
              marginBottom: theme.space.medium,
            }}
            min={0}
          />

          <Typography.Text
            tagName="label"
            htmlFor="costsSavedOnTech"
            fontWeight="bold"
          >
            Annual cost of software being replaced or discontinued (optional)
          </Typography.Text>
          <Button.Link
            text="Need help with software costs?"
            size="small"
            sx={{
              marginLeft: "10px",
              cursor: "pointer",
              textDecoration: "none",
            }}
            onClick={() => setOpenSoftwareCosts((value) => !value)}
          />
          {openSoftwareCosts && (
            <Modal
              title="Software Costs"
              open
              variant="primary"
              onClose={() => setOpenSoftwareCosts(false)}
              body="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
              footer={
                <>
                  <Button
                    text="Close"
                    onClick={() => setOpenSoftwareCosts(false)}
                  />
                </>
              }
              style={{ position: "fixed" }}
            />
          )}
          <Input
            type="number"
            value={props.costsSavedOnTech}
            onChange={(e) => props.setCostsSavedOnTech(+e.target.value)}
            id="costsSavedOnTech"
            prefix={<span>{props.countryPrefix}</span>}
            style={{
              marginTop: theme.space.small,
              marginBottom: theme.space.medium,
            }}
            min={0}
          />
          <Typography.Text
            tagName="label"
            htmlFor="annualServicesSpend"
            fontWeight="bold"
          >
            Annual costs of service providers used (optional)
          </Typography.Text>
          <Button.Link
            text="Need help with service provider costs?"
            size="small"
            sx={{
              marginLeft: "10px",
              cursor: "pointer",
              textDecoration: "none",
            }}
            onClick={() => setOpenServiceCosts((value) => !value)}
          />
          {openServiceCosts && (
            <Modal
              title="Service Provider Costs"
              open
              variant="primary"
              onClose={() => setOpenServiceCosts(false)}
              body="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
              footer={
                <>
                  <Button
                    text="Close"
                    onClick={() => setOpenServiceCosts(false)}
                  />
                </>
              }
              style={{ position: "fixed" }}
            />
          )}
          <Input
            type="number"
            value={props.annualServicesSpend}
            onChange={(e) => props.setAnnualServicesSpend(+e.target.value)}
            id="annualServicesSpend"
            prefix={<span>{props.countryPrefix}</span>}
            style={{
              marginTop: theme.space.small,
              marginBottom: theme.space.medium,
            }}
            min={0}
          />

          <Typography.Text
            tagName="label"
            htmlFor="implementationType"
            fontWeight="bold"
          >
            Implementation method (optional)
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
              body="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
              footer={
                <>
                  <Button
                    text="Close"
                    onClick={() => setOpenImplementation(false)}
                  />
                </>
              }
              style={{ position: "fixed" }}
            />
          )}
          <Select
            options={implementation}
            value={props.implementationType}
            onChange={props.setImplementationType}
            placeholder="Select..."
            id="implementationType"
            style={{
              marginTop: theme.space.small,
              marginBottom: theme.space.medium,
            }}
          />
          <Button
            variant="filled"
            intent="primary"
            size="medium"
            text="Calculate"
            type="submit"
            onClick={handleSubmit}
          />
        </form>
      </Box>
      <Disclaimer />
    </>
  );
};

export default Calculator;
