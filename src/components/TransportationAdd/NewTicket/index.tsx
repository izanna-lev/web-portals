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
  const inputId = `new${length}`;
  const divId = `new-bg-img-${length}`;
  const imgDiv = document.getElementById(divId);

  const handleImageChange = async (file: any, id: string) => {
    if (file[0]) {
      setBackground(URL.createObjectURL(file[0]), id);
      const response = await dispatch(UploadImage(undefined, file[0]));
      saveData({ length, image: response.data, type: "new" });
    }
  };

  const handleNameChange = (name: string) =>
    saveData({ length, name, type: "new" });

  return (
    <div
      className={styles["form-left-details"]}
      key={length}
      id={`oldticket${length}`}
    >
      <div className="form-heading">Upload Ticket Image</div>
      <div style={{ display: "flex" }}>
        <div className={styles["form-image"]} id={divId}>
          <input
            type="file"
            id={inputId}
            accept="image/*"
            name={`newTicket${length}`}
            onChange={(e) => handleImageChange(e.target.files, divId)}
            hidden
          />
          <label
            htmlFor={inputId}
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
            if (imgDiv) setimageUrl(imgDiv.style.backgroundImage.slice(5, -2));
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
