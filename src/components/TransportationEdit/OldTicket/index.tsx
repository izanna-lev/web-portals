import React from "react";
import { IoCloseOutline, IoCloudUploadOutline } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";
import { UploadImage } from "../../../api/uploadImage";
import { IMAGE } from "../../../constants";
import { setBackground } from "../../../util";
import InputForm from "../../InputTypes/InputForm";

import styles from "./index.module.scss";

export const OldTicket = (
  length: number,
  saveData: Function,
  setshowImage: React.Dispatch<React.SetStateAction<boolean>>,
  setimageUrl: React.Dispatch<React.SetStateAction<string>>,
  dispatch: any,
  useEffect: any,
  data: any,
  useRef: any,
  removeUserTicket: Function,
  modifyTicket: Function
) => {
  const newImageRef = useRef();

  const handleChangeBackground = (image: string, id: string) => {
    setBackground(image, id);
  };

  useEffect(() => {
    if (data.image)
      setBackground(`${IMAGE.AVERAGE}${data.image}`, `old-bg-img-${length}`);
  }, [data.image, length]);

  const handleImageChange = async (file: any, id: string) => {
    if (file[0]) {
      modifyTicket(data._id);
      handleChangeBackground(URL.createObjectURL(file[0]), id);
      const response = await dispatch(UploadImage(undefined, file[0]));
      saveData({ length, image: response.data, type: "old" });
    }
  };

  const handleNameChange = (name: string) => {
    modifyTicket(data._id);
    saveData({ length, name, type: "old" });
  };

  return (
    <div className={styles["form-left-details"]} key={length}>
      <div className="form-heading">Upload Ticket Image</div>
      <div style={{ display: "flex" }}>
        <div className={styles["form-image"]}>
          <input
            type="file"
            id={`old${length}`}
            accept="image/*"
            name={`oldTicket${length}`}
            onChange={(e) =>
              handleImageChange(e.target.files, `old-bg-img-${length}`)
            }
            hidden
          />
          <label htmlFor={`old${length}`} id={`Ticket${length}`}>
            <div
              className={styles["activity-image-placeholder"]}
              id={`old-bg-img-${length}`}
              ref={newImageRef}
            ></div>
          </label>
        </div>

        <div
          className={styles["activity-image-popup"]}
          onClick={() => {
            setshowImage(true);
            setimageUrl(newImageRef.current.style.backgroundImage.slice(5, -2));
          }}
        >
          <MdZoomOutMap />
          &nbsp;View Image
        </div>
      </div>
      <InputForm
        inputFields={{
          default: data.name,
          placeholder: "Steven Johns",
          name: `Traveler ${length + 1} Name`,
          id: `user${length}`,
          maxlength: 50,
          type: "text",
          onChange: handleNameChange,
        }}
      />
      <IoCloseOutline
        className={styles["cross"]}
        onClick={() => removeUserTicket(data._id, length, "old")}
      />
    </div>
  );
};
