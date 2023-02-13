import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { API, IMAGE, TRANSPORTATION_TYPE } from "../../../constants";
import React, { useState, useEffect, useRef } from "react";
import ImagePopup from "../../sub-components/ImagePopup";
import InputForm from "../../InputTypes/InputForm/index";
import TextArea from "../../InputTypes/TextArea/index";
import { UploadImage } from "../../../api/uploadImage";
import { IoCloseOutline } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";
import { setBackground } from "../../../util";
import { Create } from "../../../api/Create";
import styles from "./index.module.scss";
import { Modal } from "../../Portal";
import dayjs from "dayjs";
import GooglePlacesInput from "../../InputTypes/GooglePlacesInput";

interface props {
  handleEditPopup: React.Dispatch<React.SetStateAction<any>>;
  data: any;
}

const UserTicket = (
  length: number,
  saveData: Function,
  setshowImage: React.Dispatch<React.SetStateAction<boolean>>,
  setimageUrl: React.Dispatch<React.SetStateAction<string>>,
  dispatch: any,
  data: any,
  useEffect: any
) => {
  const handleChangeBackground = (image: string) => {
    setimageUrl(image);
    setBackground(image, `bg-img-${length}`);
  };

  useEffect(() => {
    data.carImage && handleChangeBackground(`${IMAGE.AVERAGE}${data.carImage}`);
  }, [data.carImage]);

  const handleImageChange = async (file: any) => {
    if (file[0]) {
      handleChangeBackground(URL.createObjectURL(file[0]));
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
                id={`bg-img-${length}`}
              ></div>
            </label>
          </div>

          <div
            className={styles["activity-image-popup"]}
            onClick={() => {
              setshowImage(true);
            }}
          >
            <MdZoomOutMap />
            &nbsp;View Image
          </div>
        </div>
        <InputForm
          inputFields={{
            default: data.driverName,
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
            default: data.noOfTravellers,
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

const EditCar = (props: props) => {
  const [ticketsData, setTicketsData] = useState({
    driverName: "",
    carImage: "",
    noOfTravellers: "",
  });
  const [showImage, setshowImage] = useState(false);
  const [imageUrl, setimageUrl] = useState("");
  const [arrival, setArrival] = useState({ type: "" });
  const [depart, setDepart] = useState({ type: "" });

  const dispatch = useAppDispatch();
  const { _id } = useAppSelector((state) => state.itinerary.itineraryDetails);

  const apiMessage = useAppSelector((state) => state.apiMessage);

  const dayRef = useRef();
  const pickupTimeRef = useRef();
  const pickupDateRef = useRef();
  const specialistNoteRef = useRef();

  const { handleEditPopup, data } = props;

  useEffect(() => {
    if (data) {
      setTicketsData(data.userCarDetails);
      setimageUrl(data.userCarDetails.carImage);
    }
  }, [data]);

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
    let payload;

    payload = {
      day: getInputValue(dayRef),
      departDateTime: new Date(
        `${getInputValue(pickupDateRef)}T${getInputValue(pickupTimeRef)}`
      ).toISOString(),
      specialistNote: getInputValue(specialistNoteRef),

      userCarDetails: ticketsData,
      transportationRef: data._id,
    };

    if (depart.type) {
      payload = { ...payload, depart };
    }

    if (arrival.type) {
      payload = { ...payload, arrival };
    }

    dispatch(
      Create(API.EDIT_CAR, payload, false, "", API.TRANSPORTATION_DATA, {
        itineraryRef: _id,
        transportationType: TRANSPORTATION_TYPE.CAR,
      })
    );
  };

  useEffect(() => {
    if (apiMessage.message === "Car Edited Successfully!") {
      handleEditPopup(false);
    }
  }, [apiMessage]);

  const handleImagePopup = () => setshowImage(false);

  return (
    <div className={styles["add-itinerary-data-form"]}>
      <div className={styles["form-background"]}>
        <div className="form-cross">
          <IoCloseOutline
            className={styles["cross"]}
            onClick={() => handleEditPopup(false)}
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
                  default: data.day,
                  ref: dayRef,
                  name: "Day",
                  id: "day",
                  maxlength: 30,
                  type: "number",
                }}
              />

              <GooglePlacesInput
                name="Pickup Location"
                setLocation={setDepart}
                defaultValue={data.depart}
              />

              <InputForm
                inputFields={{
                  default: data.departDateTime
                    ? dayjs(new Date(data.departDateTime).toISOString())
                        .format()
                        .slice(0, 10)
                    : "",
                  ref: pickupDateRef,
                  name: "Pickup Date",
                  id: "date",
                  maxlength: 30,
                  type: "date",
                }}
              />
              <InputForm
                inputFields={{
                  default: data.departDateTime
                    ? dayjs(new Date(data.departDateTime).toISOString())
                        .format()
                        .slice(11, 16)
                    : "",
                  ref: pickupTimeRef,
                  name: "Pickup Time",
                  id: "time",
                  maxlength: 30,
                  type: "time",
                }}
              />
            </div>
            <div className={styles["form-left-details"]}>
              <GooglePlacesInput
                name="Dropoff Location"
                setLocation={setArrival}
                defaultValue={data.arrival}
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
            Traveler Car Details
          </div>
          <div className={styles["form-required-feilds"]}>
            {UserTicket(
              1,
              saveUserTicketsData,
              setshowImage,
              setimageUrl,
              dispatch,
              data.userCarDetails,
              useEffect
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

export default EditCar;
