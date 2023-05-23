import { Typography, theme } from "@hero-design/react/lib";

const TextSection = ({ children }) => {
  return (
    <>
      <Typography.Text
        fontSize={10}
        tagName="p"
        sx={{
          textAlign: "right",
          color: "rgb(114, 116, 120)",
          marginBottom: theme.space.small,
          marginTop: theme.space.small,
        }}
      >
        {children}
      </Typography.Text>
    </>
  );
};

const Disclaimer = () => {
  return (
    <>
      <TextSection>
        This data is sourced from Employment Hero customers feedback and
        aggregated Employment Hero platform data to analyse Australian Small and
        Medium Businesses’ market trends (SMBs). It is provided in good faith to
        assist employers and their employees. The data has been prepared by{" "}
        <a href="https://employmenthero.com/" target="_blank">
          Employment Hero Pty Ltd © 2023
        </a>{" "}
        (ABN 11 160 047 709) and its related bodies corporate (Employment Hero)
        and is current as at November 2022.
      </TextSection>
      <TextSection>
        Although the data is believed to be accurate and representative of SMBs
        in Employment Hero’s own customer base, it has not been independently
        verified.
      </TextSection>
      <TextSection>
        Employment Hero does not warrant that this data is representative of
        SMBs across Australia, that it is complete, accurate, up to date or fit
        for the purpose for which it is required.
      </TextSection>
      <TextSection>
        Employment Hero strongly advises that organisations conduct their own
        market analysis to determine the potential return on investment for
        their own business or seek professional advice before making any
        decisions or relying on the data.
      </TextSection>
      <TextSection>
        Employment Hero does not accept responsibility for any inaccuracy in
        this data and is not liable for any loss or damages arising directly or
        indirectly as a result of reliance on, use of or inability to use any
        data provided.
      </TextSection>
    </>
  );
};

export default Disclaimer;
