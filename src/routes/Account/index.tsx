import { Outlet } from "react-router-dom";
import { useEffect } from "react";

import LoadingOverlay from "../../components/LoadingOverlay";
import SideNavBar from "../../components/SideNavBar";
import Header from "../../components/Header";
import Socket from "../../components/Socket";
import styles from "./index.module.scss";

const Account = () => {
  useEffect(() => {
    const requestNotificationPermission = () => {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") sessionStorage.setItem("fcm", "true");
        else {
          if (sessionStorage.getItem("fcm"))
            return sessionStorage.setItem("fcm", "false");
          else {
            sessionStorage.setItem("fcm", "false");
            alert(
              "Notification permission denied, you will not receive any notifications."
            );
          }
        }
      });
    };

    requestNotificationPermission();
  }, []);

  return (
    <>
      <div className={styles["page"]}>
        <Header />
        <section className={styles["page--bottom"]}>
          <SideNavBar />
          <Outlet />
        </section>
      </div>
      <Socket />
      <LoadingOverlay />
    </>
  );
};

export default Account;
