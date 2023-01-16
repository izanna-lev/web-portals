import { useAppSelector } from "../../store/hooks";
import useComponentVisible from "../outsideClickHandler/index";
import { NOTIFICATION } from "../../constants";
import { useNavigate } from "react-router-dom";
import { getFormattedDate, getFormattedTime } from "../../util";
import { ICON } from "../../assets/index";
import styles from "./index.module.scss";

import { useEffect } from "react";
import { UserIcon } from "../UserIcon";
import Socket from "../../services/socket";
import { socket } from "../Socket";

type InputProps = {
  onClickOutside: Function;
};

type NotificationProps = {
  sourceRef?: string;
  text: string;
  image: string;
  createdOn: string;
  type: number;
  onClick: Function;
  _id: string;
  seen: boolean;
};

const Notification = (props: NotificationProps) => {
  return (
    <div className={styles["notification-wrapper"]} key={props._id}>
      <div
        className={styles["notification-user-data"]}
        onClick={() => props.onClick(props)}
      >
        <div className={styles["notification-image-container"]}>
          <UserIcon
            image={props.type === NOTIFICATION.MESSAGE && props.image}
            icon={props.type !== NOTIFICATION.MESSAGE && ICON.ADMIN}
          />
          {!props.seen ? (
            <div className={styles["notification-unread"]}></div>
          ) : null}
        </div>
        <div className={styles["notification-user-info"]}>
          <div className={styles["notification-user-message"]}>
            {props.text}
          </div>
          <div className={styles["notification-user-time"]}>
            {`${getFormattedDate(props.createdOn)} ${getFormattedTime(
              props.createdOn
            )}`}
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationPopup = ({ onClickOutside }: InputProps) => {
  const { ref, isComponentVisible } = useComponentVisible(true);

  const notifications = useAppSelector((state) => state.notifications.list);

  const myProfile = useAppSelector((state) => state.profile);

  const navigate = useNavigate();

  const handleClick = ({
    type,
    sourceRef,
    _id,
  }: {
    type: number;
    sourceRef: string;
    _id: string;
  }) => {
    if (socket.connected) {
      Socket.notificationRead({ notificationRef: _id, id: myProfile._id });
    }

    if (type === NOTIFICATION.ASSIGN_SPECIALIST) {
      onClickOutside();
      return navigate(`itinerary/detail/${sourceRef}`);
    }
    if (type === NOTIFICATION.MESSAGE) {
      onClickOutside();
      return navigate(`chat/${sourceRef}`);
    }
  };

  useEffect(() => {
    if (!isComponentVisible) onClickOutside();
  }, [isComponentVisible]);

  return (
    <div
      ref={ref}
      id="notification-popup"
      className={styles["notification-popup"]}
    >
      <div className={`${styles.box} ${styles.arrow}`}>
        <div className={styles["notification-heading"]}>Notifications</div>
        <div className={styles["list-container"]}>
          {notifications.map((notification: any, index: number) => (
            <Notification key={index} {...notification} onClick={handleClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup;
