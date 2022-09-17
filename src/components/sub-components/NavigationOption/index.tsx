import { NavLink } from "react-router-dom";
import styles from "./index.module.scss";
import { useAppSelector } from "../../../store/hooks";

const NavURL = (url: string) => `/${url.replace(" ", "").toLowerCase()}`;

const NavigationOption = (
  name: string,
  Icon: string,
  value: number,
  url?: string
) => {
  const ActiveNav = useAppSelector((state) => state.navigation.value);

  return (
    <NavLink
      to={NavURL(url || name)}
      className={`${styles["sidebar-item"]} ${
        ActiveNav === value && styles["item-active"]
      }`}
      title={name}
    >
      <img src={Icon} alt={name} className={styles["sidebar-icon"]} />
      <span className={styles["sidebar-icon--name"]}>{name}</span>
    </NavLink>
  );
};

export default NavigationOption;
