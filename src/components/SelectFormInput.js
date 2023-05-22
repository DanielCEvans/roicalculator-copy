import { useState } from "react";
import {
  Box,
  Typography,
  theme,
  Select,
  Tooltip,
  Button,
  Modal,
} from "@hero-design/react";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const SelectFormInput = ({
  title,
  subTitle,
  htmlFor,
  value,
  options,
  id,
  intent,
  invalid,
  toolTipContent,
  buttonText,
  modalTitle,
  modalBody,
  handleInputChange,
}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Box style={{ marginBottom: theme.space.medium }}>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <Typography.Text
            tagName="label"
            htmlFor={htmlFor}
            fontWeight="bold"
            intent={intent}
          >
            {title}
          </Typography.Text>
          {toolTipContent && (
            <Tooltip
              style={{
                marginLeft: theme.space.small,
                paddingTop: theme.space.xsmall,
              }}
              target={<AiOutlineQuestionCircle style={{ color: "#7622d7" }} />}
              content={toolTipContent}
            />
          )}
          {buttonText && (
            <Button.Link
              text={buttonText}
              size="small"
              sx={{
                marginLeft: "10px",
                cursor: "pointer",
                textDecoration: "none",
              }}
              onClick={() => setOpenModal((value) => !value)}
            />
          )}
          {openModal && (
            <Modal
              title={modalTitle}
              open
              variant="primary"
              onClose={() => setOpenModal(false)}
              body={modalBody}
              footer={
                <>
                  <Button text="Close" onClick={() => setOpenModal(false)} />
                </>
              }
              style={{ position: "fixed" }}
            />
          )}
        </Box>
        <Select
          options={options}
          value={value}
          onChange={(e) => {
            handleInputChange(e, id);
          }}
          placeholder="Select..."
          id={id}
          style={{
            marginTop: theme.space.small,
            marginBottom: theme.space.xsmall,
          }}
          invalid={invalid}
        />
        {subTitle && (
          <Typography.Text fontSize={10} fontWeight="light" intent="subdued">
            {subTitle}
          </Typography.Text>
        )}
        {invalid && (
          <Typography.Text fontSize={12} intent={intent}>
            Required
          </Typography.Text>
        )}
      </Box>
    </>
  );
};

export default SelectFormInput;
