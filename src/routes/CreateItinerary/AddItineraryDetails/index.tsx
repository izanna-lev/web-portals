/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useEffect, useRef, useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import InputForm from "../../../components/InputForm/index";
import Toggle from "../../../components/Toggle/index";
import Radio from "../../../components/Radio/index";
import TextArea from "../../../components/TextArea/index";
import Dropdown from "../../../components/Dropdown/index";
import { ITINERARY_TYPE } from "../../../constants";
import "./index.scss";

type Props = {
  triggerFetchEntity: (endpoint: string) => void;
  fetching: boolean;
  dashboard: {
    active: number;
    blocked: number;
    deleted: number;
    pActive: number;
    pBlocked: number;
    pDeleted: number;
    totalClicksOnAds: number;
  };
};
const AddItineraryPage = () => {
  const [selectedImage, setSelectedImage] = useState();
  const nameRef = useRef();
  const emailRef = useRef();
  const priceRef = useRef();
  const noteRef = useRef();
  const regulationsRef = useRef();
  const durationRef = useRef();
  const fromDateRef = useRef();
  const toDateRef = useRef();
  const passportRef = useRef();
  const drivingRef = useRef();
  const guestsRef = useRef();
  const locationRef = useRef();
  const roomsRef = useRef();
  const itineraryTypeRef = useRef();

  useEffect(() => {
    document.getElementById("formTop")?.scrollTo(0, 0);
  }, []);

  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const saveItinerary = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const getInputValue = (ref: any) => ref.current.value;

    const getPlannedTraveller = () => {
      let newValue = 1;
      document
        .getElementsByName("traveller_planned")
        .forEach((el: any) => el.checked && (newValue = el.value));

      return newValue;
    };

    const data = {
      duration: getInputValue(durationRef),
      email: getInputValue(emailRef),
      fromDate: getInputValue(fromDateRef),
      guests: getInputValue(guestsRef),
      isDrivingLicense: getInputValue(drivingRef),
      isPassport: getInputValue(passportRef),
      itineraryType: getInputValue(itineraryTypeRef),
      location: getInputValue(locationRef),
      name: getInputValue(nameRef),
      plannedTraveller: getPlannedTraveller(),
      price: getInputValue(priceRef),
      rooms: getInputValue(roomsRef),
      specialistNote: getInputValue(noteRef),
      specificRestrictionsAndRegulations: getInputValue(regulationsRef),
      toDate: getInputValue(toDateRef),
    };
    console.log(data, selectedImage);
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
              ref: nameRef,
              name: "Name",
              id: "name",
              maxlength: 30,
              type: "text",
            }}
          />
          <InputForm
            inputFields={{
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
              ref: priceRef,
              name: "Itinerary Price",
              id: "price",
              maxlength: 3,
              type: "number",
            }}
          />
          <TextArea
            inputFields={{
              ref: noteRef,
              name: "Specialist Note",
              id: "note",
              maxlength: 350,
              type: "text",
            }}
          />
          <TextArea
            inputFields={{
              ref: regulationsRef,
              name: "Specific Restriction and Regulation",
              id: "restriction",
              maxlength: 350,
              type: "text",
            }}
          />
          <InputForm
            inputFields={{
              ref: fromDateRef,
              name: "From Date",
              id: "from_date",
              maxlength: 350,
              type: "date",
            }}
          />
          <InputForm
            inputFields={{
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
              ref: guestsRef,
              name: "No of guests",
              id: "guests_number",
              maxlength: 3,
              type: "number",
              max: 999,
            }}
          />
          <InputForm
            inputFields={{
              ref: locationRef,
              name: "Location",
              id: "location",
              maxlength: 30,
              type: "text",
            }}
          />
          <InputForm
            inputFields={{
              ref: roomsRef,
              name: "No of Rooms allotted",
              id: "rooms",
              maxlength: 3,
              type: "number",
              max: 999,
            }}
          />
          <InputForm
            inputFields={{
              ref: durationRef,
              name: "No of days",
              id: "days",
              maxlength: 3,
              type: "number",
              max: 999,
            }}
          />
          <div className="feild-heading">
            How much traveler already planned?
          </div>
          <Radio
            inputFields={{
              type: "radio",
              id: "traveller_planned",
              name: "I haven`t even started",
              value: 1,
              checked: true,
            }}
          />
          <Radio
            inputFields={{
              type: "radio",
              id: "traveller_planned",
              name: "I have a few things planned but still have a lot to go",
              value: 2,
              checked: false,
            }}
          />
          <Radio
            inputFields={{
              type: "radio",
              id: "traveller_planned",
              name: "The important stuff is booked but I need to plan the itinerary",
              value: 3,
              checked: false,
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
