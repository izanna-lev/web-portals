import styles from "./index.module.scss";
import { IoCloudUploadOutline, IoCloseOutline } from "react-icons/io5";
import InputForm from "../../InputTypes/InputForm/index";
import TextArea from "../../InputTypes/TextArea/index";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/plain.css";
import { useEffect, useRef, useState } from "react";
import { compareDateRange, getRefValue, setBackground } from "../../../util";
import { usePlacesWidget } from "react-google-autocomplete";
import { API, GOOGLE_API, IMAGE, RESERVATION_TYPE } from "../../../constants";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Create } from "../../../api/Create";
import dayjs from "dayjs";

const AddAccomodation = ({ handleAddPopup, data = {} }: any) => {
  const [selectedImage, setSelectedImage] = useState();
  const [location, setlocation] = useState({ type: "" });
  const [phone, setPhone] = useState("");

  const dispatch = useAppDispatch();

  const { _id } = useAppSelector((state) => state.itinerary.itineraryDetails);

  const dayRef = useRef();
  const nameRef = useRef();
  const checkInTimeRef = useRef();
  const checkInDateRef = useRef();
  const checkOutTimeRef = useRef();
  const checkOutDateRef = useRef();
  const specialistNoteRef = useRef();

  useEffect(() => {
    if (data.day) {
      setPhone(data.contactNumber);
      setBackground(`${IMAGE.AVERAGE}${data.image}`, "accomodationImage");
    }
  }, [data]);

  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setBackground(
        URL.createObjectURL(e.target.files[0]),
        "accomodationImage"
      );
    }
  };

  const AccomodationLocation = usePlacesWidget({
    apiKey: GOOGLE_API,
    onPlaceSelected: (place) => checkPlace(place),
  });

  const checkPlace = (place: any) => {
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
    setlocation(newLocationObj);
  };

  const saveAccomodationDetails = (e: any) => {
    e.preventDefault();

    let payload: any;

    payload = {
      contactNumber: phone,
      day: getRefValue(dayRef),
      name: getRefValue(nameRef),
      description: getRefValue(specialistNoteRef),
      checkInDateTime: new Date(
        `${getRefValue(checkInDateRef)}T${getRefValue(checkInTimeRef)}`
      ).toISOString(),
      checkOutDateTime: new Date(
        `${getRefValue(checkOutDateRef)}T${getRefValue(checkOutTimeRef)}`
      ).toISOString(),
    };

    const dateComparison = compareDateRange(
      payload.checkInDateTime,
      payload.checkOutDateTime
    );

    if (payload.contactNumber.length < 10) {
      return alert("Please enter a valid phone number!");
    }

    if (!dateComparison) {
      return alert("Please select proper date range!");
    }

    if (location.type) payload = { ...payload, location };

    if (data.day) {
      payload = { ...payload, reservationRef: data._id };

      dispatch(
        Create(
          API.ACCOMODATION_EDIT,
          payload,
          true,
          selectedImage ? selectedImage : null,
          API.RESERVATION_LIST,
          {
            itineraryRef: _id,
            reservationType: RESERVATION_TYPE.ACCOMMODATION,
          }
        )
      );
    } else {
      if (!selectedImage) return alert("Please select an image!");

      payload = { ...payload, itineraryRef: _id };
      dispatch(
        Create(
          API.ACCOMODATION_ADD,
          payload,
          true,
          selectedImage,
          API.RESERVATION_LIST,
          {
            itineraryRef: _id,
            reservationType: RESERVATION_TYPE.ACCOMMODATION,
          }
        )
      );
    }
    handleAddPopup(false);
  };

  return (
    <div className={styles["add-itinerary-data-form"]}>
      <div className={styles["form-background"]}>
        <div className="form-cross">
          <IoCloseOutline
            className={styles["cross"]}
            onClick={() => handleAddPopup()}
          />
        </div>
        <form className="form-block" onSubmit={saveAccomodationDetails}>
          <div className={styles["form-image"]} id="accomodationImage">
            <input
              type="file"
              id="activity-upload"
              accept="image/*"
              name="image"
              onChange={imageChange}
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
          <label htmlFor="activity-upload" className="bold underline">
            Upload Image
          </label>

          <div className={styles["form-required-feilds"]}>
            <div className={styles["form-left-details"]}>
              <InputForm
                inputFields={{
                  default: data.day,
                  ref: dayRef,
                  placeholder: "1",
                  name: "Day",
                  id: "day",
                  maxlength: 30,
                  type: "number",
                }}
              />
              <InputForm
                inputFields={{
                  default: data.name,
                  ref: nameRef,
                  placeholder: "Radisson Blu Hotel",
                  name: "Name",
                  id: "name",
                  maxlength: 30,
                  type: "text",
                }}
              />
              <InputForm
                inputFields={{
                  default: data.location?.location,
                  placeholder: "Cebu City, Phillipines",
                  name: "Location",
                  id: "location",
                  maxlength: 360,
                  type: "text",
                  ref: AccomodationLocation.ref,
                }}
              />
              <div className={`${styles["field-heading"]}`}>Contact Number</div>
              <PhoneInput
                inputProps={{
                  name: "contact number",
                  required: true,
                  autoFocus: true,
                }}
                country="us"
                value={phone}
                specialLabel="Contact Number"
                inputClass={`${styles["field-value"]}`}
                containerClass={`${styles["input-tel"]}`}
                buttonClass={`${styles["flag-dropdown"]}`}
                onChange={(value) => setPhone(value)}
              />

              <TextArea
                inputFields={{
                  default: data.description,
                  ref: specialistNoteRef,
                  placeholder: "Lorem ipsum",
                  name: "Description",
                  id: "description",
                  maxlength: 1000,
                  type: "text",
                }}
              />
            </div>
            <div className={styles["form-left-details"]}>
              <InputForm
                inputFields={{
                  default: data.checkInDateTime
                    ? dayjs(new Date(data.checkInDateTime).toISOString())
                        .format()
                        .slice(0, 10)
                    : "",
                  ref: checkInDateRef,
                  name: "Check In Date",
                  id: "date",
                  maxlength: 30,
                  type: "date",
                }}
              />
              <InputForm
                inputFields={{
                  default: data.checkInDateTime
                    ? dayjs(new Date(data.checkInDateTime).toISOString())
                        .format()
                        .slice(11, 16)
                    : "",
                  ref: checkInTimeRef,
                  name: "Check In Time",
                  id: "time",
                  maxlength: 30,
                  type: "time",
                }}
              />
              <InputForm
                inputFields={{
                  default: data.checkInDateTime
                    ? dayjs(new Date(data.checkOutDateTime).toISOString())
                        .format()
                        .slice(0, 10)
                    : "",
                  ref: checkOutDateRef,
                  name: "Check Out Date",
                  id: "date",
                  maxlength: 30,
                  type: "date",
                }}
              />
              <InputForm
                inputFields={{
                  default: data.checkInDateTime
                    ? dayjs(new Date(data.checkOutDateTime).toISOString())
                        .format()
                        .slice(11, 16)
                    : "",
                  ref: checkOutTimeRef,
                  name: "Check Out Time",
                  id: "time",
                  maxlength: 30,
                  type: "time",
                }}
              />
            </div>
          </div>

          <div className={styles["button-save"]}>
            <button className={`continue-button no-border`} type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAccomodation;
