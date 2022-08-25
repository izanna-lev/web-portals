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
import Toast from "../../components/Toast/index"
import { useAppSelector } from "../../store/hooks";
import { IMAGE_PREFIXES } from "../../constants";
type Props = {
  showUserData?: boolean
}

const Nav = ({ showUserData = true }: Props) => {
  const [notificationvisibility, setNotificationvisibility] = useState(false);

  const profileData = useAppSelector((state: { profile: { data: {
    name: string,
    email: string,
    phoneNumber: string,
    picture: string,
    device: string,
    fcmToken: string,
    _id: string,
  }}}) => state.profile.data);


  return (
    <section className={styles["navBar"]} id="navBar">
      <div className={styles["nav-head"]}>Onsite Travel</div>
      <Toast/> 

      {showUserData ?
        <>
          <div className={styles["notification"]}>
            <IoIosNotificationsOutline className={styles["notification-icon"]}
              onClick={() => setNotificationvisibility(!notificationvisibility)}
            />
            {notificationvisibility && <NotificationPopup onClickOutside={() => { setNotificationvisibility(false) }} />}
          </div>
          <div className={styles["user-data"]}>
            <div className={styles["image-container"]}>
              <img src={IMAGE_PREFIXES.IMAGE_SMALL + profileData.picture} className={styles["user-image"]} alt="profile" />
            </div>
            <div className={styles["user-info"]}>
              <div className={styles["user-welcome"]}>Welcome,</div>
              <div className={styles["user-name"]}>{profileData.name}</div>
            </div>
            <FiChevronDown className={styles["down-icon"]} />
          </div>
        </> : <></>}
    </section>
  );
}

export default Nav;
