import { NavLink } from "react-router-dom";
import styles from "./index.module.scss";
import { useAppSelector } from "../../../store/hooks";

const NavURL = (url: string) => `/${url.replace(" ", "").toLowerCase()}`;

const NavigationOption = (name: string, Icon: string, url?: string) => {
  return (
    <NavLink
      to={NavURL(url || name)}
      className={({ isActive }) =>
        `${styles["sidebar-item"]} ${isActive && styles["item-active"]}`
      }
      title={name}
    >
      <img src={Icon} alt={name} className={styles["sidebar-icon"]} />
      <span className={styles["sidebar-icon--name"]}>{name}</span>
      {name === "Chat" && (
        <div className={styles["sidebar-count"]}>
          <span className={styles["sidebar-count-view"]}>5</span>
        </div>
      )}
    </NavLink>
  );
};

export default NavigationOption;
