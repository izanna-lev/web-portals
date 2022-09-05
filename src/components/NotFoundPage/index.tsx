import React from "react";
import { Link } from "react-router-dom";

import "./index.scss";

const NotFound = () => (
  <div className="container" id="notfound__container">
    <h1 className="notfound__error">404</h1>
    <p className="notfound__subtext">Oooooops!!!</p>
    <p>The page seems to have evaporated.</p>
    <Link to={"/"}>Continue to Homepage</Link>
  </div>
);
export default NotFound;
