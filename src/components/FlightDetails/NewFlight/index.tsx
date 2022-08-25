import styles from "./index.module.scss";
import { IoCloudUploadOutline, IoCloseOutline } from "react-icons/io5";
import InputForm from "../../InputForm/index";
import TextArea from "../../TextArea/index";
import { CancelPresentationRounded } from "@mui/icons-material";
import { FaLessThanEqual } from "react-icons/fa";
import { useState } from "react";

type InputProps = {
  inputFeilds: {
    name: string;
    maxlength: number;
    type: string;
    id: string;
    max?: number;
  };
};

type props = {
  cancelAdd: React.Dispatch<React.SetStateAction<boolean>>;
  addFlight: Function;
};

const NewFlightForm = (props: props) => {
  const [canAddMore, setAddMore] = useState([
    <>
      <div className={`${styles["form-heading"]}`}>Upload Ticket Image</div>
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
        >
          <IoCloudUploadOutline
            className={styles["activity-image-placeholder"]}
          />
        </label>
      </div>
      <InputForm
        inputFeilds={{
          name: "User 2 Name",
          id: "user 1 name",
          maxlength: 50,
          type: "text",
        }}
      />
    </>,
  ]);

  const addMoreUsers = () => {
    const newUsersList = [...canAddMore];
    newUsersList.push(
      <div className={styles["form-left-details"]}>
        <div className={`${styles["form-heading"]}`}>Upload Ticket Image</div>
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
          >
            <IoCloudUploadOutline
              className={styles["activity-image-placeholder"]}
            />
          </label>
        </div>
        <InputForm
          inputFeilds={{
            name: "User 2 Name",
            id: "user 1 name",
            maxlength: 50,
            type: "text",
          }}
        />
      </div>
    );

    setAddMore(newUsersList);
  };

  const { cancelAdd, addFlight } = props;

  return (
    <div className={styles["add-itinerary-data-form"]}>
      <div className={styles["form-background"]}>
        <form className={styles["form-block"]}>
          <div className={`${styles["form-heading"]} ${styles["bold"]}`}>
            Basic Details
          </div>
          <div className={styles["form-required-feilds"]}>
            <div className={styles["form-left-details"]}>
              <InputForm
                inputFeilds={{
                  name: "Day",
                  id: "day",
                  maxlength: 30,
                  type: "number",
                }}
              />
              <InputForm
                inputFeilds={{
                  name: "Airline",
                  id: "airline",
                  maxlength: 70,
                  type: "text",
                }}
              />
              <InputForm
                inputFeilds={{
                  name: "Flight Class",
                  id: "flight class",
                  maxlength: 360,
                  type: "text",
                }}
              />
              <InputForm
                inputFeilds={{
                  name: "Depart",
                  id: "depart",
                  maxlength: 360,
                  type: "text",
                }}
              />

              <InputForm
                inputFeilds={{
                  name: "Depart Date",
                  id: "date",
                  maxlength: 30,
                  type: "date",
                }}
              />
            </div>
            <div className={styles["form-left-details"]}>
              <InputForm
                inputFeilds={{
                  name: "Depart Time",
                  id: "time",
                  maxlength: 30,
                  type: "time",
                }}
              />
              <InputForm
                inputFeilds={{
                  name: "Arrival",
                  id: "arrival",
                  maxlength: 70,
                  type: "text",
                }}
              />
              <InputForm
                inputFeilds={{
                  name: "Arrival Time",
                  id: "time",
                  maxlength: 30,
                  type: "time",
                }}
              />
              <TextArea
                inputFeilds={{
                  name: "Specialist Note",
                  id: "specialist note",
                  maxlength: 350,
                  type: "text",
                }}
              />
            </div>
          </div>
          <div className={`${styles["form-heading"]} ${styles["bold"]}`}>
            User Flight Details
          </div>
          <div
            className={styles["form-required-feilds"]}
            style={{ maxHeight: "400px", overflow: "auto" }}
          >
            {canAddMore.map((element, index) => (
              <div className={styles["form-left-details"]} key={index}>
                {element}
              </div>
            ))}
          </div>
          <div
            className={`${styles["add-more"]} ${styles["form-heading"]}`}
            onClick={addMoreUsers}
          >
            + Add More Users
          </div>

          <div className={styles["button-save"]}>
            <button className={styles["form-button-text"]}>Save</button>
          </div>
        </form>

        <IoCloseOutline
          className={styles["cross"]}
          onClick={() => cancelAdd(false)}
        />
      </div>
    </div>
  );
};

export default NewFlightForm;

// className={styles[{` ${activityChangedData?.[index]?.image ? "" : "not-selected-preview"}`}

/* {activityChangedData?.[index]?.image ? (
                    <img
                      src={ URL.createObjectURL(activityChangedData?.[index]?.image)}
                      className={styles["activity-image-preview"
                      alt="Thumb"
                    />
                  ) : (
                    <IoCloudUploadOutline className={styles["activity-image-placeholder" />
                  )} */
