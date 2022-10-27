import styles from "./index.module.scss";
import useComponentVisible from "../outsideClickHandler/index";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Fetch } from "../../api/Fetch";
import { API, IMAGE, NOTIFICATION } from "../../constants";
import { getFormattedTime } from "../../util";
import { ICON } from "../../assets/index";
import { useNavigate } from "react-router-dom";

type InputProps = {
  onClickOutside: Function;
};

type NotificationProps = {
  channelRef?: string;
  sourceRef?: string;
  text: string;
  image: string;
  createdOn: string;
  type: number;
  onClick: Function;
  _id: string;
};

const Notification = (props: NotificationProps) => (
  <div
    className={styles["notification-user-data"]}
    onClick={() => props.onClick(props)}
    key={props._id}
  >
    <div className={styles["notification-image-container"]}>
      <img
        src={
          props.type !== NOTIFICATION.MESSAGE
            ? ICON.ADMIN
            : `${IMAGE.SMALL}${props.image}`
        }
        className={styles["notification-user-image"]}
        alt="profile"
      />
    </div>
    <div className={styles["notification-user-info"]}>
      <div className={styles["notification-user-message"]}>{props.text}</div>
      <div className={styles["notification-user-time"]}>
        {getFormattedTime(props.createdOn)}
      </div>
    </div>
  </div>
);

const NotificationPopup = ({ onClickOutside }: InputProps) => {
  const { ref, isComponentVisible } = useComponentVisible(true);

  const notifications = useAppSelector((state) => state.notifications.list);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = (type: number, sourceRef: string) => {
    if (type === NOTIFICATION.ASSIGN_SPECIALIST)
      navigate(`itinerary/detail/${sourceRef}`);
    else if (type === NOTIFICATION.MESSAGE) navigate(`chat/${sourceRef}`);
    else console.log("null");
  };

  useEffect(() => {
    dispatch(Fetch(API.NOTIFICATION_LIST, {}, 1, 1000000));
  }, [dispatch]);

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
          {notifications.map((notification: any) => (
            <Notification {...notification} onClick={handleClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup;
