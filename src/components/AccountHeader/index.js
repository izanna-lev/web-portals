import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Button from "@mui/material/Button";
import React from "react";

import Logo from "../../assets/images/logo_color.svg";
import Image from "../../components/Image";
import "./index.scss";

export default (props) => {
  const handleLogout = (e) => {
    localStorage.removeItem("accessToken");
    window.location = "/";
  };

  return (
    <section className="navigation-navbar">
      <section className="navbar-left">
        <MenuOutlinedIcon
          onClick={props.sidebarHandler}
          style={{ marginLeft: "20px", fontSize: "50px", color: "#E0000B" }}
        />
        <Image image={Logo} />
      </section>
      <section className="navbar-right">
        <Button
          onClick={handleLogout}
          className="navbar-button"
          style={{ borderRadius: "0" }}
        >
          <ExitToAppOutlinedIcon
            style={{ marginRight: "5px" }}
            fontSize="large"
          />
          Logout
        </Button>
      </section>
    </section>
  );
};
