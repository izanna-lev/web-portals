import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Create } from "../../../api/Create";
import { API, GOOGLE_API, IMAGE, RESERVATION_TYPE } from "../../../constants";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getRefValue, setBackground } from "../../../util";

type InputProps = {
  inputFields: {
    name: string;
    maxlength?: number;
    type: string;
    id?: string;
    placeholder?: string;
    max?: number;
    ref?: any;
    default?: string;
    onChange?: Function;
  };
};

const Input = ({ inputFields }: InputProps) => (
  <div>
    <input
      name={inputFields.name}
      type={inputFields.type}
      maxLength={inputFields.maxlength}
      className={`day-blank edit-background`}
      ref={inputFields.ref}
      onChange={(e) =>
        inputFields.onChange && inputFields.onChange(e.target.value)
      }
      placeholder={inputFields.placeholder}
      defaultValue={inputFields.default}
      required
    />
  </div>
);

const AddEditActivity = ({ data = { key: "awdwa" }, handleAddEdit }: any) => {
  const [defaultData, setdefaultData] = useState<any>({});
  const [location, setlocation] = useState({ type: "" });
  const [selectedImage, setSelectedImage] = useState();

  const dispatch = useAppDispatch();

  const { _id } = useAppSelector((state) => state.itinerary.itineraryDetails);

  const dayRef = useRef();
  const noteRef = useRef();
  const titleRef = useRef();
  const timeRef = useRef();
  const dateRef = useRef();

  useEffect(() => {
    if (data.day) {
      setdefaultData(data);
      setBackground(`${IMAGE.AVERAGE}${data.image}`, "activity_image");
    }
  }, [data]);

  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setBackground(URL.createObjectURL(e.target.files[0]), "activity_image");
    }
  };

  const locationRef = usePlacesWidget({
    apiKey: GOOGLE_API,
    onPlaceSelected: (place: any) => checkPlace(place),
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

  const saveActivityDetails = (e: any) => {
    e.preventDefault();

    let payload: any;

    payload = {
      day: getRefValue(dayRef),
      name: getRefValue(titleRef),
      description: getRefValue(noteRef),
      reservationDateTime: new Date(
        `${getRefValue(dateRef)}T${getRefValue(timeRef)}`
      ).toISOString(),
    };

    if (location.type) payload = { ...payload, location };
    // console.log(payload);

    if (data.day) {
      payload = { ...payload, reservationRef: data._id };
      dispatch(
        Create(
          API.ACTIVITY_EDIT,
          payload,
          true,
          selectedImage ? selectedImage : null,
          API.RESERVATION_LIST,
          {
            itineraryRef: _id,
            reservationType: RESERVATION_TYPE.ACTIVITY,
          }
        )
      );
    } else {
      if (!selectedImage) return alert("Please select an image!");

      payload = { ...payload, itineraryRef: _id };
      dispatch(
        Create(
          API.ACTIVITY_ADD,
          payload,
          true,
          selectedImage,
          API.RESERVATION_LIST,
          {
            itineraryRef: _id,
            reservationType: RESERVATION_TYPE.ACTIVITY,
          }
        )
      );
    }
    handleAddEdit(false);
  };

  return (
    <form
      className="add-activities add-data table-item"
      onSubmit={saveActivityDetails}
      key={data._id}
    >
      <Input
        inputFields={{
          ref: dayRef,
          name: "day",
          max: 365,
          type: "number",
          default: defaultData.day,
        }}
      />

      <div>
        <div className="day-blank image itineraryImage" id="activity_image">
          <input
            type="file"
            id="activity-upload"
            accept="image/*"
            name="image"
            onChange={(e) => imageChange(e)}
            hidden
          />
          <label
            htmlFor="activity-upload"
            className={` ${defaultData.image ? "" : "not-selected-preview"}`}
          >
            <IoCloudUploadOutline className="activity-image-placeholder" />
          </label>
        </div>
      </div>

      <Input
        inputFields={{
          ref: titleRef,
          name: "title",
          maxlength: 365,
          type: "text",
          default: defaultData.name,
        }}
      />

      <Input
        inputFields={{
          ref: timeRef,
          name: "time",
          type: "time",
          default: data.dateTime
            ? dayjs(new Date(data.dateTime).toISOString())
                .format()
                .slice(11, 16)
            : "",
        }}
      />

      <Input
        inputFields={{
          ref: dateRef,
          name: "date",
          type: "date",
          default: data.dateTime
            ? dayjs(new Date(data.dateTime).toISOString()).format().slice(0, 10)
            : "",
        }}
      />

      <Input
        inputFields={{
          ref: locationRef.ref,
          name: "location",
          maxlength: 365,
          type: "text",
          default: defaultData.location?.location,
        }}
      />

      <Input
        inputFields={{
          ref: noteRef,
          name: "note",
          maxlength: 1000,
          type: "text",
          default: defaultData.description,
        }}
      />

      <div className="add-activity-buttons">
        <button className="btn edit-button" type="submit">
          <span typeof="submit">Save</span>
        </button>
        <button
          className="btn delete-button"
          onClick={() => handleAddEdit(false)}
          type="button"
        >
          <span>Cancel</span>
        </button>
      </div>
    </form>
  );
};

export default AddEditActivity;
