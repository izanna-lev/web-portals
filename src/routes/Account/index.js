import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

import Header from "../../components/Header";
import SideNavBar from "../../components/SideNavBar";
import styles from "./index.module.scss";

const Account = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    !localStorage.getItem("accessToken") &&
      navigate("/login", { replace: true });
  }, [navigate]);

  return (
    <div className={styles["page"]}>
      <Header />
      <section className={styles["page--bottom"]}>
        <SideNavBar />
        <Outlet />
      </section>
    </div>
  );
};

export default Account;
