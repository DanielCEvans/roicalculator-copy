import { Card, Typography, theme, Statistic } from "@hero-design/react/lib";
import styled from "styled-components";
import { BsHourglassSplit, BsCurrencyDollar } from "react-icons/bs";
import { AiOutlinePrinter } from "react-icons/ai";

const StyledContentWrapper = styled.div`
  padding: 0;
  margin: 0;
`;

const StatisticCard = (props) => {
  return (
    <Card
      style={{
        backgroundColor: props.backgroundColor,
        borderColor: props.borderColor,
      }}
    >
      <Card.Content
        style={{
          display: "flex",
          flexDirection: "column",
          gap: theme.space.large,
        }}
      >
        <StyledContentWrapper>
          <Typography.Text
            fontSize={16}
            style={{ color: props.fontColor }}
            fontWeight="light"
          >
            {props.title}
          </Typography.Text>
        </StyledContentWrapper>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {props.type === "time" && (
            <BsHourglassSplit size={35} style={{ color: props.fontColor }} />
          )}
          {props.type === "money" && (
            <BsCurrencyDollar size={30} style={{ color: props.fontColor }} />
          )}
          {props.type === "print" && (
            <AiOutlinePrinter size={40} style={{ color: props.fontColor }} />
          )}
          <Statistic
            value={props.value}
            title={props.subtitle}
            intent="inherit"
            style={{ color: props.fontColor }}
          />
        </div>
      </Card.Content>
    </Card>
  );
};

export default StatisticCard;
