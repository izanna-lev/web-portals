/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import styles from "./index.module.scss";

const Image = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <div className={styles["upload-image"]}>
      <img src={imageUrl} className={styles["image-preview"]} alt="chat" />
    </div>
  );
};

export default Image;
