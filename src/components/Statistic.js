import {
  Card,
  Typography,
  theme,
  Statistic,
  Box,
} from "@hero-design/react/lib";
import styled from "styled-components";

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
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {props.icon}
          <Statistic
            value={props.value}
            title={props.subtitle}
            intent="inherit"
            style={{ color: props.fontColor }}
          />
        </Box>
      </Card.Content>
    </Card>
  );
};

export default StatisticCard;
