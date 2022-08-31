import { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";

import styles from "./index.module.scss";

interface props {
  imageUrl: string;
  closePopup: Function;
}

const ImagePopup = (props: props) => {
  const { imageUrl, closePopup } = props;

  return (
    <div className={styles["image-popup-container"]}>
      <div className={styles["image-popup"]}>
        <IoCloseOutline
          className={styles["cross"]}
          onClick={() => closePopup()}
        />
        <br />
        <img
          className={styles["popup-background"]}
          src={imageUrl}
          alt="Ticket"
          id="bg-img"
        ></img>
      </div>
    </div>
  );
};

export default ImagePopup;
