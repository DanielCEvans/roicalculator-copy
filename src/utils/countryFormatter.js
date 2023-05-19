import React from "react";

export const CountryContext = React.createContext();

export const CountryProvider = ({ children }) => {
  const countryInfo = {
    AU: {
      currencyFormatter: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "AUD",
      }),
      currencyPrefix: "A$",
      reportLandingPage: "https://employmenthero.com/roi-of-employment-hero/",
      plans: [
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
    },
    NZ: {
      currencyFormatter: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "NZD",
      }),
      currencyPrefix: "NZ$",
      reportLandingPage:
        "https://employmenthero.com/nz/roi-of-employment-hero/",
      plans: [
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
    },
    UK: {
      currencyFormatter: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "GBP",
      }),
      currencyPrefix: "£",
      reportLandingPage:
        "https://employmenthero.com/uk/roi-of-employment-hero/",
      plans: [
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
    },
    SG: {
      currencyFormatter: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "SGD",
      }),
      currencyPrefix: "SGD",
      reportLandingPage:
        "https://employmenthero.com/sg/roi-of-employment-hero/",
      plans: [
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
    },
    MY: {
      currencyFormatter: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "MYR",
      }),
      currencyPrefix: "MYR",
      reportLandingPage:
        "https://employmenthero.com/my/roi-of-employment-hero/",
      plans: [
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
    },
  };

  return (
    <CountryContext.Provider value={countryInfo}>
      {children}
    </CountryContext.Provider>
  );
};
