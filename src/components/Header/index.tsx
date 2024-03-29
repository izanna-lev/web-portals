/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import styles from "./index.module.scss";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FiChevronDown } from "react-icons/fi";
import { useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";
import NotificationPopup from "../NotificationPopup";
import Logout from "../Logout";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { API, IMAGE } from "../../constants";
import { Fetch } from "../../api/Fetch";
import { setSidebar } from "../../store/slices/appData";
import { useNavigate } from "react-router-dom";
import { setBackground } from "../../util";
import { ICON } from "../../assets/index";
import { chatList } from "../../store/Actions/chat";

type Props = {
  showUserData?: boolean;
};

type ProfileData = {
  profile: {
    name: string;
    email: string;
    phoneNumber: string;
    image: string;
    device: string;
    fcmToken: string;
    _id: string;
  };
};

const Header = ({ showUserData = true }: Props) => {
  const [notificationvisibility, setNotificationvisibility] = useState(false);
  const [logoutVisibility, setLogoutVisibility] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const profileData = useAppSelector((state: ProfileData) => state.profile);

  const sidebar = useAppSelector((state) => state.appData.sidebarSmall);

  const { totalUnread } = useAppSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(chatList());
    dispatch(Fetch(API.NOTIFICATION_LIST, {}, 1, 15));
  }, [dispatch]);

  useEffect(() => {
    if (!profileData._id && showUserData)
      dispatch(
        Fetch(API.PROFILE, {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        })
      );
  }, [dispatch, profileData._id, showUserData]);

  useEffect(() => {
    setBackground(
      profileData.image
        ? `${IMAGE.AVERAGE}${profileData.image}`
        : ICON.USER_PLACEHOLDER,
      "header-profile-image",
      "cover"
    );
  }, [profileData.image]);

  return (
    <header className={styles["header"]} id="navBar">
      <div className={styles["header-left"]}>
        <MdMenu
          onClick={() => dispatch(setSidebar(!sidebar))}
          className={styles["header__menu--icon"]}
        />

        <img
          alt="Onsite"
          src={ICON.APP_LOGO}
          className={styles["header-logo"]}
          loading="lazy"
          onClick={() => navigate("/dashboard")}
        />
      </div>

      <div className={styles["header-right"]}>
        <div className={styles["notification"]}>
          <div className={styles["notification-icon-wrapper"]}>
            <IoIosNotificationsOutline
              className={styles["notification-icon"]}
              onClick={() => setNotificationvisibility(!notificationvisibility)}
            />
            {totalUnread ? (
              <div className={styles["notification-unread"]}></div>
            ) : null}
          </div>
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
            <div
              className={styles["header-image-wrapper"]}
              id="header-profile-image"
            ></div>
          </div>
          <div className={styles["user-info"]}>
            <div className={styles["user-welcome"]}>Welcome,</div>
            <div className={styles["user-name"]}>{profileData.name}</div>
          </div>
        </div>

        <div className={styles["logout-container"]}>
          <FiChevronDown
            className={styles["down-icon"]}
            onClick={() => setLogoutVisibility(!logoutVisibility)}
          />
          {logoutVisibility && (
            <Logout
              onClickOutside={() => {
                setLogoutVisibility(false);
              }}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
