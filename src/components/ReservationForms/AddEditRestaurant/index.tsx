import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import GooglePlacesInput from "../../InputTypes/GooglePlacesInput";
import { API, IMAGE, RESERVATION_TYPE } from "../../../constants";
import { getRefValue, setBackground } from "../../../util";
import InputForm from "../../InputTypes/InputForm/index";
import TextArea from "../../InputTypes/TextArea/index";
import { useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Create } from "../../../api/Create";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/plain.css";
import styles from "./index.module.scss";

const AddAccomodation = ({ handleAddPopup, data = {} }: any) => {
  const [selectedImage, setSelectedImage] = useState();
  const [location, setlocation] = useState({ type: "" });
  const [phone, setPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState("");

  const dispatch = useAppDispatch();

  const { _id } = useAppSelector((state) => state.itinerary.itineraryDetails);

  const apiMessage = useAppSelector((state) => state.apiMessage);

  const dayRef = useRef();
  const nameRef = useRef();
  const reservationTimeRef = useRef();
  const reservationDateRef = useRef();
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

  const saveAccomodationDetails = (e: any) => {
    e.preventDefault();

    let payload: any;
    payload = {
      contactNumber: phone,
      phoneCode,
      day: getRefValue(dayRef),
      name: getRefValue(nameRef),
      description: getRefValue(specialistNoteRef),
      reservationDateTime: `${getRefValue(reservationDateRef)}T${getRefValue(
        reservationTimeRef
      )}:00.000Z`,
    };

    // if (payload.contactNumber.length < 10) {
    //   return alert("Please enter a valid phone number!");
    // }

    if (location.type) payload = { ...payload, location };

    if (data.day) {
      payload = { ...payload, reservationRef: data._id };

      dispatch(
        Create(
          API.RESTAURANT_EDIT,
          payload,
          true,
          selectedImage ? selectedImage : null,
          API.RESERVATION_LIST,
          {
            itineraryRef: _id,
            reservationType: RESERVATION_TYPE.RESTAURANT,
          }
        )
      );
    } else {
      if (!selectedImage) {
        return alert("Please select an image!");
      }
      payload = { ...payload, itineraryRef: _id };
      dispatch(
        Create(
          API.RESTAURANT_ADD,
          payload,
          true,
          selectedImage,
          API.RESERVATION_LIST,
          {
            itineraryRef: _id,
            reservationType: RESERVATION_TYPE.RESTAURANT,
          }
        )
      );
    }
  };

  useEffect(() => {
    if (
      apiMessage.message === "Restaurant added successfully!" ||
      apiMessage.message === "Restaurant edited successfully!"
    ) {
      handleAddPopup(false);
    }
  }, [apiMessage]);

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
          <div className={styles["form-image"]}>
            <input
              type="file"
              id="activity-upload"
              accept="image/*"
              name="image"
              onChange={imageChange}
              hidden
            />
            <label htmlFor="activity-upload">
              <div
                className={styles["activity-image-placeholder"]}
                id="accomodationImage"
              ></div>
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
                  name: "Name",
                  id: "name",
                  maxlength: 30,
                  type: "text",
                }}
              />

              <GooglePlacesInput
                name="Location"
                setLocation={setlocation}
                defaultValue={data.location?.location}
              />

              <div className={`${styles["field-heading"]}`}>Contact Number</div>
              <PhoneInput
                inputProps={{
                  name: "contact number",
                  required: true,
                }}
                country="us"
                onChange={(value, country, e) => {
                  if (e.target.localName === "input") {
                    const newVal = e.target.value.split(" ");
                    setPhoneCode(newVal[0]);
                    setPhone(newVal.slice(1).join(""));
                  }
                }}
                value={phoneCode + phone}
                specialLabel="Contact Number"
                inputClass={`${styles["field-value"]}`}
                containerClass={`${styles["input-tel"]}`}
                buttonClass={`${styles["flag-dropdown"]}`}
              />
            </div>
            <div className={styles["form-left-details"]}>
              <InputForm
                inputFields={{
                  default: data.dateTime ? data.dateTime.slice(0, 10) : "",
                  ref: reservationDateRef,
                  name: "Date",
                  id: "date",
                  maxlength: 30,
                  type: "date",
                }}
              />
              <InputForm
                inputFields={{
                  default: data.dateTime ? data.dateTime.slice(11, 16) : "",
                  ref: reservationTimeRef,
                  name: "Time",
                  id: "time",
                  maxlength: 30,
                  type: "time",
                }}
              />
              <TextArea
                inputFields={{
                  default: data.description,
                  ref: specialistNoteRef,
                  name: "Description",
                  id: "description",
                  maxlength: 1000,
                  type: "text",
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
