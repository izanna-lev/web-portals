import { API, FERRY_CLASS, TRANSPORTATION_TYPE } from "../../../constants";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import GooglePlacesInput from "../../InputTypes/GooglePlacesInput";
import React, { useState, useRef, useEffect } from "react";
import ImagePopup from "../../sub-components/ImagePopup";
import InputForm from "../../InputTypes/InputForm/index";
import TextArea from "../../InputTypes/TextArea/index";
import Dropdown from "../../InputTypes/Dropdown";
import { IoCloseOutline } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { Create } from "../../../api/Create";
import { NewTicket } from "../NewTicket";
import styles from "./index.module.scss";
import { Modal } from "../../Portal";

interface props {
  handleAddPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewTransportationForm = (props: props) => {
  const [ticketsData, setTicketsData] = useState<any>([
    { name: "", image: "" },
  ]);
  const [showImage, setshowImage] = useState(false);
  const [imageUrl, setimageUrl] = useState("");
  const [arrival, setArrival] = useState({});
  const [depart, setDepart] = useState({});

  const dispatch = useAppDispatch();
  const { _id } = useAppSelector((state) => state.itinerary.itineraryDetails);
  const apiMessage = useAppSelector((state) => state.apiMessage);

  const dayRef = useRef();
  const ferryClassRef = useRef();
  const arrivalDateRef = useRef();
  const departTimeRef = useRef();
  const arrivalTimeRef = useRef();
  const specialistNoteRef = useRef();

  const saveUserTicketsData = ({
    length,
    image,
    name,
  }: {
    length: number;
    image: string;
    name: string;
  }) => {
    const newObj = [...ticketsData];

    if (name) newObj[length].name = name;
    else newObj[length].image = image;
    setTicketsData(newObj);
  };

  const removeUserTicket = (id: string, index: number) => {
    const elementToRemove = document.getElementById(
      `ticket${index}`
    ) as HTMLElement;
    if (elementToRemove) elementToRemove.remove();
    const filteredTickets = ticketsData.filter(
      (ticket: any, idx: number) => idx !== index
    );

    setTicketsData(filteredTickets);
  };

  const addMoreTickets = () => {
    const addNewTicketInArr = [...ticketsData];
    addNewTicketInArr.push({ name: "", image: "" });
    setTicketsData(addNewTicketInArr);
  };

  const handleImagePopup = () => setshowImage(false);

  const { handleAddPopup } = props;

  const saveFerryDetails = (e: any) => {
    e.preventDefault();
    const getInputValue = (ref: any) => ref.current.value;
    const data = {
      day: getInputValue(dayRef),
      trainClass: getInputValue(ferryClassRef),
      depart: depart,
      arrival: arrival,
      specialistNote: getInputValue(specialistNoteRef),
      userDetails: ticketsData,
      departDateTime: new Date(
        `${getInputValue(arrivalDateRef)}T${getInputValue(departTimeRef)}`
      ).toISOString(),
      arrivalDateTime: new Date(
        `${getInputValue(arrivalDateRef)}T${getInputValue(arrivalTimeRef)}`
      ).toISOString(),
      itineraryRef: _id,
      transportationType: TRANSPORTATION_TYPE.FERRY,
    };

    // if (!ticketsData[0].image) return alert("Please select an image!");

    dispatch(
      Create(API.ADD_TRAIN, data, false, "", API.TRANSPORTATION_DATA, {
        itineraryRef: _id,
        transportationType: TRANSPORTATION_TYPE.FERRY,
      })
    );
  };

  useEffect(() => {
    if (apiMessage.message === "Ferry Added Successfully!") {
      handleAddPopup(false);
    }
  }, [apiMessage]);

  return (
    <div className={styles["add-itinerary-data-form"]}>
      <div className={styles["form-background"]}>
        <div className="form-cross">
          <IoCloseOutline
            className={styles["cross"]}
            onClick={() => handleAddPopup(false)}
          />
        </div>
        <form className="form-block" onSubmit={(e) => saveFerryDetails(e)}>
          <div
            className={`${styles["form-heading"]} ${styles["bold"]} feild-heading`}
          >
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

              <Dropdown
                name="Ferry Class"
                inputFields={FERRY_CLASS}
                refe={ferryClassRef}
              />

              <GooglePlacesInput
                name="Arrival Station"
                setLocation={setArrival}
              />

              <InputForm
                inputFields={{
                  ref: arrivalDateRef,
                  name: "Arrival Date",
                  id: "date",
                  maxlength: 30,
                  type: "date",
                }}
              />
            </div>
            <div className={styles["form-left-details"]}>
              <InputForm
                inputFields={{
                  ref: arrivalTimeRef,
                  name: "Arrival Time",
                  id: "time",
                  maxlength: 30,
                  type: "time",
                }}
              />

              <GooglePlacesInput
                name="Depart Station"
                setLocation={setDepart}
              />

              <InputForm
                inputFields={{
                  ref: departTimeRef,
                  name: "Depart Time",
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
                  maxlength: 1000,
                  type: "text",
                }}
              />
            </div>
          </div>
          <div
            className={`${styles["form-heading"]} ${styles["bold"]} feild-heading`}
          >
            Traveler Ferry Details
          </div>
          <div className={styles["form-required-feilds"]}>
            {ticketsData.map((element: any, index: number) =>
              NewTicket(
                index,
                saveUserTicketsData,
                setshowImage,
                setimageUrl,
                dispatch,
                removeUserTicket
              )
            )}
          </div>
          <div
            className={`add-more-tickets ${styles["form-heading"]}`}
            onClick={addMoreTickets}
          >
            <AiOutlinePlus />
            &nbsp;Add More Travelers
          </div>

          <div className={styles["button-save"]}>
            <button className={`continue-button no-border`} type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
      {showImage && imageUrl ? (
        <Modal
          modal={
            <ImagePopup
              imageUrl={imageUrl}
              handleImagePopup={handleImagePopup}
            />
          }
          root={document.getElementById("overlay-root") as HTMLElement}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default NewTransportationForm;
