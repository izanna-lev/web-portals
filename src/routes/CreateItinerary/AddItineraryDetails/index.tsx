/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { API, GOOGLE_API, ITINERARY_TYPE } from "../../../constants";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import InputForm from "../../../components/InputTypes/InputForm/index";
import { usePlacesWidget } from "react-google-autocomplete";
import Dropdown from "../../../components/InputTypes/Dropdown/index";
import TextArea from "../../../components/InputTypes/TextArea/index";
import Toggle from "../../../components/InputTypes/Toggle/index";
import { useEffect, useRef, useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import { Create } from "../../../api/Create";
import "./index.scss";

const AddItineraryPage = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [location, setLocation] = useState({});
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
  const dispatch = useAppDispatch();

  const { ref } = usePlacesWidget({
    apiKey: GOOGLE_API,
    onPlaceSelected: (place) => checkPlace(place),
  });

  useEffect(() => {
    // document.getElementById("formTop")?.scrollTo(0, 0);
    document.getElementById("itineraryDetailPage")?.scrollTo(0, 0);
  }, []);

  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const checkPlace = (place: any) => {
    const {
      address_components,
      geometry: {
        location: { lat, lng },
      },
    } = place;

    const newLocationObj = {
      location: `${address_components[0].long_name}, ${address_components[3].long_name}`,
      type: "Point",
      coordinates: [lat(), lng()],
    };
    setLocation(newLocationObj);
  };

  const saveItinerary = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const getInputValue = (ref: any) => ref.current.value;

    const data = {
      email: getInputValue(emailRef),
      fromDate: getInputValue(fromDateRef),
      isDrivingLicense: getInputValue(drivingRef) === "on",
      isPassport: getInputValue(passportRef) === "on",
      itineraryType: getInputValue(itineraryTypeRef),
      location,
      name: getInputValue(nameRef),
      price: getInputValue(priceRef),
      rooms: getInputValue(roomsRef),
      specialistNote: getInputValue(noteRef),
      specificRestrictionsAndRegulations: getInputValue(regulationsRef),
      toDate: getInputValue(toDateRef),
      formRef,
      travellerRef: formRef,
    };
    dispatch(Create(API.ITINERARY_ADD, data, true, selectedImage));
  };

  return (
    <section className="AddItineraryPage" id="formTop">
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
      >
        {selectedImage ? (
          <img
            src={URL.createObjectURL(selectedImage)}
            className="image-preview"
            alt="Thumb"
          />
        ) : (
          <IoImageOutline className="image-placeholder" />
        )}
      </label>

      <form
        className="create-itinerary-form"
        onSubmit={(e) => saveItinerary(e)}
      >
        <div className="add-basic-details">
          <div className="feild-heading">Basic Details</div>
          <InputForm
            inputFields={{
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
          />
          <InputForm
            inputFields={{
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
              placeholder: "",
              ref: toDateRef,
              name: "To Date",
              id: "to_date",
              maxlength: 350,
              type: "date",
            }}
          />

          <button className="button-submit-itinerary">
            <div className="button">Save & Next</div>
          </button>
        </div>

        <div className="add-itinerary-details">
          <div className="feild-heading">Itinerary Details</div>

          <InputForm
            inputFields={{
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
              placeholder: "Lorem Ipsum",
              ref: noteRef,
              name: "Specialist Note",
              id: "note",
              maxlength: 350,
              type: "text",
            }}
          />
          <TextArea
            inputFields={{
              placeholder: "Lorem ipsum",
              ref: regulationsRef,
              name: "Specific Restriction and Regulation",
              id: "restriction",
              maxlength: 350,
              type: "text",
            }}
          />
          <Toggle
            inputFields={{
              ref: passportRef,
              name: "Passport Required",
              id: "passport",
              type: "checkbox",
            }}
          />
          <Toggle
            inputFields={{
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
