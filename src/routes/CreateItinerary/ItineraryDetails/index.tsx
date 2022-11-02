/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { API, GOOGLE_API, IMAGE, ITINERARY_TYPE } from "../../../constants";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import InputForm from "../../../components/InputTypes/InputForm/index";
import { usePlacesWidget } from "react-google-autocomplete";
import Dropdown from "../../../components/InputTypes/Dropdown/index";
import TextArea from "../../../components/InputTypes/TextArea/index";
import Toggle from "../../../components/InputTypes/Toggle/index";
import { useEffect, useRef, useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import { Create } from "../../../api/Create";
import { getRefValue, setBackground } from "../../../util";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "./index.scss";

const AddItineraryPage = ({ handleEditPopup, data = {} }: any) => {
  const [selectedImage, setSelectedImage] = useState();
  const [location, setLocation] = useState({ type: "" });
  console.log(data, handleEditPopup);

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
  const apiMessage = useAppSelector((state) => state.apiMessage);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { ref } = usePlacesWidget({
    apiKey: GOOGLE_API,
    onPlaceSelected: (place) => checkPlace(place),
  });

  useEffect(() => {
    if (data.duration)
      setBackground(`${IMAGE.SMALL}${data.image}`, "itineraryImage");

    document.getElementById("itineraryDetailPage")?.scrollTo(0, 0);
  }, [data]);

  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setBackground(URL.createObjectURL(e.target.files[0]), "itineraryImage");
    }
  };

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
    setLocation(newLocationObj);
  };

  const saveItinerary = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let payload;

    payload = {
      itineraryEmail: getRefValue(emailRef),
      fromDate: new Date(getRefValue(fromDateRef)).toISOString(),
      isDrivingLicense: getRefValue(drivingRef) === "on",
      isPassport: getRefValue(passportRef) === "on",
      itineraryType: getRefValue(itineraryTypeRef),
      name: getRefValue(nameRef),
      price: getRefValue(priceRef),
      rooms: getRefValue(roomsRef),
      specialistNote: getRefValue(noteRef),
      specificRestrictionsAndRegulations: getRefValue(regulationsRef),
      toDate: new Date(getRefValue(toDateRef)).toISOString(),
    };

    if (location.type) {
      payload = { ...payload, location };
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
    if (apiMessage.type === "success") navigate("/itinerary/add/summary");
  }, [apiMessage.type, navigate]);

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
      <label
        htmlFor="upload"
        className={`upload-image ${
          selectedImage ? "" : "not-selected-preview"
        }`}
        id="itineraryImage"
      >
        <IoImageOutline className="image-placeholder" />
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
              placeholder: "Steven Johns",
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
              placeholder: "example@mail.com",
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
              placeholder: "$250",
              ref: priceRef,
              name: "Itinerary Price",
              id: "price",
              maxlength: 3,
              type: "number",
            }}
          />

          <InputForm
            inputFields={{
              default: data.fromDate
                ? dayjs(new Date(data.fromDate).toISOString())
                    .format()
                    .slice(0, 10)
                : "",
              placeholder: "",
              ref: fromDateRef,
              name: "From Date",
              id: "from_date",
              maxlength: 350,
              type: "date",
            }}
          />
          <InputForm
            inputFields={{
              default: data.toDate
                ? dayjs(new Date(data.toDate).toISOString())
                    .format()
                    .slice(0, 10)
                : "",
              placeholder: "",
              ref: toDateRef,
              name: "To Date",
              id: "to_date",
              maxlength: 350,
              type: "date",
            }}
          />

          <button className="button-submit-itinerary">
            {data.duration ? "Save" : "Save & Next"}
          </button>
        </div>

        <div className="add-itinerary-details">
          <div className="feild-heading">Itinerary Details</div>

          <InputForm
            inputFields={{
              default: data.location?.location,
              placeholder: "Cebu City, Canada",
              ref: ref,
              name: "Location",
              id: "location",
              maxlength: 9999,
              type: "text",
            }}
          />
          <InputForm
            inputFields={{
              default: data.rooms,
              placeholder: "1",
              ref: roomsRef,
              name: "No of Rooms allotted",
              id: "rooms",
              maxlength: 3,
              type: "number",
              max: 999,
            }}
          />
          <TextArea
            inputFields={{
              default: data.specialistNote,
              placeholder: "Lorem Ipsum",
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
              placeholder: "Lorem ipsum",
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
