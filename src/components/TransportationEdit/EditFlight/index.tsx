import { IoCloseOutline } from "react-icons/io5";
import InputForm from "../../InputTypes/InputForm/index";
import TextArea from "../../InputTypes/TextArea/index";
import styles from "./index.module.scss";
import { Modal } from "../../Portal";
import ImagePopup from "../../sub-components/ImagePopup";
import React, { useState, useEffect, useRef } from "react";
import Dropdown from "../../InputTypes/Dropdown";
import {
  API,
  FLIGHT_CLASS,
  GOOGLE_API,
  TRANSPORTATION_TYPE,
} from "../../../constants";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { usePlacesWidget } from "react-google-autocomplete";
import { Create } from "../../../api/Create";
import { NewTicket } from "../../TransportationAdd/NewTicket";
import { OldTicket } from "../OldTicket";
import dayjs from "dayjs";
import { AiOutlinePlus } from "react-icons/ai";

interface props {
  handleEditPopup: React.Dispatch<React.SetStateAction<any>>;
  data: any;
}

const EditFlight = (props: props) => {
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

  const specialistNoteRef = useRef();
  const flightClassRef = useRef();
  const arrivalTimeRef = useRef();
  const departDateRef = useRef();
  const departTimeRef = useRef();
  const airlineRef = useRef();
  const dayRef = useRef();

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

  const saveFlightDetails = (e: any) => {
    e.preventDefault();
    const getInputValue = (ref: any) => ref.current.value;
    let payload: any;

    const ticketsEdited = oldTicketsData.filter(
      (ticket: any) => ticket.modified
    );

    payload = {
      day: getInputValue(dayRef),
      flightClass: getInputValue(flightClassRef),
      departDateTime: new Date(
        `${getInputValue(departDateRef)}T${getInputValue(departTimeRef)}`
      ).toISOString(),
      airline: getInputValue(airlineRef),
      arrivalDateTime: new Date(
        `${getInputValue(departDateRef)}T${getInputValue(arrivalTimeRef)}`
      ).toISOString(),
      specialistNote: getInputValue(specialistNoteRef),
      userDetails: [...newTicketsData, ...ticketsEdited],
      deleteUserDetails,
      transportationRef: data._id,
    };

    if (depart.type) {
      payload = { ...payload, depart };
    }

    if (arrival.type) {
      payload = { ...payload, arrival };
    }

    dispatch(
      Create(API.EDIT_FLIGHT, payload, false, null, API.TRANSPORTATION_DATA, {
        itineraryRef: _id,
        transportationType: TRANSPORTATION_TYPE.FLIGHT,
      })
    );

    handleEditPopup(false);
  };

  return (
    <div className={styles["add-itinerary-data-form"]}>
      <div className={styles["form-background"]}>
        <div className="form-cross">
          <IoCloseOutline
            className={styles["cross"]}
            onClick={() => handleEditPopup(false)}
          />
        </div>
        <form className="form-block" onSubmit={(e) => saveFlightDetails(e)}>
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
              <InputForm
                inputFields={{
                  default: data.airline,
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
                checkedVal={data.flightClass}
              />
              <InputForm
                inputFields={{
                  default: data.depart,
                  ref: DepartLocation.ref,
                  name: "Depart",
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
                        .slice(0, 10)
                    : "",
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
              <InputForm
                inputFields={{
                  default: data.arrival,
                  ref: ArrivalLocation.ref,
                  name: "Arrival",
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
                        .slice(11, 16)
                    : "",
                  ref: arrivalTimeRef,
                  name: "Arrival Time",
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
            User Flight Details
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
            className={`add-more-tickets ${styles["form-heading"]}`}
            onClick={() => addMoreTickets()}
          >
            <AiOutlinePlus />
            &nbsp;Add More Users
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
      ) : null}
    </div>
  );
};

export default EditFlight;
