/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import styles from "./index.module.scss";
import { IoIosNotificationsOutline } from "react-icons/io"
import { FiChevronDown } from "react-icons/fi"
import NotificationPopup from '../../components/NotificationPopup/index'
import { Modal } from '../../components/Portal'
import { useRef, useState } from "react";

type Props = {
  showUserData?: boolean
}

const Nav = ({ showUserData }: Props) => {
  const [notificationvisibility, setNotificationvisibility] = useState(false);


  return (
    <section className={styles["navBar"]} id="navBar">
      <div className={styles["nav-head"]}>Onsite Travel</div>


      { showUserData && 
      <>
      <div className={styles["notification"]}>
      <IoIosNotificationsOutline className={styles["notification-icon"]}
        onClick={() => setNotificationvisibility(!notificationvisibility)}
      />
      {notificationvisibility && <NotificationPopup  onClickOutside={() => {setNotificationvisibility(false)}} />}
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

// handles the outgoing dispatches
const mapDispatchToProps = () => {
  return {};
};

// handles incoming state changes
const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
function useEffect(arg0: () => () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}

function handleClickOutside(arg0: string, handleClickOutside: any, arg2: boolean) {
  throw new Error("Function not implemented.");
}

