import React from "react";
import { IoCloseOutline, IoCloudUploadOutline } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";
import { UploadImage } from "../../../api/uploadImage";
import { setBackground } from "../../../util";
import InputForm from "../../InputTypes/InputForm";
import styles from "./index.module.scss";

export const NewTicket = (
  length: number,
  saveData: Function,
  setshowImage: React.Dispatch<React.SetStateAction<boolean>>,
  setimageUrl: React.Dispatch<React.SetStateAction<string>>,
  dispatch: any,
  removeUserTicket: Function
) => {
  let newImageUrl = "";

  const handleImageChange = async (file: any, id: string) => {
    if (file[0]) {
      newImageUrl = URL.createObjectURL(file[0]);
      setBackground(newImageUrl, id);
      const response = await dispatch(UploadImage(undefined, file[0]));
      saveData({ length, image: response.data, type: "new" });
    }
  };

  const handleNameChange = (name: string) => {
    saveData({ length, name, type: "new" });
  };

  return (
    <div
      className={styles["form-left-details"]}
      key={length}
      id={`oldticket${length}`}
    >
      <div className="form-heading">Upload Ticket Image</div>
      <div style={{ display: "flex" }}>
        <div className={styles["form-image"]} id={`new-bg-img-${length}`}>
          <input
            type="file"
            id={`new${length}`}
            accept="image/*"
            name={`newTicket${length}`}
            onChange={(e) => {
              handleImageChange(e.target.files, `new-bg-img-${length}`);
            }}
            hidden
          />
          <label
            htmlFor={`new${length}`}
            className={styles["not-selected-preview"]}
            id={`Ticket${length}`}
          >
            <IoCloudUploadOutline
              className={styles["activity-image-placeholder"]}
            />
          </label>
        </div>

        <div
          className={styles["activity-image-popup"]}
          onClick={() => {
            setshowImage(true);
            setimageUrl(newImageUrl);
          }}
        >
          <MdZoomOutMap />
          &nbsp;View Image
        </div>
      </div>
      <InputForm
        inputFields={{
          placeholder: "Steven Johns",
          name: `User ${length + 1} Name`,
          id: `user${length}`,
          maxlength: 50,
          type: "text",
          onChange: handleNameChange,
        }}
      />
      <IoCloseOutline
        className={styles["cross"]}
        onClick={() => removeUserTicket(null, length, "old")}
      />
    </div>
  );
};
