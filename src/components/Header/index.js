// import PreRIcon from '../../assets/images/PreR-icon.png'
import AppLogo from "../../assets/images/logo.png";
import favicon from "../../assets/images/logo.png";
import Favicon from "react-favicon";
import React from "react";
// load styles
import "./index.scss";
// load images

export default () => (
  <section className="app__header">
    <Favicon url={favicon} />
    <img className="app__logo-img" src={AppLogo} height={30} />
    <span className="app__logo-text">
      <p className="app__pull-right">PluginFactory App</p>
    </span>
  </section>
);
