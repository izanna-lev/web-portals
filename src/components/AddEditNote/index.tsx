import { useEffect, useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Create } from "../../api/Create";
import { API, IMAGE } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getRefValue, setBackground } from "../../util";

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
      autoFocus
      required
    />
  </div>
);

const AddEditNotes = ({ data = {}, handleAddEdit }: any) => {
  const [defaultData, setdefaultData] = useState<any>({});
  const [selectedImage, setSelectedImage] = useState();

  const { _id } = useAppSelector((state) => state.itinerary.itineraryDetails);
  const dispatch = useAppDispatch();

  const dayRef = useRef();
  const noteRef = useRef();

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

  const saveNoteDetails = (e: any) => {
    e.preventDefault();

    let payload: any;
    payload = {
      day: getRefValue(dayRef),
      description: getRefValue(noteRef),
    };

    // console.log(payload, selectedImage);

    if (data.day) {
      payload = { ...payload, noteRef: data._id };

      dispatch(
        Create(
          API.NOTE_EDIT,
          payload,
          true,
          selectedImage ? selectedImage : null,
          API.NOTES_LIST,
          { itineraryRef: _id }
        )
      );
    } else {
      if (!selectedImage) return alert("Please select an image!");

      payload = { ...payload, itineraryRef: _id };
      dispatch(
        Create(API.NOTE_ADD, payload, true, selectedImage, API.NOTES_LIST, {
          itineraryRef: _id,
        })
      );
    }
    handleAddEdit(false);
  };

  return (
    <form className="add-notes add-data table-item" onSubmit={saveNoteDetails}>
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
        >
          <span>Cancel</span>
        </button>
      </div>
    </form>
  );
};

export default AddEditNotes;
