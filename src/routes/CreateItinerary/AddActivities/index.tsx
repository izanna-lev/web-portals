/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable array-callback-return */
/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";

import "./index.scss";

type ActivityProps = {
  name: string;
  day: number;
  image: string;
  title: string;
  time: Date;
  date: Date;
  location: string;
  note: string;
  isNew: boolean;
};

const AddActivitiesPage = () => {
  const [activityListData, setActivityListData] = useState<ActivityProps[]>([]);
  const [activityChangedData, changedData] = useState<{ [key: string]: any }>(
    {}
  );
  const [canAddMore, setAddMore] = useState(true);

  console.log("activityChangedData----", activityChangedData);

  const dataChange = (index: number, e: any) => {
    console.log(e.target.files)
    if (e.target.files && e.target.files.length > 0) {
      changedData({
        ...activityChangedData,
        [index.toString()]: {
          ...activityChangedData[index],
          [e.target.name]: e.target.files[0],
        },
      });
     
    } else {
      changedData({
        ...activityChangedData,
        [index.toString()]: {
          ...activityChangedData[index],
          [e.target.name]: e.target.value,
        },
      });
    }

  };

  const addObjectToArray = (obj: {
    day: number;
    name: string;
    image: string;
    title: string;
    time: Date;
    date: Date;
    location: string;
    note: string;
    isNew: boolean;
  }) => {
    setActivityListData((current) => [...current, obj]);
    setAddMore(false);
  };

  const defaultValues = {
    day: 0,
    name: "",
    image: "",
    title: "",
    time: new Date(),
    date: new Date(),
    location: "",
    note: "",
    isNew: true,
  };

  return (
    <section className="AddActivitiesPage">
      <div className="add-activities">
        <div>Day</div>
        <div>Image</div>
        <div>Title</div>
        <div>Time</div>
        <div>Date</div>
        <div>Location</div>
        <div>Note</div>
        <div>Actions</div>
      </div>

      <div className="forms">
        {activityListData.map((element, index) => {
          return (
            <form className="add-activities add-data" key={index}>
              <input
                className={`day-blank ${
                  activityChangedData?.[index]?.day
                    ? "fixed-background"
                    : "edit-background"
                }`}
                name="day"
                type="number"
                onChange={(e) => dataChange(index, e)}
                maxLength={365}
                autoFocus
                required
                disabled={false}
              />

              <div className="day-blank image">
                <input
                  type="file"
                  id="activity-upload"
                  accept="image/*"
                  name="image"
                  onChange={(e) => dataChange(index, e)}
                  hidden
                />
                <label
                  htmlFor="activity-upload"
                  className={` ${activityChangedData?.[index]?.image ? "" : "not-selected-preview"}`}
                >
                  {activityChangedData?.[index]?.image ? (
                    <img
                      src={ URL.createObjectURL(activityChangedData?.[index]?.image)}
                      className="activity-image-preview"
                      alt="Thumb"
                    />
                  ) : (
                    <IoCloudUploadOutline className="activity-image-placeholder" />
                  )}
                </label>
              </div>

              <input
                className={`day-blank ${
                  activityChangedData[index]?.title
                    ? "fixed-background"
                    : "edit-background"
                }`}
                name="title"
                type="text"
                onChange={(e) => dataChange(index, e)}
                maxLength={365}
                autoFocus
                required
              />

              <input
                className={`day-blank ${
                  activityChangedData[index]?.time
                    ? "fixed-background"
                    : "edit-background"
                }`}
                name="time"
                type="time"
                onChange={(e) => dataChange(index, e)}
                maxLength={365}
                autoFocus
                required
              />
              <input
                className={`day-blank ${
                  activityChangedData[index]?.date
                    ? "fixed-background"
                    : "edit-background"
                }`}
                name="date"
                type="date"
                onChange={(e) => dataChange(index, e)}
                maxLength={365}
                autoFocus
                required
              />
              <input
                className={`day-blank ${
                  activityChangedData[index]?.hotel
                    ? "fixed-background"
                    : "edit-background"
                }`}
                name="hotel"
                type="text"
                onChange={(e) => dataChange(index, e)}
                maxLength={365}
                autoFocus
                required
              />
              <input
                className={`day-blank ${
                  activityChangedData[index]?.note
                    ? "fixed-background"
                    : "edit-background"
                }`}
                name="note"
                type="text"
                onChange={(e) => dataChange(index, e)}
                maxLength={365}
                autoFocus
                required
              />
              <div className="add-activity-buttons">
                <div className="activity-button edit">
                  {!element.isNew && <BiEdit />}
                  <div
                  typeof="submit">{element.isNew ? "Save" : "Edit"}</div>
                </div>
                <div className="activity-button delete">
                  {!element.isNew && <RiDeleteBin6Line />}
                  <div
                    onClick={() => {
                      canAddMore
                        ? addObjectToArray(defaultValues)
                        : addObjectToArray(defaultValues);
                    }}
                  >
                    {element.isNew ? "Cancel" : "Delete"}
                  </div>
                </div>
              </div>
            </form>
          );
        })}
      </div>

      <div
        className="add-more"
        onClick={() => {
          canAddMore ? addObjectToArray(defaultValues) : <></>;
        }}
      >
        + Add More
      </div>
    </section>
  );
};

export default AddActivitiesPage;
