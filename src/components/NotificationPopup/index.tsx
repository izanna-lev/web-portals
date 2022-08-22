import styles from "./index.module.scss";
import { IoCloudUploadOutline, IoCloseOutline } from "react-icons/io5";
import InputForm from "../InputForm/index";
import TextArea from "../TextArea/index";

type InputProps = {
  inputFeilds: {
    name: string
    maxlength: number
    type: string
    id: string
    max?: number
  }
}

const Form = () => {
  return (
    <div className={styles["add-itinerary-data-form"]}>
      <div className={`${styles.box} ${styles.arrow}`}>
        <div className={styles["notification-heading"]}>Notifications</div>
        <div className={styles["list-container"]}>
          <div className={styles["notification-user-data"]}>
            <div className={styles["notification-image-container"]}>
              <img src="https://sneakers-app.s3.amazonaws.com/staging/images/small/staging-image-1658749914901-223" className={styles["notification-user-image"]} alt="profile" />
            </div>
            <div className={styles["notification-user-info"]}>
              <div className={styles["notification-user-message"]}>Admin has sent you a message.</div>
              <div className={styles["notification-user-time"]}>2:30 PM</div>
            </div>
          </div>


          <div className={styles["notification-user-data"]}>
            <div className={styles["notification-image-container"]}>
              <img src="https://sneakers-app.s3.amazonaws.com/staging/images/small/staging-image-1658749914901-223" className={styles["notification-user-image"]} alt="profile" />
            </div>
            <div className={styles["notification-user-info"]}>
              <div className={styles["notification-user-message"]}>Admin has sent you a message.</div>
              <div className={styles["notification-user-time"]}>2:30 PM</div>
            </div>
          </div>          <div className={styles["notification-user-data"]}>
            <div className={styles["notification-image-container"]}>
              <img src="https://sneakers-app.s3.amazonaws.com/staging/images/small/staging-image-1658749914901-223" className={styles["notification-user-image"]} alt="profile" />
            </div>
            <div className={styles["notification-user-info"]}>
              <div className={styles["notification-user-message"]}>Admin has sent you a message.</div>
              <div className={styles["notification-user-time"]}>2:30 PM</div>
            </div>
          </div>          <div className={styles["notification-user-data"]}>
            <div className={styles["notification-image-container"]}>
              <img src="https://sneakers-app.s3.amazonaws.com/staging/images/small/staging-image-1658749914901-223" className={styles["notification-user-image"]} alt="profile" />
            </div>
            <div className={styles["notification-user-info"]}>
              <div className={styles["notification-user-message"]}>Admin has sent you a message.</div>
              <div className={styles["notification-user-time"]}>2:30 PM</div>
            </div>
          </div>          <div className={styles["notification-user-data"]}>
            <div className={styles["notification-image-container"]}>
              <img src="https://sneakers-app.s3.amazonaws.com/staging/images/small/staging-image-1658749914901-223" className={styles["notification-user-image"]} alt="profile" />
            </div>
            <div className={styles["notification-user-info"]}>
              <div className={styles["notification-user-message"]}>Admin has sent you a message.</div>
              <div className={styles["notification-user-time"]}>2:30 PM</div>
            </div>
          </div>          <div className={styles["notification-user-data"]}>
            <div className={styles["notification-image-container"]}>
              <img src="https://sneakers-app.s3.amazonaws.com/staging/images/small/staging-image-1658749914901-223" className={styles["notification-user-image"]} alt="profile" />
            </div>
            <div className={styles["notification-user-info"]}>
              <div className={styles["notification-user-message"]}>Admin has sent you a message.</div>
              <div className={styles["notification-user-time"]}>2:30 PM</div>
            </div>
          </div>          <div className={styles["notification-user-data"]}>
            <div className={styles["notification-image-container"]}>
              <img src="https://sneakers-app.s3.amazonaws.com/staging/images/small/staging-image-1658749914901-223" className={styles["notification-user-image"]} alt="profile" />
            </div>
            <div className={styles["notification-user-info"]}>
              <div className={styles["notification-user-message"]}>Admin has sent you a message.</div>
              <div className={styles["notification-user-time"]}>2:30 PM</div>
            </div>
          </div>          <div className={styles["notification-user-data"]}>
            <div className={styles["notification-image-container"]}>
              <img src="https://sneakers-app.s3.amazonaws.com/staging/images/small/staging-image-1658749914901-223" className={styles["notification-user-image"]} alt="profile" />
            </div>
            <div className={styles["notification-user-info"]}>
              <div className={styles["notification-user-message"]}>Admin has sent you a message.</div>
              <div className={styles["notification-user-time"]}>2:30 PM</div>
            </div>
          </div>          <div className={styles["notification-user-data"]}>
            <div className={styles["notification-image-container"]}>
              <img src="https://sneakers-app.s3.amazonaws.com/staging/images/small/staging-image-1658749914901-223" className={styles["notification-user-image"]} alt="profile" />
            </div>
            <div className={styles["notification-user-info"]}>
              <div className={styles["notification-user-message"]}>Admin has sent you a message.</div>
              <div className={styles["notification-user-time"]}>2:30 PM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
