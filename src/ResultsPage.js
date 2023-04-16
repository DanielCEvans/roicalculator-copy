import { useMemo } from "react";
import { Box, PageHeader, Table, Typography, theme } from "@hero-design/react";
import styled from "styled-components";
import Disclaimer from "./Disclaimer";

const ResultsPage = (props) => {
  let currency;
  if (props.country === "AU") {
    currency = "AUD";
  } else if (props.country === "NZ") {
    currency = "NZD";
  } else if (props.country === "UK") {
    currency = "GBP";
  } else if (props.country === "SG") {
    currency = "SGD";
  } else if (props.country === "MY") {
    currency = "MYR";
  } else {
    currency = "AUD";
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });
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
  const totalTableData =
    Object.keys(props.totalTable).length !== 0
      ? [
          {
            columnType: "Total Benefits",
            upfront: "",
            year1: formatter.format(props.totalTable.totalBenefitsYear1),
            year2: formatter.format(props.totalTable.totalBenefitsYear2),
            year3: formatter.format(props.totalTable.totalBenefitsYear3),
            total: formatter.format(props.totalTable.threeYeartotalbenefits),
          },
          {
            columnType: "Total Costs",
            upfront: formatter.format(props.totalTable.totalUpfront),
            year1: formatter.format(props.totalTable.totalCostYear1),
            year2: formatter.format(props.totalTable.totalCostYear2),
            year3: formatter.format(props.totalTable.totalCostYear3),
            total: formatter.format(props.totalTable.threeYearTotalCost),
          },
          {
            columnType: "Net Benefits",
            upfront: formatter.format(props.totalTable.upfrontNetBenefits),
            year1: formatter.format(props.totalTable.year1NetBenefits),
            year2: formatter.format(props.totalTable.year2NetBenefits),
            year3: formatter.format(props.totalTable.year3NetBenefits),
            total: formatter.format(props.totalTable.threeYearTotalNetBenefits),
          },
          {
            columnType: "ROI",
            upfront: "",
            year1: `${props.totalTable.year1Roi.toFixed(0)}%`,
            year2: `${props.totalTable.year2Roi.toFixed(0)}%`,
            year3: `${props.totalTable.year3Roi.toFixed(0)}%`,
            total: `${props.totalTable.threeYearTotalROI.toFixed(0)}%`,
          },
        ]
      : [];

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

  const benefitsTableData =
    Object.keys(props.benefitsTable).length !== 0
      ? [
          {
            columnType: `Employment team financial benefits`,
            upfront: "",
            year1: formatter.format(props.benefitsTable.year1Benefit1),
            year2: formatter.format(props.benefitsTable.year2Benefit1),
            year3: formatter.format(props.benefitsTable.year3Benefit1),
            total: formatter.format(props.benefitsTable.threeYeartotalbenefit1),
          },
          {
            columnType: "Organisation financial benefits",
            upfront: "",
            year1: formatter.format(
              props.benefitsTable.orgOverallFincancialGainsAdjustedYear1
            ),
            year2: formatter.format(
              props.benefitsTable.orgOverallFincancialGainsAdjustedYear2
            ),
            year3: formatter.format(
              props.benefitsTable.orgOverallFincancialGainsAdjustedYear3
            ),
            total: formatter.format(props.benefitsTable.threeYeartotalbenefit2),
          },
          {
            columnType: "Replacing existing technology financial benefits",
            upfront: "",
            year1: formatter.format(
              props.benefitsTable.costSavedInServicesAndTechnologyYear1
            ),
            year2: formatter.format(
              props.benefitsTable.costSavedInServicesAndTechnologyYear2
            ),
            year3: formatter.format(
              props.benefitsTable.costSavedInServicesAndTechnologyYear3
            ),
            total: formatter.format(props.benefitsTable.threeYeartotalbenefit3),
          },
          {
            columnType: "Reduction in printing financial benefits",
            upfront: "",
            year1: formatter.format(
              props.benefitsTable.reductionPrintingAdjustedYear1
            ),
            year2: formatter.format(
              props.benefitsTable.reductionPrintingAdjustedYear2
            ),
            year3: formatter.format(
              props.benefitsTable.reductionPrintingAdjustedYear3
            ),
            total: formatter.format(props.benefitsTable.threeYeartotalbenefit4),
          },
          {
            columnType: "Total financial benefits",
            upfront: "",
            year1: formatter.format(props.benefitsTable.totalBenefitsYear1),
            year2: formatter.format(props.benefitsTable.totalBenefitsYear2),
            year3: formatter.format(props.benefitsTable.totalBenefitsYear3),
            total: formatter.format(props.benefitsTable.threeYeartotalbenefits),
          },
        ]
      : [];

  const costsTableData =
    Object.keys(props.costsTable).length !== 0
      ? [
          {
            columnType: "Employment Hero subscription costs",
            upfront: "",
            year1: formatter.format(props.costsTable.subscriptionCostYear1),
            year2: formatter.format(props.costsTable.subscriptionCostYear2),
            year3: formatter.format(props.costsTable.subscriptionCostYear3),
            total: formatter.format(props.costsTable.subscriptionCostYearTotal),
          },
          {
            columnType: "External implementation costs",
            upfront: formatter.format(
              props.costsTable.upfrontImplementationCost
            ),
            year1: "",
            year2: "",
            year3: "",
            total: formatter.format(props.costsTable.upfrontImplementationCost),
          },
          {
            columnType: "Internal implementation costs",
            upfront: formatter.format(
              props.costsTable.internalImplementationCostUpfront
            ),
            year1: formatter.format(
              props.costsTable.internalImplementationCostYear1
            ),
            year2: formatter.format(
              props.costsTable.internalImplementationCostYear2
            ),
            year3: formatter.format(
              props.costsTable.internalImplementationCostYear3
            ),
            total: formatter.format(
              props.costsTable.internalImplementationCostTotal
            ),
          },
          {
            columnType: "Total financial costs",
            upfront: "",
            year1: formatter.format(props.costsTable.totalCostYear1),
            year2: formatter.format(props.costsTable.totalCostYear2),
            year3: formatter.format(props.costsTable.totalCostYear3),
            total: formatter.format(props.costsTable.threeYearTotalCost),
          },
        ]
      : [];

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
