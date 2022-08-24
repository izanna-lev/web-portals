/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */
import "react-toastify/dist/ReactToastify.css";
import styles from "./index.module.scss";
import { IoIosNotificationsOutline } from "react-icons/io"
import { FiChevronDown } from "react-icons/fi"
import { useState } from "react";
import NotificationPopup from '../../components/NotificationPopup/index'
import ErrorPage from "../ErrorPage/index";

type Props = {
  showUserData?: boolean
}

const Nav = ({ showUserData = true }: Props) => {
  const [notificationvisibility, setNotificationvisibility] = useState(false);


  return (
    <section className={styles["navBar"]} id="navBar">
      <div className={styles["nav-head"]}>Onsite Travel</div>
      {/* <ErrorPage/> */}

      {showUserData &&
        <>
            

          <div className={styles["notification"]}>
            <IoIosNotificationsOutline className={styles["notification-icon"]}
              onClick={() => setNotificationvisibility(!notificationvisibility)}
            />
            {notificationvisibility && <NotificationPopup onClickOutside={() => { setNotificationvisibility(false) }} />}
          </div>
          <div className={styles["user-data"]}>
            <div className={styles["image-container"]}>
              <img src="https://sneakers-app.s3.amazonaws.com/staging/images/small/staging-image-1658749914901-223" className={styles["user-image"]} alt="profile" />
            </div>
            <div className={styles["user-info"]}>
              <div className={styles["user-welcome"]}>Welcome,</div>
              <div className={styles["user-name"]}>Steven Walter</div>
            </div>
            <FiChevronDown className={styles["down-icon"]} />
          </div>
        </>}
    </section>
  );
}

export default Nav;
