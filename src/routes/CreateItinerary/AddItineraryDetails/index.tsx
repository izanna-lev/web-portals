/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */


import { useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import InputForm from "../../../components/InputForm/index";
import Toggle from  "../../../components/Toggle/index";
import Radio from  "../../../components/Radio/index";
import TextArea from  "../../../components/TextArea/index";
import Dropdown from  "../../../components/Dropdown/index";
import {ITINERARY_TYPE} from "../../../constants"
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

  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  return (
    <section className="AddItineraryPage">
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

      <form className="create-itinerary-form">

        <div className="add-basic-details">
          <div className="feild-heading">Basic Details</div>
          <InputForm inputFeilds={{ name: "Name", id: "name", maxlength: 30, type:"text"}}/>
          <InputForm inputFeilds={{ name: "Email", id: "email", maxlength: 30, type:"email"}}/>
          <Dropdown  name="Itinerary Type" inputFeilds={ITINERARY_TYPE}/>
          <InputForm inputFeilds={{ name: "Itinerary Price", id: "price", maxlength: 3, type:"number"}}/>
          <TextArea inputFeilds={{ name: "Specialist Note", id: "note", maxlength: 350, type:"text"}}/>
          <TextArea inputFeilds={{ name: "Specific Restriction and Regulation", id: "restriction", maxlength: 350, type:"text"}}/>
          <InputForm inputFeilds={{ name: "From Date", id: "from_date", maxlength: 350, type:"date"}}/>
          <InputForm inputFeilds={{ name: "To Date", id: "to_date", maxlength: 350, type:"date"}}/>
          <div className="feild-heading">How much traveler already planned?</div>
          <Radio inputFeilds={{ type:"radio", id:"traveler_planned", name:"I haven`t even started" }}/>
          <Radio inputFeilds={{ type:"radio", id:"traveler_planned", name:"I haven few things planned but still have a lot to go" }}/>
          <Radio inputFeilds={{ type:"radio", id:"traveler_planned", name:"The important stuff is booked but I have to plan the itinerary" }}/>
          <div className="button-submit-itinerary">
              <div className="button">Save & Next</div>
            </div>
        </div>

        <div className="add-itinerary-details">
          <div className="feild-heading">Itinerary Details</div>
          <InputForm inputFeilds={{ name: "No of Adults allowed", id: "adults_number", maxlength: 3, type:"number", max:999}}/>
          <InputForm inputFeilds={{ name: "No of Children allowed", id: "children_number", maxlength: 3, type:"number", max:999}}/>
          <InputForm inputFeilds={{ name: "No of Infants allowed", id: "infants_number", maxlength: 3, type:"number", max:999}}/>
          <InputForm inputFeilds={{ name: "No of Rooms alloted", id: "rooms", maxlength: 3, type:"number", max:999}}/>
          <InputForm inputFeilds={{ name: "No of Days", id: "days", maxlength: 3, type:"number", max:999}}/>
          <Toggle inputFeilds={{ name: "Passport Required", id: "passport", type:"checkbox"}}/>
          <Toggle inputFeilds={{ name: "Driving License Required", id: "license", type:"checkbox"}}/>

        </div>

      </form>
    </section>
  );
};

export default AddItineraryPage;
