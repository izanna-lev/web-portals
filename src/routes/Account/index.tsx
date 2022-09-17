import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

import LoadingOverlay from "../../components/LoadingOverlay";
import SideNavBar from "../../components/SideNavBar";
import Header from "../../components/Header";
import styles from "./index.module.scss";

const Account = () => {
  const navigate = useNavigate();

  useEffect(() => {
    !localStorage.getItem("accessToken") &&
      navigate("/login", { replace: true });
  }, [navigate]);

  return (
    <div className={styles["page"]}>
      <LoadingOverlay />
      <Header />
      <section className={styles["page--bottom"]}>
        <SideNavBar />
        <Outlet />
      </section>
    </div>
  );
};

export default Account;
