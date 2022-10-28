import { NavLink } from "react-router-dom";
import styles from "./index.module.scss";

const NavURL = (url: string) => `/${url.replace(" ", "").toLowerCase()}`;

const NavigationOption = (name: string, Icon: string, url?: string) => (
  <NavLink
    to={NavURL(url || name)}
    className={({ isActive }) =>
      `${styles["sidebar-item"]} ${isActive && styles["item-active"]}`
    }
    title={name}
  >
    <img
      src={Icon}
      alt={name}
      className={styles["sidebar-icon"]}
      width="22px"
      height="22px"
    />
    <span className={styles["sidebar-icon--name"]}>{name}</span>
    {name === "Chat" && (
      <div className={styles["sidebar-count"]}>
        <span className={styles["sidebar-count-view"]}>5</span>
      </div>
    )}
  </NavLink>
);

export default NavigationOption;
