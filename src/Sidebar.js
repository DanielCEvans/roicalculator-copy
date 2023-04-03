import React from "react";
import { useNavigate } from "react-router-dom";
import { SideBar } from "@hero-design/react";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import CompanyLogo from "./CompanyLogo";

function SideBarExample(props) {
  const navigate = useNavigate();
  const redirectTo = (url) => {
    navigate(url);
  };

  const onClickSideBarItem = (item) => {
    props.setSelectedItemId(item.id);
    redirectTo(item.url);
  };

  const items = {
    header: [
      {
        id: "switch_org",
        icon: <CompanyLogo />,
      },
    ],
    body: [
      {
        id: "calculator",
        icon: <BsIcons.BsCalculatorFill />,
        text: "Calculator",
        url: "/",
        dataAttrs: { "data-walk-identifier": "calculator-item" },
      },
      {
        id: "results",
        icon: <AiIcons.AiOutlineDollar />,
        text: "Results",
        url: "/results",
      },
      {
        id: "about",
        icon: <AiIcons.AiOutlineInfoCircle />,
        text: "About",
        url: "/about",
      },
    ],
    footer: [
      {
        id: "footer",
        icon: "",
        text: "",
        url: "",
      },
    ],
  };

  return (
    <>
      <SideBar
        items={items}
        selectedItemId={props.selectedItemId}
        onClickItem={onClickSideBarItem}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      />
    </>
  );
}

export default SideBarExample;
