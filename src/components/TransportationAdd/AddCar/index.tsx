import { IoCloseOutline } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";
import InputForm from "../../InputTypes/InputForm/index";
import TextArea from "../../InputTypes/TextArea/index";
import styles from "./index.module.scss";
import { Modal } from "../../Portal";
import ImagePopup from "../../sub-components/ImagePopup";
import React, { useState, useRef, useEffect } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { API, GOOGLE_API, TRANSPORTATION_TYPE } from "../../../constants";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { UploadImage } from "../../../api/uploadImage";
import { setBackground } from "../../../util";
import { Create } from "../../../api/Create";

interface props {
  handleAddPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserTicket = (
  length: number,
  saveData: Function,
  setshowImage: React.Dispatch<React.SetStateAction<boolean>>,
  setimageUrl: React.Dispatch<React.SetStateAction<string>>,
  dispatch: any
) => {
  const divId = `bg-img-${length}`;
  const imgDiv = document.getElementById(divId);

  const handleImageChange = async (file: any) => {
    if (file[0]) {
      setBackground(URL.createObjectURL(file[0]), divId);
      const response = await dispatch(UploadImage(undefined, file[0]));
      saveData({ carImage: response.data });
    }
  };

  const handleNameChange = (driverName: string) => {
    saveData({ driverName });
  };

  const handleNoOfTravellers = (noOfTravellers: string) => {
    saveData({ noOfTravellers });
  };

  return (
    <React.Fragment>
      <div className={styles["form-left-details"]}>
        <div className={`${styles["form-heading"]}`}>Upload Car Image</div>
        <div style={{ display: "flex" }}>
          <div className={styles["form-image"]}>
            <input
              type="file"
              id={`${length}`}
              accept="image/*"
              name={`Ticket${length}`}
              onChange={(e) => handleImageChange(e.target.files)}
              hidden
            />
            <label htmlFor={`${length}`} id={`Ticket${length}`}>
              <div
                className={styles["activity-image-placeholder"]}
                id={divId}
              ></div>
            </label>
          </div>

          <div
            className={styles["activity-image-popup"]}
            onClick={() => {
              setshowImage(true);
              if (imgDiv)
                setimageUrl(imgDiv.style.backgroundImage.slice(5, -2));
            }}
          >
            <MdZoomOutMap />
            &nbsp;View Image
          </div>
        </div>
        <InputForm
          inputFields={{
            placeholder: "Steven Johns",
            name: `Company Name`,
            id: "drivername",
            maxlength: 50,
            type: "text",
            onChange: handleNameChange,
          }}
        />
      </div>
      <div className={styles["form-left-details"]}>
        <InputForm
          inputFields={{
            placeholder: "3",
            name: `No. of Travelers`,
            id: "usersTravelling",
            maxlength: 4,
            type: "number",
            onChange: handleNoOfTravellers,
          }}
        />
      </div>
    </React.Fragment>
  );
};

const NewTransportationForm = (props: props) => {
  const [ticketsData, setTicketsData] = useState({
    driverName: "",
    carImage: "",
    noOfTravellers: "",
  });
  const [showImage, setshowImage] = useState(false);
  const [imageUrl, setimageUrl] = useState("");
  const [arrival, setArrival] = useState({});
  const [depart, setDepart] = useState({});

  const dispatch = useAppDispatch();
  const { _id } = useAppSelector((state) => state.itinerary.itineraryDetails);

  const apiMessage = useAppSelector((state) => state.apiMessage);

  const dayRef = useRef();
  const pickupTimeRef = useRef();
  const pickupDateRef = useRef();
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

  const saveUserTicketsData = ({
    carImage,
    driverName,
    noOfTravellers,
  }: {
    carImage: string;
    driverName: string;
    noOfTravellers: string;
  }) => {
    const newObj = { ...ticketsData };

    if (driverName) newObj.driverName = driverName;
    else if (noOfTravellers) newObj.noOfTravellers = noOfTravellers;
    else newObj.carImage = carImage;
    setTicketsData(newObj);
  };

  const saveCarDetails = (e: any) => {
    e.preventDefault();

    const getInputValue = (ref: any) => ref.current.value;

    const data = {
      day: getInputValue(dayRef),
      departDateTime: new Date(
        `${getInputValue(pickupDateRef)}T${getInputValue(pickupTimeRef)}`
      ).toISOString(),
      depart,
      arrival,
      specialistNote: getInputValue(specialistNoteRef),
      userCarDetails: ticketsData,
      itineraryRef: _id,
      transportationType: TRANSPORTATION_TYPE.CAR,
    };

    // if (!ticketsData.carImage) return alert("Please select an image!");

    dispatch(
      Create(API.ADD_CAR, data, false, "", API.TRANSPORTATION_DATA, {
        itineraryRef: _id,
        transportationType: TRANSPORTATION_TYPE.CAR,
      })
    );
  };

  useEffect(() => {
    if (apiMessage.message === "Car Added Successfully!") {
      handleAddPopup(false);
    }
  }, [apiMessage]);

  const handleImagePopup = () => setshowImage(false);

  const { handleAddPopup } = props;

  return (
    <div className={styles["add-itinerary-data-form"]}>
      <div className={styles["form-background"]}>
        <div className="form-cross">
          <IoCloseOutline
            className={styles["cross"]}
            onClick={() => handleAddPopup(false)}
          />
        </div>
        <form className="form-block" onSubmit={(e) => saveCarDetails(e)}>
          <div
            className={`${styles["form-heading"]} ${styles["bold"]} feild-heading`}
          >
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
              <InputForm
                inputFields={{
                  placeholder: "Canada",
                  ref: DepartLocation.ref,
                  name: "Pickup Location",
                  id: "pickupLocation",
                  maxlength: 70,
                  type: "text",
                }}
              />

              <InputForm
                inputFields={{
                  placeholder: "",
                  ref: pickupDateRef,
                  name: "Pickup Date",
                  id: "date",
                  maxlength: 30,
                  type: "date",
                }}
              />
              <InputForm
                inputFields={{
                  placeholder: "",
                  ref: pickupTimeRef,
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
                  placeholder: "Phillippines",
                  ref: ArrivalLocation.ref,
                  name: "Dropoff Location",
                  id: "dropoffLocation",
                  maxlength: 70,
                  type: "text",
                }}
              />

              <TextArea
                inputFields={{
                  placeholder: "Lorem Ipsum",
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
            Traveler Car Details
          </div>
          <div className={styles["form-required-feilds"]}>
            {UserTicket(
              1,
              saveUserTicketsData,
              setshowImage,
              setimageUrl,
              dispatch
            )}
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

export default NewTransportationForm;
