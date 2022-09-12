import { IoCloudUploadOutline, IoCloseOutline } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";
import InputForm from "../../InputForm/index";
import TextArea from "../../TextArea/index";
import styles from "./index.module.scss";
import { Modal } from "../../Portal";
import ImagePopup from "../../ImagePopup";
import React, { useState, useEffect } from "react";

interface props {
  cancelAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Tickets {}

const UserTicket = (
  length: number,
  saveData: Function,
  setshowImage: React.Dispatch<React.SetStateAction<boolean>>,
  setimageUrl: React.Dispatch<React.SetStateAction<string>>
) => {
  let newImageUrl = "";
  const handleImageChange = (name: string, file: any) => {
    if (file[0]) {
      saveData({ [name]: file[0] });
      let url = URL.createObjectURL(file[0]);
      newImageUrl = url;
      const imageElement = document.getElementById(`bg-img-${length}`);
      if (imageElement) {
        imageElement.style.background = `url(${url}) no-repeat`;
        imageElement.style.backgroundPosition = "center";
        imageElement.style.backgroundSize = "100%";
      }
    }
  };
  return (
    <React.Fragment>
      <div className={`${styles["form-heading"]}`}>Upload Car Image</div>
      <div style={{ display: "flex" }}>
        <div className={styles["form-image"]} id={`bg-img-${length}`}>
          <input
            type="file"
            id={`${length}`}
            accept="image/*"
            name={`Ticket${length}`}
            onChange={(e) =>
              handleImageChange(`Ticket${e.target.id}`, e.target.files)
            }
            hidden
          />
          <label
            htmlFor={`${length}`}
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
          name: `Name of Driver`,
          id: "drivername",
          maxlength: 50,
          type: "text",
        }}
      />
    </React.Fragment>
  );
};

const NewTransportationForm = (props: props) => {
  const [allUserTickets, setAllUserTickets] = useState<JSX.Element[]>([]);
  const [ticketsData, setTicketsData] = useState<Tickets[]>([]);
  const [showImage, setshowImage] = useState(false);
  const [imageUrl, setimageUrl] = useState("");

  useEffect(() => {
    setAllUserTickets([
      UserTicket(1, saveUserTicketsData, setshowImage, setimageUrl),
    ]);
  }, []);

  const saveUserTicketsData = (data: {}) => {
    setTicketsData((previous) => [...previous, { ...data }]);
  };

  const closePopup = () => {
    setshowImage(false);
  };

  const { cancelAdd } = props;

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
                inputFields={{
                  name: "Day",
                  id: "day",
                  maxlength: 30,
                  type: "number",
                }}
              />
              <InputForm
                inputFields={{
                  name: "Pickup Location",
                  id: "pickupLocation",
                  maxlength: 70,
                  type: "text",
                }}
              />

              <InputForm
                inputFields={{
                  name: "Pickup Date",
                  id: "date",
                  maxlength: 30,
                  type: "date",
                }}
              />
              <InputForm
                inputFields={{
                  name: "Pickup Time",
                  id: "time",
                  maxlength: 30,
                  type: "time",
                }}
              />
            </div>
            <div className={styles["form-left-details"]}>
              <InputForm
                inputFields={{
                  name: "Dropoff Location",
                  id: "dropoffLocation",
                  maxlength: 70,
                  type: "text",
                }}
              />

              <TextArea
                inputFields={{
                  name: "Specialist Note",
                  id: "specialist note",
                  maxlength: 350,
                  type: "text",
                }}
              />
            </div>
          </div>
          <div className={`${styles["form-heading"]} ${styles["bold"]}`}>
            User Car Details
          </div>
          <div
            className={styles["form-required-feilds"]}
            style={{ maxHeight: "400px", overflow: "auto" }}
          >
            {allUserTickets.map((element, index) => (
              <div className={styles["form-left-details"]} key={index}>
                {element}
              </div>
            ))}
            <div className={styles["form-left-details"]}>
              <InputForm
                inputFields={{
                  name: `No of users travelling`,
                  id: "usersTravelling",
                  maxlength: 50,
                  type: "number",
                }}
              />
            </div>
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
      {showImage && imageUrl ? (
        <Modal
          modal={<ImagePopup imageUrl={imageUrl} closePopup={closePopup} />}
          root={document.getElementById("overlay-root") as HTMLElement}
        />
      ) : null}
    </div>
  );
};

export default NewTransportationForm;

// className={styles[{` ${activityChangedData?.[index]?.image ? "" : "not-selected-preview"}`}
