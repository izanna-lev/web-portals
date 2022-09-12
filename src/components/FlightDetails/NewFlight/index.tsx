import { IoCloudUploadOutline, IoCloseOutline } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";
import InputForm from "../../InputForm/index";
import TextArea from "../../TextArea/index";
import styles from "./index.module.scss";
import { Modal } from "../../../components/Portal";
import ImagePopup from "../../../components/ImagePopup";
import React, { useState, useEffect, useRef } from "react";
import Dropdown from "../../Dropdown";
import { FLIGHT_CLASS } from "../../../constants";
import { useAppSelector } from "../../../store/hooks";

interface props {
  cancelAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Tickets {
  name: string;
  image: any;
}

const UserTicket = (
  length: number,
  saveData: Function,
  setshowImage: React.Dispatch<React.SetStateAction<boolean>>,
  setimageUrl: React.Dispatch<React.SetStateAction<string>>
) => {
  let newImageUrl = "";

  const handleImageChange = (file: any) => {
    if (file[0]) {
      saveData({ length, image: file[0] });
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

  const handleNameChange = (name: string) => {
    saveData({ length, name });
  };

  return (
    <React.Fragment>
      <div className={`${styles["form-heading"]}`}>Upload Ticket Image</div>
      <div style={{ display: "flex" }}>
        <div className={styles["form-image"]} id={`bg-img-${length}`}>
          <input
            type="file"
            id={`${length}`}
            accept="image/*"
            name={`Ticket${length}`}
            onChange={(e) => handleImageChange(e.target.files)}
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
          name: `User ${length + 1} Name`,
          id: `user${length}`,
          maxlength: 50,
          type: "text",
          onChange: handleNameChange,
        }}
      />
    </React.Fragment>
  );
};

const NewTransportationForm = (props: props) => {
  const [allUserTickets, setAllUserTickets] = useState<JSX.Element[]>([]);
  const [ticketsData, setTicketsData] = useState([{ name: "", image: null }]);
  const [showImage, setshowImage] = useState(false);
  const [imageUrl, setimageUrl] = useState("");

  const { _id } = useAppSelector(
    (state) => state.itineraryData.itineraryDetails
  );

  const dayRef = useRef();
  const airlineRef = useRef();
  const flightClassRef = useRef();
  const departRef = useRef();
  const departDateRef = useRef();
  const departTimeRef = useRef();
  const arrivalRef = useRef();
  const arrivalTimeRef = useRef();
  const specialistNoteRef = useRef();

  const saveUserTicketsData = ({
    length,
    image,
    name,
  }: {
    length: number;
    image: any;
    name: string;
  }) => {
    const newObj = [...ticketsData];

    if (name) newObj[length].name = name;
    else newObj[length].image = image;
    setTicketsData(newObj);
  };

  useEffect(() => {
    setAllUserTickets([
      UserTicket(0, saveUserTicketsData, setshowImage, setimageUrl),
    ]);
  }, []);

  const addMoreTickets = () => {
    setAllUserTickets((previous) => [
      ...previous,
      UserTicket(
        allUserTickets.length,
        saveUserTicketsData,
        setshowImage,
        setimageUrl
      ),
    ]);

    ticketsData.push({ name: "", image: null });
  };

  const closePopup = () => {
    setshowImage(false);
  };

  const { cancelAdd } = props;

  const saveFlightDetails = (e: any) => {
    e.preventDefault();
    const getInputValue = (ref: any) => ref.current.value;
    const data = {
      day: getInputValue(dayRef),
      flightClass: getInputValue(flightClassRef),
      departTime: getInputValue(departTimeRef),
      departDate: getInputValue(departDateRef),
      airline: getInputValue(airlineRef),
      depart: getInputValue(departRef),
      arrival: getInputValue(arrivalRef),
      arrivalTime: getInputValue(arrivalTimeRef),
      specialistNote: getInputValue(specialistNoteRef),
      userDetails: ticketsData,
      itineraryRef: _id,
    };

    console.log(data);
  };

  return (
    <div className={styles["add-itinerary-data-form"]}>
      <div className={styles["form-background"]}>
        <form
          className={styles["form-block"]}
          onSubmit={(e) => saveFlightDetails(e)}
        >
          <div className={`${styles["form-heading"]} ${styles["bold"]}`}>
            Basic Details
          </div>
          <div className={styles["form-required-feilds"]}>
            <div className={styles["form-left-details"]}>
              <InputForm
                inputFields={{
                  ref: dayRef,
                  name: "Day",
                  id: "day",
                  maxlength: 30,
                  type: "number",
                }}
              />
              <InputForm
                inputFields={{
                  ref: airlineRef,
                  name: "Airline",
                  id: "airline",
                  maxlength: 70,
                  type: "text",
                }}
              />

              <Dropdown
                name="Flight Class"
                inputFields={FLIGHT_CLASS}
                refe={flightClassRef}
              />
              <InputForm
                inputFields={{
                  ref: departRef,
                  name: "Depart",
                  id: "depart",
                  maxlength: 360,
                  type: "text",
                }}
              />

              <InputForm
                inputFields={{
                  ref: departDateRef,
                  name: "Depart Date",
                  id: "date",
                  maxlength: 30,
                  type: "date",
                }}
              />
            </div>
            <div className={styles["form-left-details"]}>
              <InputForm
                inputFields={{
                  ref: departTimeRef,
                  name: "Depart Time",
                  id: "time",
                  maxlength: 30,
                  type: "time",
                }}
              />
              <InputForm
                inputFields={{
                  ref: arrivalRef,
                  name: "Arrival",
                  id: "arrival",
                  maxlength: 70,
                  type: "text",
                }}
              />
              <InputForm
                inputFields={{
                  ref: arrivalTimeRef,
                  name: "Arrival Time",
                  id: "time",
                  maxlength: 30,
                  type: "time",
                }}
              />
              <TextArea
                inputFields={{
                  ref: specialistNoteRef,
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
            {allUserTickets.map((element, index) => (
              <div className={styles["form-left-details"]} key={index}>
                {element}
              </div>
            ))}
          </div>
          <div
            className={`${styles["add-more"]} ${styles["form-heading"]}`}
            onClick={addMoreTickets}
          >
            + Add More Users
          </div>

          <div className={styles["button-save"]}>
            <button className={styles["form-button-text"]} type="submit">
              Save
            </button>
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
