import { API, FERRY_CLASS, TRANSPORTATION_TYPE } from "../../../constants";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import GooglePlacesInput from "../../InputTypes/GooglePlacesInput";
import { NewTicket } from "../../TransportationAdd/NewTicket";
import React, { useState, useEffect, useRef } from "react";
import ImagePopup from "../../sub-components/ImagePopup";
import InputForm from "../../InputTypes/InputForm/index";
import TextArea from "../../InputTypes/TextArea/index";
import Dropdown from "../../InputTypes/Dropdown";
import { IoCloseOutline } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { Create } from "../../../api/Create";
import { OldTicket } from "../OldTicket";
import styles from "./index.module.scss";
import { Modal } from "../../Portal";
import dayjs from "dayjs";

interface props {
  handleEditPopup: React.Dispatch<React.SetStateAction<any>>;
  data: any;
}

const EditFerry = (props: props) => {
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
  const apiMessage = useAppSelector((state) => state.apiMessage);

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
      transportationType: TRANSPORTATION_TYPE.FERRY,
    };

    if (depart.type) {
      payload = { ...payload, depart };
    }

    if (arrival.type) {
      payload = { ...payload, arrival };
    }

    dispatch(
      Create(API.EDIT_FERRY, payload, false, "", API.TRANSPORTATION_DATA, {
        itineraryRef: _id,
        transportationType: TRANSPORTATION_TYPE.FERRY,
      })
    );
  };

  useEffect(() => {
    if (apiMessage.message === "Ferry Edited Successfully!") {
      handleEditPopup(false);
    }
  }, [apiMessage]);

  return (
    <div className={styles["add-itinerary-data-form"]}>
      <div className={styles["form-background"]}>
        <div className="form-cross">
          <IoCloseOutline
            className={styles["cross"]}
            onClick={() => handleEditPopup(false)}
          />
        </div>
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
                name="Ferry Class"
                inputFields={FERRY_CLASS}
                refe={trainClassRef}
                checkedVal={data.trainClass}
              />

              <GooglePlacesInput
                name="Arrival Station"
                setLocation={setArrival}
                defaultValue={data.arrival}
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

              <GooglePlacesInput
                name="Depart Station"
                setLocation={setDepart}
                defaultValue={data.depart}
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
            Traveler Ferry Details
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

export default EditFerry;
