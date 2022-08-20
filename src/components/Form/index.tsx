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
      <div className={styles["form-background"]}>
        <form className={styles["form-block"]}>

          <div className={styles["form-image"]}>
            <input
              type="file"
              id="activity-upload"
              accept="image/*"
              name="image"
              // onChange={(e) => dataChange(index, e)}
              hidden
            />
            <label
              htmlFor="activity-upload"
              className={styles["not-selected-preview"]}
            // className={styles[{` ${activityChangedData?.[index]?.image ? "" : "not-selected-preview"}`}
            >
              {/* {activityChangedData?.[index]?.image ? (
                    <img
                      src={ URL.createObjectURL(activityChangedData?.[index]?.image)}
                      className={styles["activity-image-preview"
                      alt="Thumb"
                    />
                  ) : (
                    <IoCloudUploadOutline className={styles["activity-image-placeholder" />
                  )} */}
              <IoCloudUploadOutline className={styles["activity-image-placeholder"]} />
            </label>
          </div>

          <div>Upload Image</div>
          <div className={styles["form-required-feilds"]}>
            <div className={styles["form-left-details"]}>
              <InputForm inputFeilds={{ name: "Day", id: "day", maxlength: 30, type: "number" }} />
              <InputForm inputFeilds={{ name: "Name", id: "name", maxlength: 30, type: "text" }} />
              <InputForm inputFeilds={{ name: "Location", id: "location", maxlength: 360, type: "text" }} />
              <InputForm inputFeilds={{ name: "Contact Number", id: "name", maxlength: 15, type: "tel" }} />
              <TextArea inputFeilds={{ name: "Description", id: "description", maxlength: 350, type: "text" }} />
            </div>
            <div className={styles["form-left-details"]}>
              <InputForm inputFeilds={{ name: "Check In Date", id: "date", maxlength: 30, type: "date" }} />
              <InputForm inputFeilds={{ name: "Check In Time", id: "time", maxlength: 30, type: "time" }} />
              <InputForm inputFeilds={{ name: "Check Out Date", id: "date", maxlength: 30, type: "date" }} />
              <InputForm inputFeilds={{ name: "Check Out Time", id: "time", maxlength: 30, type: "time" }} />
            </div>
          </div>

          <div className={styles["button-save"]}>
            <button className={styles["form-button-text"]}>Save</button>
          </div>
        </form>

        <IoCloseOutline className={styles["cross"]} />
      </div>
    </div>
  );
};

export default Form;
