import { NavLink } from "react-router-dom";
import React from "react";

import styles from "./index.module.scss";

const NavigationOption = (name, Icon, url) => (
  <NavLink
    to={url || `/${name.replace(" ", "").toLowerCase()}`}
    className={({ isActive }) =>
      `${styles["sidebar-item"]} ${isActive && styles["item-active"]}`
    }
    title={name}
  >
    <img src={Icon} alt={name} className={styles["sidebar-icon"]} />
    <span className={styles["sidebar-icon--name"]}>{name}</span>
  </NavLink>
);

export default NavigationOption;
