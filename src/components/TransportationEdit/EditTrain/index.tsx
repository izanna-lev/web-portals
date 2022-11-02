import { usePlacesWidget } from "react-google-autocomplete";
import React, { useState, useEffect, useRef } from "react";
import ImagePopup from "../../sub-components/ImagePopup";
import InputForm from "../../InputTypes/InputForm";
import TextArea from "../../InputTypes/TextArea";
import { IoCloseOutline } from "react-icons/io5";
import Dropdown from "../../InputTypes/Dropdown";
import styles from "./index.module.scss";
import { Modal } from "../../Portal";
import {
  API,
  FLIGHT_CLASS,
  GOOGLE_API,
  TRANSPORTATION_TYPE,
} from "../../../constants";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { NewTicket } from "../../TransportationAdd/NewTicket";
import { OldTicket } from "../OldTicket";
import { Create } from "../../../api/Create";
import dayjs from "dayjs";

interface props {
  handleEditPopup: React.Dispatch<React.SetStateAction<any>>;
  data: any;
}

const EditTrain = (props: props) => {
  const [deleteUserDetails, setdeleteUserDetails] = useState<any>([]);
  const [newTicketsData, setNewTicketsData] = useState<any>([]);
  const [oldTicketsData, setOldTicketsData] = useState<any>([]);

  const [showImage, setshowImage] = useState(false);
  const [imageUrl, setimageUrl] = useState("");

  const [arrival, setArrival] = useState({ type: "" });
  const [depart, setDepart] = useState({ type: "" });

  const dispatch = useAppDispatch();

  const { handleEditPopup, data } = props;

  const { _id } = useAppSelector((state) => state.itinerary.itineraryDetails);

  const dayRef = useRef();
  const trainClassRef = useRef();
  const arrivalDateRef = useRef();
  const departTimeRef = useRef();
  const arrivalTimeRef = useRef();
  const specialistNoteRef = useRef();

  useEffect(() => {
    if (data) {
      const oldTickets = data.tickets.map((ticket: any) => {
        return { name: ticket.name, image: ticket.image };
      });
      setOldTicketsData([...oldTickets]);
    }
  }, [data]);

  const DepartLocation = usePlacesWidget({
    apiKey: GOOGLE_API,
    onPlaceSelected: (place) => checkPlace("depart", place),
  });

  const ArrivalLocation = usePlacesWidget({
    apiKey: GOOGLE_API,
    onPlaceSelected: (place) => checkPlace("arrival", place),
  });

  const checkPlace = (type: string, place: any) => {
    const {
      formatted_address,

      geometry: {
        location: { lat, lng },
      },
    } = place;

    const newLocationObj = {
      location: formatted_address,
      type: "Point",
      coordinates: [Math.abs(lng()), Math.abs(lat())],
    };
    if (type === "depart") setDepart(newLocationObj);
    else setArrival(newLocationObj);
  };

  const modifyTicket = (id: string) => {
    if (id) {
      if (!deleteUserDetails.includes(id))
        setdeleteUserDetails((prev: any) => [...prev, id]);
    }
  };

  const removeUserTicket = (id: string, index: number, type = "") => {
    modifyTicket(id);

    const elementToRemove = document.getElementById(
      `${type}ticket${index}`
    ) as HTMLElement;

    if (elementToRemove) elementToRemove.remove();

    if (type === "old") {
      const filteredTickets = oldTicketsData.filter(
        (ticket: any, idx: number) => idx !== index
      );

      setOldTicketsData(filteredTickets);
    } else {
      const filteredTickets = newTicketsData.filter(
        (ticket: any, idx: number) => idx !== index
      );

      setNewTicketsData(filteredTickets);
    }
  };

  const saveUserTicketsData = ({
    length,
    image,
    name,
    type,
  }: {
    length: number;
    image: string;
    name: string;
    type: string;
  }) => {
    let Obj: any;

    if (type === "new") {
      Obj = [...newTicketsData];
      if (name) Obj[length - oldTicketsData.length].name = name;
      else Obj[length - oldTicketsData.length].image = image;
      setNewTicketsData(Obj);
    } else {
      Obj = [...oldTicketsData];
      if (name) Obj[length].name = name;
      else Obj[length].image = image;
      Obj[length].modified = true;

      setOldTicketsData(Obj);
    }
  };

  const addMoreTickets = () => {
    const addNewTicketInArr = [...newTicketsData];
    addNewTicketInArr.push({ name: "", image: "" });
    setNewTicketsData(addNewTicketInArr);
  };

  const handleImagePopup = () => setshowImage(false);

  const saveTrainDetails = (e: any) => {
    e.preventDefault();
    const getInputValue = (ref: any) => ref.current.value;

    const ticketsEdited = oldTicketsData.filter(
      (ticket: any) => ticket.modified
    );
    let payload: any;

    payload = {
      day: getInputValue(dayRef),
      trainClass: getInputValue(trainClassRef),
      specialistNote: getInputValue(specialistNoteRef),
      userDetails: [...newTicketsData, ...ticketsEdited],
      departDateTime: new Date(
        `${getInputValue(arrivalDateRef)}T${getInputValue(departTimeRef)}`
      ).toISOString(),
      arrivalDateTime: new Date(
        `${getInputValue(arrivalDateRef)}T${getInputValue(arrivalTimeRef)}`
      ).toISOString(),
      deleteUserDetails,
      transportationRef: data._id,
      transportationType: TRANSPORTATION_TYPE.TRAIN,
    };

    if (depart.type) {
      payload = { ...payload, depart };
    }

    if (arrival.type) {
      payload = { ...payload, arrival };
    }

    dispatch(
      Create(API.EDIT_TRAIN, payload, false, "", API.TRANSPORTATION_DATA, {
        itineraryRef: _id,
        transportationType: TRANSPORTATION_TYPE.TRAIN,
      })
    );

    handleEditPopup(false);
  };

  return (
    <div className={styles["add-itinerary-data-form"]}>
      <div className={styles["form-background"]}>
        <form className="form-block" onSubmit={(e) => saveTrainDetails(e)}>
          <div
            className={`${styles["form-heading"]} ${styles["bold"]} feild-heading`}
          >
            Basic Details
          </div>
          <div className={styles["form-required-feilds"]}>
            <div className={styles["form-left-details"]}>
              <InputForm
                inputFields={{
                  default: data.day,
                  ref: dayRef,
                  name: "Day",
                  id: "day",
                  maxlength: 30,
                  type: "number",
                }}
              />

              <Dropdown
                name="Train Class"
                inputFields={FLIGHT_CLASS}
                refe={trainClassRef}
                checkedVal={data.trainClass}
              />

              <InputForm
                inputFields={{
                  default: data.arrival,
                  ref: ArrivalLocation.ref,
                  name: "Arrival Station",
                  id: "arrival",
                  maxlength: 70,
                  type: "text",
                }}
              />

              <InputForm
                inputFields={{
                  default: data.arrivalDateTime
                    ? dayjs(new Date(data.arrivalDateTime).toISOString())
                        .format()
                        .slice(0, 10)
                    : "",
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
                  default: data.arrivalDateTime
                    ? dayjs(new Date(data.arrivalDateTime).toISOString())
                        .format()
                        .slice(11, 16)
                    : "",
                  ref: arrivalTimeRef,
                  name: "Arrival Time",
                  id: "time",
                  maxlength: 30,
                  type: "time",
                }}
              />

              <InputForm
                inputFields={{
                  default: data.depart,
                  ref: DepartLocation.ref,
                  name: "Depart Station",
                  id: "depart",
                  maxlength: 360,
                  type: "text",
                }}
              />
              <InputForm
                inputFields={{
                  default: data.departDateTime
                    ? dayjs(new Date(data.departDateTime).toISOString())
                        .format()
                        .slice(11, 16)
                    : "",
                  ref: departTimeRef,
                  name: "Depart Time",
                  id: "time",
                  maxlength: 30,
                  type: "time",
                }}
              />

              <TextArea
                inputFields={{
                  default: data.specialistNote,
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
            User Train Details
          </div>
          <div className={styles["form-required-feilds"]}>
            {data.tickets.map((element: any, index: number) =>
              OldTicket(
                index,
                saveUserTicketsData,
                setshowImage,
                setimageUrl,
                dispatch,
                useEffect,
                element,
                useRef,
                removeUserTicket,
                modifyTicket
              )
            )}
            {newTicketsData.map((element: any, index: number) =>
              NewTicket(
                oldTicketsData.length + index,
                saveUserTicketsData,
                setshowImage,
                setimageUrl,
                dispatch,
                removeUserTicket
              )
            )}
          </div>
          <div
            className={`${styles["add-more"]} ${styles["form-heading"]}`}
            onClick={addMoreTickets}
          >
            + Add More Users
          </div>

          <div className={styles["button-save"]}>
            <button className={`continue-button no-border`} type="submit">
              Save
            </button>
          </div>
        </form>

        <IoCloseOutline
          className={styles["cross"]}
          onClick={() => handleEditPopup(false)}
        />
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

export default EditTrain;
