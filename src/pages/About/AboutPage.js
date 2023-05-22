import {
  Box,
  PageHeader,
  Button,
  Typography,
  theme,
  Divider,
} from "@hero-design/react";
import Disclaimer from "../../components/Disclaimer";
import useStore from "../../context/store";
import { useContext } from "react";
import { CountryContext } from "../../utils/countryFormatter";

const AboutText = ({ header, text, fontWeight }) => {
  return (
    <>
      <Typography.Title level={5}>{header}</Typography.Title>
      <Typography.Text
        fontSize={14}
        fontWeight={fontWeight ? fontWeight : "regular"}
        intent="body"
        style={{ marginBottom: theme.space.medium }}
      >
        {text}
      </Typography.Text>
    </>
  );
};

const AboutPage = () => {
  const { formData } = useStore();

  const countryInfo = useContext(CountryContext);

  const reportLandingPage = formData.country
    ? countryInfo[formData.country].reportLandingPage
    : countryInfo["AU"].reportLandingPage;

  return (
    <>
      <PageHeader title="How the calculator works" />
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
          Benefits
        </Typography.Title>
        <Divider marginY="medium" />
        <AboutText
          header="Employment team financial benefits"
          text="The financial gains each year from the improved efficiency of the
          employment team is calculated by multiplying the number of employees
          working on employment admin (HR and Payroll), by the average hours
          saved per month by admins from using Employment Hero, by the average
          hourly rate of the employment team, by the numbers of months in the
          year, minus 20% to account for the differences in ways organisations
          manager their employment function. Our research found that on average,
          Employment Hero reduced the number of hours spent by the employment
          team each month by 39% in the first year, 40.5% the second year, and
          42% in the third year."
        />
        <AboutText
          header="Organisation financial benefits"
          text="The yearly financial gains from the improved efficiency to the entire
          organisation is determined by first calculating the time spent on
          employment admin. Our research found that 5% hourly is spent on
          employment admin. This figure is multiplied by the number of days
          worked each week (we assume full time employees work 5 days per week
          while part time and casual employees work 2.5 days per week), by the
          number of weeks in a year, by the number of employees not working in
          the employment team. The result of this calculation is then multiplied
          by the average reduction in employment admin from using Employment
          Hero (this is dependent upon the plan selected), by the average
          efficiency gains of the organisation, by the average hourly rate of
          employees, minus 20% to account for the differences in ways
          organisations manager their employment function. Note that the average
          reduction in employment admin and the efficiency gains of the
          organisation were both determined from the research."
        />
        <AboutText
          header="Replacing existing technology financial benefits"
          text="The financial benefits of replacing existing technology is calculated
          by multiplying the annual costs of service providers used, by the
          average percentage saved on providers, plus the annual cost of current
          software being replaced, minus 20% to account for differences in
          service providers and tech used. Our research found that the average
          percentage saved on providers by using Employment Hero is 25%."
        />
        <AboutText
          header="Reduction in printing financial benefits"
          text="The financial benefits from reduction in printing is calculated by
          multiplying the pages printed each year by the printing cost per page,
          by the average proportion of employment management conducted on paper,
          by the average reduction in paper and printing materials from using
          Employment Hero, minus 20% to account for any differences in paper and
          printing material usage across organisations. Note that the average
          proportion of employment management conducted on paper and the average
          reduction in paper and printing materials from using Employment Hero
          were both determined from our research. We estimate that printing
          costs are $0.5 dollars per page."
        />
        <Divider marginY="medium" />
        <Typography.Title level={3}>Costs</Typography.Title>
        <Divider marginY="medium" />
        <AboutText
          header="Employment Hero subscription costs"
          text="The subscription costs of using Employment Hero are calculated by
          multiplying the licensing costs per employee by the number of
          employees in the organisations, by a forecasted increase of 10% in
          licensing fees in year 2 and year 3. Note that the licensing costs per
          employee is dependent upon the plan selected."
        />
        <AboutText
          header="External implementation costs"
          text="The external implementation cost is determined from the implementation
          method and plan selected."
        />
        <AboutText
          header="Internal implementation costs"
          text="The upfront internal implementation cost is calculated by adding the
          number of guided workshops attended and the time taken to set up data
          and debrief with customer service, multiplying this by the number of
          people in the employment team, by the average hourly rate of the
          employment team, plus 20% to account for differences in organisation
          capability to self implement. The number of guided workshops is
          dependent upon the plan selected. The ongoing cost of maintaining the
          Employment Hero platform is calculated by multiplying the estimated
          time spent on platform maintenance per month, by number of people in
          the employment team, by the average hourly rate of the employment
          team, by the number of months in a year, plus 20% to account for
          differences in organisation capability to self implement. We estimate
          that 2 hours per month will be required for platform maintenance."
        />
      </Box>
      <PageHeader title="The Research" />
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
        <AboutText
          text="This calculator is based on market research Employment Hero performed
          among customers to understand the return on investment organisations
          could achieve by using Employment Hero. The research identified four
          key areas of financial benefit and three key areas of financial cost
          which were used to model the return on investment customers experience
          by rolling out Employment Hero."
        />
        <AboutText text="Benefits" fontWeight="bold" />
        <ul style={{ marginLeft: theme.space.large }}>
          <li key={1}>
            <AboutText
              text="Employment team (HR/Payroll professionals) financial gains from
              streamlining numerous employment tasks such as onboarding, leave
              request, payroll, performance reviews and much more."
            />
          </li>
          <li key={2}>
            <AboutText
              text="Organisations financial gains from the time saved by managers and
              employees with dealing with their employment admin."
            />
          </li>
          <li key={3}>
            <AboutText
              text="Costs saved in service providers used such as lawyers, training
              providers and agencies, and costs saved by replacing current
              software."
            />
          </li>
          <li key={4}>
            <AboutText text="Reduction in printing financial benefits" />
          </li>
        </ul>
        <AboutText text="Costs" fontWeight="bold" />
        <ul
          style={{
            marginLeft: theme.space.large,
            marginBottom: theme.space.medium,
          }}
        >
          <li key={1}>
            <AboutText
              text="Licensing costs based on the plan of choice and number of
              employees within the organisation"
            />
          </li>
          <li key={2}>
            <AboutText text="Implementation costs based on the preferred implementation method" />
          </li>
          <li key={3}>
            <AboutText
              text="Internal implementation costs and maintenance of the Employment
              Hero platform"
            />
          </li>
        </ul>
        <Button.Link
          href={reportLandingPage}
          text="Click here to view the full report"
        />
      </Box>
      <Disclaimer />
    </>
  );
};

export default AboutPage;
