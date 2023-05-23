import { useMemo, useContext } from "react";
import { CountryContext } from "../../utils/countryFormatter";
import { Box, PageHeader, Table, Typography, theme } from "@hero-design/react";
import styled from "styled-components";
import Disclaimer from "../../components/Disclaimer";
import useStore from "../../context/store";

const sumArray = (array) => {
  return array.reduce((a, b) => a + b, 0);
};

const ResultsPage = () => {
  const {
    formData,
    employmentBenefits,
    organisationBenefits,
    techBenefits,
    printingBenefits,
    subscriptionCosts,
    implementationCosts,
    onGoingCosts,
    hasCalculated,
    netBenefits,
    ROIs,
  } = useStore();

  const countryInfo = useContext(CountryContext);
  const formatter = formData.country
    ? countryInfo[formData.country].currencyFormatter
    : countryInfo["AU"].currencyFormatter;

  // Calculate the total benefits, costs and net benefits
  const totalEmploymentBenefits = sumArray(employmentBenefits);
  const totalOrganisationBenefits = sumArray(organisationBenefits);
  const totalTechBenefits = sumArray(techBenefits);
  const totalPrintingBenefits = sumArray(printingBenefits);
  const totalImplementationCost = sumArray(implementationCosts);
  const totalSubscriptionCosts = sumArray(subscriptionCosts);
  const totalOngoingCosts = sumArray(onGoingCosts);
  const totalNetBenefits = sumArray(netBenefits);
  const totalRoi =
    ((totalNetBenefits - totalImplementationCost) /
      (totalSubscriptionCosts + totalOngoingCosts + totalImplementationCost)) *
    100;

  const totalTableData = hasCalculated
    ? [
        {
          columnType: "Total Benefits",
          upfront: "",
          year1: formatter.format(
            employmentBenefits[0] +
              techBenefits[0] +
              printingBenefits[0] +
              organisationBenefits[0]
          ),
          year2: formatter.format(
            employmentBenefits[1] +
              techBenefits[1] +
              printingBenefits[1] +
              organisationBenefits[1]
          ),
          year3: formatter.format(
            employmentBenefits[2] +
              techBenefits[2] +
              printingBenefits[2] +
              organisationBenefits[2]
          ),
          total: formatter.format(
            totalEmploymentBenefits +
              totalTechBenefits +
              totalPrintingBenefits +
              totalOrganisationBenefits
          ),
        },
        {
          columnType: "Total Costs",
          upfront: formatter.format(totalImplementationCost),
          year1: formatter.format(subscriptionCosts[0] + onGoingCosts[0]),
          year2: formatter.format(subscriptionCosts[1] + onGoingCosts[1]),
          year3: formatter.format(subscriptionCosts[2] + onGoingCosts[2]),
          total: formatter.format(
            totalSubscriptionCosts + totalOngoingCosts + totalImplementationCost
          ),
        },
        {
          columnType: "Net Benefits",
          upfront: formatter.format(-totalImplementationCost),
          year1: formatter.format(netBenefits[0]),
          year2: formatter.format(netBenefits[1]),
          year3: formatter.format(netBenefits[2]),
          total: formatter.format(totalNetBenefits - totalImplementationCost),
        },
        {
          columnType: "ROI",
          upfront: "",
          year1: `${ROIs[0].toFixed(0)}%`,
          year2: `${ROIs[1].toFixed(0)}%`,
          year3: `${ROIs[2].toFixed(0)}%`,
          total: `${totalRoi.toFixed(0)}%`,
        },
      ]
    : [];

  const benefitsTableData = hasCalculated
    ? [
        {
          columnType: `Employment team financial benefits`,
          upfront: "",
          year1: formatter.format(employmentBenefits[0]),
          year2: formatter.format(employmentBenefits[1]),
          year3: formatter.format(employmentBenefits[2]),
          total: formatter.format(totalEmploymentBenefits),
        },
        {
          columnType: "Organisation financial benefits",
          upfront: "",
          year1: formatter.format(organisationBenefits[0]),
          year2: formatter.format(organisationBenefits[1]),
          year3: formatter.format(organisationBenefits[2]),
          total: formatter.format(totalOrganisationBenefits),
        },
        {
          columnType: "Replacing existing technology financial benefits",
          upfront: "",
          year1: formatter.format(techBenefits[0]),
          year2: formatter.format(techBenefits[1]),
          year3: formatter.format(techBenefits[2]),
          total: formatter.format(totalTechBenefits),
        },
        {
          columnType: "Reduction in printing financial benefits",
          upfront: "",
          year1: formatter.format(printingBenefits[0]),
          year2: formatter.format(printingBenefits[1]),
          year3: formatter.format(printingBenefits[2]),
          total: formatter.format(totalPrintingBenefits),
        },
        {
          columnType: "Total financial benefits",
          upfront: "",
          year1: formatter.format(
            employmentBenefits[0] +
              techBenefits[0] +
              printingBenefits[0] +
              organisationBenefits[0]
          ),
          year2: formatter.format(
            employmentBenefits[1] +
              techBenefits[1] +
              printingBenefits[1] +
              organisationBenefits[1]
          ),
          year3: formatter.format(
            employmentBenefits[2] +
              techBenefits[2] +
              printingBenefits[2] +
              organisationBenefits[2]
          ),
          total: formatter.format(
            totalEmploymentBenefits +
              totalTechBenefits +
              totalPrintingBenefits +
              totalOrganisationBenefits
          ),
        },
      ]
    : [];

  const costsTableData = hasCalculated
    ? [
        {
          columnType: "Employment Hero subscription costs",
          upfront: "",
          year1: formatter.format(subscriptionCosts[0]),
          year2: formatter.format(subscriptionCosts[1]),
          year3: formatter.format(subscriptionCosts[2]),
          total: formatter.format(totalSubscriptionCosts),
        },
        {
          columnType: "External implementation costs",
          upfront: formatter.format(implementationCosts[1]),
          year1: "",
          year2: "",
          year3: "",
          total: formatter.format(implementationCosts[1]),
        },
        {
          columnType: "Internal implementation costs",
          upfront: formatter.format(implementationCosts[0]),
          year1: formatter.format(onGoingCosts[0]),
          year2: formatter.format(onGoingCosts[1]),
          year3: formatter.format(onGoingCosts[2]),
          total: formatter.format(totalOngoingCosts + implementationCosts[0]),
        },
        {
          columnType: "Total financial costs",
          upfront: "",
          year1: formatter.format(subscriptionCosts[0] + onGoingCosts[0]),
          year2: formatter.format(subscriptionCosts[1] + onGoingCosts[1]),
          year3: formatter.format(subscriptionCosts[2] + onGoingCosts[2]),
          total: formatter.format(
            totalOngoingCosts + totalSubscriptionCosts + totalImplementationCost
          ),
        },
      ]
    : [];

  const columns = useMemo(
    () => [
      {
        accessor: "columnType",
        width: "35%",
      },
      { Header: "Upfront", accessor: "upfront" },
      { Header: "Year 1 ", accessor: "year1" },
      { Header: "Year 2 ", accessor: "year2" },
      { Header: "Year 3 ", accessor: "year3" },
      { Header: "3 Year Total ", accessor: "total" },
    ],
    []
  );

  // Adding green background to ROI row
  const TableWrapper = styled(Table)`
    tr.custom-bg {
      background-color: ${theme.colors.palette.grotesqueGreenLight75};
    }
    tr.custom-hover-bg {
      &:hover {
        background-color: ${theme.colors.palette.grotesqueGreenLight75};
      }
    }
  `;
  const rowsConfig = {
    generateClassName: (row) => {
      if (row.original.columnType === "ROI") {
        return "custom-bg custom-hover-bg";
      }
      return undefined;
    },
  };

  return (
    <>
      <PageHeader title="Results" />
      <Box
        sx={{
          backgroundColor: "#ffffff",
          p: "medium",
          borderRadius: "10px",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "rgb(218, 219, 222)",
        }}
      >
        <Typography.Title
          level={3}
          style={{
            marginBottom: theme.space.medium,
          }}
        >
          Total Benefits
        </Typography.Title>
        <TableWrapper
          data={totalTableData}
          columns={columns}
          noData="No calculations have been made"
          rows={rowsConfig}
        />
        <Typography.Title
          level={3}
          style={{
            marginTop: theme.space.xxlarge,
            marginBottom: theme.space.medium,
          }}
        >
          Benefits
        </Typography.Title>
        <Table
          data={benefitsTableData}
          columns={columns}
          noData="No calculations have been made"
        />
        <Typography.Title
          level={3}
          style={{
            marginTop: theme.space.xxlarge,
            marginBottom: theme.space.medium,
          }}
        >
          Costs
        </Typography.Title>
        <Table
          data={costsTableData}
          columns={columns}
          noData="No calculations have been made"
        />
      </Box>
      <Disclaimer />
    </>
  );
};

export default ResultsPage;
