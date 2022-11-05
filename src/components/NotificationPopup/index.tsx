import { useAppDispatch, useAppSelector } from "../../store/hooks";
import useComponentVisible from "../outsideClickHandler/index";
import { API, NOTIFICATION } from "../../constants";
import { useNavigate } from "react-router-dom";
import { getFormattedDate, getFormattedTime } from "../../util";
import { ICON } from "../../assets/index";
import styles from "./index.module.scss";
import { Fetch } from "../../api/Fetch";
import { useEffect } from "react";
import { UserIcon } from "../UserIcon";

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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = ({
    type,
    sourceRef,
  }: {
    type: number;
    sourceRef: string;
  }) => {
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
