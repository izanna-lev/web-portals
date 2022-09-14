import { IoCloudUploadOutline, IoCloseOutline } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";
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
import { UploadImage } from "../../../api/uploadImage";
import { setBackground } from "../../../util";
import { Create } from "../../../api/Create";

interface props {
  closePopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserTicket = (
  length: number,
  saveData: Function,
  setshowImage: React.Dispatch<React.SetStateAction<boolean>>,
  setimageUrl: React.Dispatch<React.SetStateAction<string>>,
  dispatch: any
) => {
  let newImageUrl = "";

  const handleImageChange = async (file: any) => {
    if (file[0]) {
      newImageUrl = URL.createObjectURL(file[0]);
      setBackground(newImageUrl, `bg-img-${length}`);
      const response = await dispatch(UploadImage(undefined, file[0]));
      saveData({ length, image: response.data });
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
          placeholder: "Steven Johns",
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
  const [ticketsData, setTicketsData] = useState([{ name: "", image: "" }]);
  const [showImage, setshowImage] = useState(false);
  const [imageUrl, setimageUrl] = useState("");
  const [arrival, setArrival] = useState({});
  const [depart, setDepart] = useState({});

  const dispatch = useAppDispatch();
  const { _id } = useAppSelector(
    (state) => state.itineraryData.itineraryDetails
  );

  const dayRef = useRef();
  const trainClassRef = useRef();
  const arrivalDateRef = useRef();
  const departTimeRef = useRef();
  const arrivalTimeRef = useRef();
  const specialistNoteRef = useRef();

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
      // address_components,
      geometry: {
        location: { lat, lng },
      },
    } = place;

    const newLocationObj = {
      // location: `${address_components[0].long_name}, ${address_components[3].long_name}`,
      location: formatted_address,
      type: "Point",
      coordinates: [lat(), lng()],
    };
    if (type === "depart") setDepart(newLocationObj);
    else setArrival(newLocationObj);
  };

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

  useEffect(() => {
    setAllUserTickets([
      UserTicket(0, saveUserTicketsData, setshowImage, setimageUrl, dispatch),
    ]);
  }, [dispatch]);

  const addMoreTickets = () => {
    setAllUserTickets((previous) => [
      ...previous,
      UserTicket(
        allUserTickets.length,
        saveUserTicketsData,
        setshowImage,
        setimageUrl,
        dispatch
      ),
    ]);

    ticketsData.push({ name: "", image: "" });
  };

  const closeImagePopup = () => setshowImage(false);

  const { closePopup } = props;

  const saveTrainDetails = (e: any) => {
    e.preventDefault();
    const getInputValue = (ref: any) => ref.current.value;
    const data = {
      day: getInputValue(dayRef),
      trainClass: getInputValue(trainClassRef),
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
      transportationType: TRANSPORTATION_TYPE.TRAIN,
    };

    dispatch(
      Create(API.ADD_TRAIN, data, false, "", API.TRANSPORTATION_DATA, {
        itineraryRef: _id,
        transportationType: TRANSPORTATION_TYPE.TRAIN,
      })
    );

    closePopup(false);
  };

  return (
    <div className={styles["add-itinerary-data-form"]}>
      <div className={styles["form-background"]}>
        <form
          className={styles["form-block"]}
          onSubmit={(e) => saveTrainDetails(e)}
        >
          <div className={`${styles["form-heading"]} ${styles["bold"]}`}>
            Basic Details
          </div>
          <div className={styles["form-required-feilds"]}>
            <div className={styles["form-left-details"]}>
              <InputForm
                inputFields={{
                  placeholder: "1",
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
              />

              <InputForm
                inputFields={{
                  placeholder: "Canada",
                  ref: ArrivalLocation.ref,
                  name: "Arrival Station",
                  id: "arrival",
                  maxlength: 70,
                  type: "text",
                }}
              />

              <InputForm
                inputFields={{
                  placeholder: "",
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
                  placeholder: "",
                  ref: arrivalTimeRef,
                  name: "Arrival Time",
                  id: "time",
                  maxlength: 30,
                  type: "time",
                }}
              />

              <InputForm
                inputFields={{
                  placeholder: "Phillippines",
                  ref: DepartLocation.ref,
                  name: "Depart Station",
                  id: "depart",
                  maxlength: 360,
                  type: "text",
                }}
              />
              <InputForm
                inputFields={{
                  placeholder: "",
                  ref: departTimeRef,
                  name: "Depart Time",
                  id: "time",
                  maxlength: 30,
                  type: "time",
                }}
              />

              <TextArea
                inputFields={{
                  placeholder: "Lorem Ipsum",
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
            User Train Details
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
          onClick={() => closePopup(false)}
        />
      </div>
      {showImage && imageUrl ? (
        <Modal
          modal={
            <ImagePopup imageUrl={imageUrl} closeImagePopup={closeImagePopup} />
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

// className={styles[{` ${activityChangedData?.[index]?.image ? "" : "not-selected-preview"}`}
