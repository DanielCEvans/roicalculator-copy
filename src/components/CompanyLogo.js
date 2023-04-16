import logo from "../assets/ehLogo.png";

const CompanyLogo = () => {
  return (
    <>
      <img
        src={logo}
        alt="sidebar-logo"
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
        }}
      />
    </>
  );
};

export default CompanyLogo;
