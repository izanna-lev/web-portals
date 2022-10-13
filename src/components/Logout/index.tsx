import styles from "./index.module.scss";
import useComponentVisible from "../outsideClickHandler/index";
import { useEffect } from "react";
import { ICON } from "../../assets/index";
import { useNavigate } from "react-router-dom";

type InputProps = {
  onClickOutside: Function;
};

const Logout = ({ onClickOutside }: InputProps) => {
  const { ref, isComponentVisible } = useComponentVisible(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  useEffect(() => {
    if (!isComponentVisible) {
      onClickOutside();
    }
  }, [isComponentVisible]);

  return (
    <div ref={ref} id="logout-popup" className={styles["logout-popup"]}>
      <div className={`${styles.box} ${styles.arrow}`} onClick={handleLogout}>
        <img src={ICON.LOGOUT} alt="" className={styles["logout-icon"]} />
        <span className={styles["logout-heading"]}>Logout</span>
      </div>
    </div>
  );
};

export default Logout;
