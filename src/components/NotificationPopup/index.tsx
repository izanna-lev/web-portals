import styles from "./index.module.scss";
import useComponentVisible from "../outsideClickHandler/index";
import { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { Fetch } from "../../api/Fetch";
import { API } from "../../constants";

type InputProps = {
  onClickOutside: Function;
};

const Form = ({ onClickOutside }: InputProps) => {
  const { ref, isComponentVisible } = useComponentVisible(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(Fetch(API.NOTIFICATION_LIST));
  }, [dispatch]);

  useEffect(() => {
    if (!isComponentVisible) {
      onClickOutside();
    }
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
          <div className={styles["notification-user-data"]}>
            <div className={styles["notification-image-container"]}>
              <img
                src="https://sneakers-app.s3.amazonaws.com/staging/images/small/staging-image-1658749914901-223"
                className={styles["notification-user-image"]}
                alt="profile"
              />
            </div>
            <div className={styles["notification-user-info"]}>
              <div className={styles["notification-user-message"]}>
                Admin has sent you a message.
              </div>
              <div className={styles["notification-user-time"]}>2:30 PM</div>
            </div>
          </div>
          <div className={styles["notification-user-data"]}>
            <div className={styles["notification-image-container"]}>
              <img
                src="https://sneakers-app.s3.amazonaws.com/staging/images/small/staging-image-1658749914901-223"
                className={styles["notification-user-image"]}
                alt="profile"
              />
            </div>
            <div className={styles["notification-user-info"]}>
              <div className={styles["notification-user-message"]}>
                Admin has sent you a message.
              </div>
              <div className={styles["notification-user-time"]}>2:30 PM</div>
            </div>
          </div>{" "}
          <div className={styles["notification-user-data"]}>
            <div className={styles["notification-image-container"]}>
              <img
                src="https://sneakers-app.s3.amazonaws.com/staging/images/small/staging-image-1658749914901-223"
                className={styles["notification-user-image"]}
                alt="profile"
              />
            </div>
            <div className={styles["notification-user-info"]}>
              <div className={styles["notification-user-message"]}>
                Admin has sent you a message.
              </div>
              <div className={styles["notification-user-time"]}>2:30 PM</div>
            </div>
          </div>{" "}
          <div className={styles["notification-user-data"]}>
            <div className={styles["notification-image-container"]}>
              <img
                src="https://sneakers-app.s3.amazonaws.com/staging/images/small/staging-image-1658749914901-223"
                className={styles["notification-user-image"]}
                alt="profile"
              />
            </div>
            <div className={styles["notification-user-info"]}>
              <div className={styles["notification-user-message"]}>
                Admin has sent you a message.
              </div>
              <div className={styles["notification-user-time"]}>2:30 PM</div>
            </div>
          </div>{" "}
          <div className={styles["notification-user-data"]}>
            <div className={styles["notification-image-container"]}>
              <img
                src="https://sneakers-app.s3.amazonaws.com/staging/images/small/staging-image-1658749914901-223"
                className={styles["notification-user-image"]}
                alt="profile"
              />
            </div>
            <div className={styles["notification-user-info"]}>
              <div className={styles["notification-user-message"]}>
                Admin has sent you a message.
              </div>
              <div className={styles["notification-user-time"]}>2:30 PM</div>
            </div>
          </div>{" "}
          <div className={styles["notification-user-data"]}>
            <div className={styles["notification-image-container"]}>
              <img
                src="https://sneakers-app.s3.amazonaws.com/staging/images/small/staging-image-1658749914901-223"
                className={styles["notification-user-image"]}
                alt="profile"
              />
            </div>
            <div className={styles["notification-user-info"]}>
              <div className={styles["notification-user-message"]}>
                Admin has sent you a message.
              </div>
              <div className={styles["notification-user-time"]}>2:30 PM</div>
            </div>
          </div>{" "}
          <div className={styles["notification-user-data"]}>
            <div className={styles["notification-image-container"]}>
              <img
                src="https://sneakers-app.s3.amazonaws.com/staging/images/small/staging-image-1658749914901-223"
                className={styles["notification-user-image"]}
                alt="profile"
              />
            </div>
            <div className={styles["notification-user-info"]}>
              <div className={styles["notification-user-message"]}>
                Admin has sent you a message.
              </div>
              <div className={styles["notification-user-time"]}>2:30 PM</div>
            </div>
          </div>{" "}
          <div className={styles["notification-user-data"]}>
            <div className={styles["notification-image-container"]}>
              <img
                src="https://sneakers-app.s3.amazonaws.com/staging/images/small/staging-image-1658749914901-223"
                className={styles["notification-user-image"]}
                alt="profile"
              />
            </div>
            <div className={styles["notification-user-info"]}>
              <div className={styles["notification-user-message"]}>
                Admin has sent you a message.
              </div>
              <div className={styles["notification-user-time"]}>2:30 PM</div>
            </div>
          </div>{" "}
          <div className={styles["notification-user-data"]}>
            <div className={styles["notification-image-container"]}>
              <img
                src="https://sneakers-app.s3.amazonaws.com/staging/images/small/staging-image-1658749914901-223"
                className={styles["notification-user-image"]}
                alt="profile"
              />
            </div>
            <div className={styles["notification-user-info"]}>
              <div className={styles["notification-user-message"]}>
                Admin has sent you a message.
              </div>
              <div className={styles["notification-user-time"]}>2:30 PM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
