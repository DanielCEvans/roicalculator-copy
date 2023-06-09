import { useNavigate } from "react-router-dom";
import { SideBar } from "@hero-design/react";
import CompanyLogo from "./CompanyLogo";
import { BsCalculatorFill } from "react-icons/bs";
import { AiOutlineDollar, AiOutlineInfoCircle } from "react-icons/ai";
import useStore from "../context/store";

const SideBarExample = () => {
  const { sidebarSelectedItemId, setSidebarSelectedItemId } = useStore();
  const navigate = useNavigate();
  const redirectTo = (url) => {
    navigate(url);
  };

  const onClickSideBarItem = (item) => {
    setSidebarSelectedItemId(item.id);
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
        icon: <BsCalculatorFill />,
        text: "Calculator",
        url: "/",
        dataAttrs: { "data-walk-identifier": "calculator-item" },
      },
      {
        id: "results",
        icon: <AiOutlineDollar />,
        text: "Results",
        url: "/results",
      },
      {
        id: "about",
        icon: <AiOutlineInfoCircle />,
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
        selectedItemId={sidebarSelectedItemId}
        onClickItem={onClickSideBarItem}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      />
    </>
  );
};

export default SideBarExample;
