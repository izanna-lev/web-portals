import { ICON } from "../../../assets/index";
import styles from "./index.module.scss";

function NoChatActive() {
  return (
    <div className={styles["no-active-chat"]}>
      <div className={styles["img-wrapper"]}>
        <img
          src={ICON.NO_ACTIVE_CHATS}
          alt="No Chat active"
          className={styles["image"]}
        />
      </div>
      <div className={styles["text-wrapper"]}>
        <p className={styles["text"]}>Select any chat from left pane...</p>
      </div>
    </div>
  );
}

export default NoChatActive;
