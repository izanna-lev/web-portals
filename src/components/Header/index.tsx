/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import styles from "./index.module.scss";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FiChevronDown } from "react-icons/fi";
import { useEffect, useState } from "react";
import NotificationPopup from "../NotificationPopup/index";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { API, IMAGE } from "../../constants";
import { Fetch } from "../../api/Fetch";
type Props = {
  showUserData?: boolean;
};

const Nav = ({ showUserData = true }: Props) => {
  const [notificationvisibility, setNotificationvisibility] = useState(false);

  const profileData = useAppSelector(
    (state: {
      profile: {
        name: string;
        email: string;
        phoneNumber: string;
        image: string;
        device: string;
        fcmToken: string;
        _id: string;
      };
    }) => state.profile
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!profileData._id && showUserData) {
      dispatch(Fetch(API.PROFILE));
    }
  }, [dispatch, profileData._id, showUserData]);

  return (
    <header className={styles["header"]} id="navBar">
      <div className={styles["header-left"]}>
        <h1 className={styles["header-logo"]}>Onsite Travel</h1>
      </div>

      <div className={styles["header-right"]}>
        <div className={styles["notification"]}>
          <IoIosNotificationsOutline
            className={styles["notification-icon"]}
            onClick={() => setNotificationvisibility(!notificationvisibility)}
          />
          {notificationvisibility && (
            <NotificationPopup
              onClickOutside={() => {
                setNotificationvisibility(false);
              }}
            />
          )}
        </div>
        <div className={styles["user-data"]}>
          <div className={styles["image-container"]}>
            <img
              src={`${IMAGE.SMALL}${profileData.image}`}
              className={styles["user-image"]}
              alt="profile"
            />
          </div>
          <div className={styles["user-info"]}>
            <div className={styles["user-welcome"]}>Welcome,</div>
            <div className={styles["user-name"]}>{profileData.name}</div>
          </div>
          <FiChevronDown className={styles["down-icon"]} />
        </div>
      </div>
    </header>
  );
};

export default Nav;
