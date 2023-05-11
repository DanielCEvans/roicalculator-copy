import { useMemo } from "react";
import { Box, PageHeader, Table, Typography, theme } from "@hero-design/react";
import styled from "styled-components";
import Disclaimer from "../../components/Disclaimer";
import useStore from "../../context/store";
import { countryFormatter } from "../../utils/countryFormatter";

const ResultsPage = () => {
  const { formData, totalTable, benefitsTable, costsTable } = useStore();

  const formatter = countryFormatter(formData.country);

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
    Object.keys(totalTable).length !== 0
      ? [
          {
            columnType: "Total Benefits",
            upfront: "",
            year1: formatter.format(totalTable.totalBenefitsYear1),
            year2: formatter.format(totalTable.totalBenefitsYear2),
            year3: formatter.format(totalTable.totalBenefitsYear3),
            total: formatter.format(totalTable.threeYeartotalbenefits),
          },
          {
            columnType: "Total Costs",
            upfront: formatter.format(totalTable.totalUpfront),
            year1: formatter.format(totalTable.totalCostYear1),
            year2: formatter.format(totalTable.totalCostYear2),
            year3: formatter.format(totalTable.totalCostYear3),
            total: formatter.format(totalTable.threeYearTotalCost),
          },
          {
            columnType: "Net Benefits",
            upfront: formatter.format(totalTable.upfrontNetBenefits),
            year1: formatter.format(totalTable.year1NetBenefits),
            year2: formatter.format(totalTable.year2NetBenefits),
            year3: formatter.format(totalTable.year3NetBenefits),
            total: formatter.format(totalTable.threeYearTotalNetBenefits),
          },
          {
            columnType: "ROI",
            upfront: "",
            year1: `${totalTable.year1Roi.toFixed(0)}%`,
            year2: `${totalTable.year2Roi.toFixed(0)}%`,
            year3: `${totalTable.year3Roi.toFixed(0)}%`,
            total: `${totalTable.threeYearTotalROI.toFixed(0)}%`,
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
    Object.keys(benefitsTable).length !== 0
      ? [
          {
            columnType: `Employment team financial benefits`,
            upfront: "",
            year1: formatter.format(benefitsTable.year1Benefit1),
            year2: formatter.format(benefitsTable.year2Benefit1),
            year3: formatter.format(benefitsTable.year3Benefit1),
            total: formatter.format(benefitsTable.threeYeartotalbenefit1),
          },
          {
            columnType: "Organisation financial benefits",
            upfront: "",
            year1: formatter.format(
              benefitsTable.orgOverallFincancialGainsAdjustedYear1
            ),
            year2: formatter.format(
              benefitsTable.orgOverallFincancialGainsAdjustedYear2
            ),
            year3: formatter.format(
              benefitsTable.orgOverallFincancialGainsAdjustedYear3
            ),
            total: formatter.format(benefitsTable.threeYeartotalbenefit2),
          },
          {
            columnType: "Replacing existing technology financial benefits",
            upfront: "",
            year1: formatter.format(
              benefitsTable.costSavedInServicesAndTechnologyYear1
            ),
            year2: formatter.format(
              benefitsTable.costSavedInServicesAndTechnologyYear2
            ),
            year3: formatter.format(
              benefitsTable.costSavedInServicesAndTechnologyYear3
            ),
            total: formatter.format(benefitsTable.threeYeartotalbenefit3),
          },
          {
            columnType: "Reduction in printing financial benefits",
            upfront: "",
            year1: formatter.format(
              benefitsTable.reductionPrintingAdjustedYear1
            ),
            year2: formatter.format(
              benefitsTable.reductionPrintingAdjustedYear2
            ),
            year3: formatter.format(
              benefitsTable.reductionPrintingAdjustedYear3
            ),
            total: formatter.format(benefitsTable.threeYeartotalbenefit4),
          },
          {
            columnType: "Total financial benefits",
            upfront: "",
            year1: formatter.format(benefitsTable.totalBenefitsYear1),
            year2: formatter.format(benefitsTable.totalBenefitsYear2),
            year3: formatter.format(benefitsTable.totalBenefitsYear3),
            total: formatter.format(benefitsTable.threeYeartotalbenefits),
          },
        ]
      : [];

  const costsTableData =
    Object.keys(costsTable).length !== 0
      ? [
          {
            columnType: "Employment Hero subscription costs",
            upfront: "",
            year1: formatter.format(costsTable.subscriptionCostYear1),
            year2: formatter.format(costsTable.subscriptionCostYear2),
            year3: formatter.format(costsTable.subscriptionCostYear3),
            total: formatter.format(costsTable.subscriptionCostYearTotal),
          },
          {
            columnType: "External implementation costs",
            upfront: formatter.format(costsTable.upfrontImplementationCost),
            year1: "",
            year2: "",
            year3: "",
            total: formatter.format(costsTable.upfrontImplementationCost),
          },
          {
            columnType: "Internal implementation costs",
            upfront: formatter.format(
              costsTable.internalImplementationCostUpfront
            ),
            year1: formatter.format(costsTable.internalImplementationCostYear1),
            year2: formatter.format(costsTable.internalImplementationCostYear2),
            year3: formatter.format(costsTable.internalImplementationCostYear3),
            total: formatter.format(costsTable.internalImplementationCostTotal),
          },
          {
            columnType: "Total financial costs",
            upfront: "",
            year1: formatter.format(costsTable.totalCostYear1),
            year2: formatter.format(costsTable.totalCostYear2),
            year3: formatter.format(costsTable.totalCostYear3),
            total: formatter.format(costsTable.threeYearTotalCost),
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
