/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import {
  API,
  IMAGE,
  ITINERARY_TYPE,
  ITINERARY_TYPE_MAP,
} from "../../../constants";
import GooglePlacesInput from "../../../components/InputTypes/GooglePlacesInput";
import InputForm from "../../../components/InputTypes/InputForm/index";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import Dropdown from "../../../components/InputTypes/Dropdown/index";
import TextArea from "../../../components/InputTypes/TextArea/index";
import Toggle from "../../../components/InputTypes/Toggle/index";
import { getRefValue, setBackground } from "../../../util";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Create } from "../../../api/Create";
import dayjs from "dayjs";
import "./index.scss";

const AddItineraryPage = ({ handleEditPopup, data = {} }: any) => {
  const [selectedImage, setSelectedImage] = useState();
  const [location, setLocation] = useState({ type: "" });

  const nameRef = useRef();
  const emailRef = useRef();
  const priceRef = useRef();
  const noteRef = useRef();
  const regulationsRef = useRef();
  const fromDateRef = useRef();
  const toDateRef = useRef();
  const passportRef = useRef();
  const drivingRef = useRef();
  const roomsRef = useRef();
  const itineraryTypeRef = useRef();

  const { formRef } = useAppSelector((state) => state.appData);
  const { itineraryDetails } = useAppSelector((state) => state.itinerary);
  const apiMessage = useAppSelector((state) => state.apiMessage);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data.duration)
      setBackground(`${IMAGE.SMALL}${data.image}`, "itineraryImage");
  }, [data]);

  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setBackground(URL.createObjectURL(e.target.files[0]), "itineraryImage");
    }
  };

  const saveItinerary = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const getRefChecked = (ref: any) => ref.current.checked;
    let payload;

    payload = {
      itineraryEmail: getRefValue(emailRef),
      fromDate: `${getRefValue(fromDateRef)}T00:00:00.000Z`,
      isDrivingLicense: getRefChecked(drivingRef) === "on",
      isPassport: getRefChecked(passportRef) === "on",
      itineraryType: getRefValue(itineraryTypeRef),
      name: getRefValue(nameRef),
      price: getRefValue(priceRef),
      rooms: getRefValue(roomsRef),
      specialistNote: getRefValue(noteRef),
      specificRestrictionsAndRegulations: getRefValue(regulationsRef),
      toDate: `${getRefValue(toDateRef)}T00:00:00.000Z`,
    };

    if (location.type) {
      payload = { ...payload, location };
    }
    const dateDiff =
      (new Date(payload.toDate).valueOf() -
        new Date(payload.fromDate).valueOf()) /
      36e5;

    if (dateDiff < 0) {
      alert("Invalid Date");
      return;
    }

    if (payload.itineraryType == ITINERARY_TYPE_MAP.ONE_DAY) {
      if (dateDiff >= 48) {
        alert("You can`t select more than one day in One Day itinerary type.");
        return;
      }
    }

    if (data.duration) {
      payload = { ...payload, itineraryRef: data._id };

      dispatch(
        Create(
          API.ITINERARY_EDIT,
          payload,
          true,
          selectedImage ? selectedImage : null,
          API.ITINERARY_DETAILS,
          { formRef }
        )
      );
      handleEditPopup && handleEditPopup(null);
    } else {
      payload = { ...payload, formRef };

      if (!selectedImage) return alert("Please select an image!");
      dispatch(
        Create(
          API.ITINERARY_ADD,
          payload,
          true,
          selectedImage,
          API.ITINERARY_DETAILS,
          { formRef }
        )
      );
    }
  };

  useEffect(() => {
    if (apiMessage.type === "success" && itineraryDetails._id)
      navigate("/itinerary/add/transportation");
  }, [apiMessage.type, navigate, itineraryDetails._id]);

  return (
    <section className="AddItineraryDetailsPage" id="formTop">
      <div className="feild-heading">Upload Image</div>

      <input
        type="file"
        id="upload"
        accept="image/*"
        onChange={imageChange}
        hidden
      />

      <label htmlFor="upload" className={`upload-image `}>
        <div className="image-placeholder" id="itineraryImage"></div>
      </label>

      <form
        className="create-itinerary-form"
        onSubmit={(e) => saveItinerary(e)}
      >
        <div className="add-basic-details">
          <div className="feild-heading">Basic Details</div>
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
          <InputForm
            inputFields={{
              default: data.email,
              ref: emailRef,
              name: "Email",
              id: "email",
              maxlength: 30,
              type: "email",
            }}
          />
          <Dropdown
            name="Itinerary Type"
            inputFields={ITINERARY_TYPE}
            refe={itineraryTypeRef}
            checkedVal={data.itineraryType}
          />
          <InputForm
            inputFields={{
              default: data.price,
              ref: priceRef,
              name: "Itinerary Price",
              id: "price",
              maxlength: 3,
              type: "number",
            }}
          />

          <InputForm
            inputFields={{
              default: data.fromDateFormat
                ? data.fromDateFormat.slice(0, 10)
                : "",
              ref: fromDateRef,
              name: "From Date",
              id: "from_date",
              type: "date",
            }}
          />
          <InputForm
            inputFields={{
              default: data.toDateFormat ? data.toDateFormat.slice(0, 10) : "",
              ref: toDateRef,
              name: "To Date",
              id: "to_date",
              type: "date",
            }}
          />

          <button className="button-submit-itinerary">
            {data.duration ? "Save" : "Save & Next"}
          </button>
        </div>

        <div className="add-itinerary-details">
          <div className="feild-heading">Itinerary Details</div>

          <GooglePlacesInput
            name="Location"
            setLocation={setLocation}
            defaultValue={data.location}
          />

          <InputForm
            inputFields={{
              default: data.rooms,
              ref: roomsRef,
              name: "No. of People",
              id: "rooms",
              maxlength: 3,
              type: "number",
              max: 999,
            }}
          />
          <TextArea
            inputFields={{
              default: data.specialistNote,
              ref: noteRef,
              name: "Specialist Note",
              id: "note",
              maxlength: 1000,
              type: "text",
            }}
          />
          <TextArea
            inputFields={{
              default: data.specificRestrictionsAndRegulations,
              ref: regulationsRef,
              name: "Specific Restriction and Regulation",
              id: "restriction",
              maxlength: 1000,
              type: "text",
            }}
          />
          <Toggle
            inputFields={{
              default: data.isPassport,
              ref: passportRef,
              name: "Passport Required",
              id: "passport",
              type: "checkbox",
            }}
          />
          <Toggle
            inputFields={{
              default: data.isDrivingLicense,
              ref: drivingRef,
              name: "Driving License Required",
              id: "license",
              type: "checkbox",
            }}
          />
        </div>
      </form>
    </section>
  );
};

export default AddItineraryPage;
