/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable array-callback-return */
/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getFormattedDate, getFormattedTime } from "../../../util";
import { API, TRANSPORTATION_TYPE } from "../../../constants";
import EditCar from "../../TransportationEdit/EditCar";
import NewCar from "../../TransportationAdd/AddCar";
import { Modal } from "../../../components/Portal";
import { DeleteEntity } from "../../../api/Delete";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import styles from "./index.module.scss";
import { useState } from "react";

const AddActivitiesPage = () => {
  const [addMore, setAddMore] = useState(false);
  const [edit, setEdit] = useState(undefined);

  const dispatch = useAppDispatch();

  const carDataList = useAppSelector((state: any) => state.transportation.car);

  const { _id } = useAppSelector(
    (state) => state.itineraryData.itineraryDetails
  );

  const deleteTransportation = (transportationRef: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this?"
    );
    if (confirmDelete)
      dispatch(
        DeleteEntity(
          API.TRANSPORTATION_DELETE,
          { transportationRef },
          API.TRANSPORTATION_DATA,
          { transportationType: TRANSPORTATION_TYPE.CAR, itineraryRef: _id },
          1,
          10
        )
      );
  };

  return (
    <>
      <section className={styles["AddCarsPage"]}>
        <div className={styles["flightDetails-table"]}>
          <div>Day</div>
          <div>Pickup Location</div>
          <div>Arrival Date</div>
          <div>Arrival Time</div>
          <div>Dropoff Location</div>
          <div>Specialist Note</div>
          <div>Actions</div>
        </div>

        <div className={styles["forms"]}>
          {carDataList.list?.length ? (
            carDataList.list.map((element: any, index: number) => (
              <div
                className={`${styles["flightDetails-table"]} ${styles["table-item"]}`}
                key={index}
              >
                <div>{element.day || "NA"}</div>
                <div>{element.depart || "NA"}</div>
                <div>{getFormattedDate(element.departDateTime)}</div>
                <div>{getFormattedTime(element.departDateTime)}</div>
                <div>{element.arrival || "NA"}</div>
                <div>{element.specialistNote || "NA"}</div>
                <div className="add-activity-buttons">
                  <button
                    className="btn edit-button"
                    onClick={() => {
                      setEdit(element);
                    }}
                  >
                    <FaRegEdit />
                    &nbsp;<span>Edit</span>
                  </button>
                  <button
                    className="btn delete-button"
                    onClick={() => deleteTransportation(element._id)}
                  >
                    <MdDeleteOutline />
                    &nbsp;<span>Delete</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className={`${styles["empty-table"]} ${styles["table-item"]}`}>
              Nothing Added
            </div>
          )}
        </div>

        <div
          className={styles["add-more"]}
          onClick={() => {
            setAddMore(true);
          }}
        >
          + Add Car Details
        </div>
      </section>

      <div
        onClick={() => console.log("continue")}
        className={styles["continue-button"]}
      >
        Continue
      </div>
      {addMore ? (
        <Modal
          modal={<NewCar handleAddPopup={setAddMore} />}
          root={document.getElementById("overlay-root") as HTMLElement}
        />
      ) : null}
      {edit ? (
        <Modal
          modal={<EditCar handleEditPopup={setEdit} data={edit} />}
          root={document.getElementById("overlay-root") as HTMLElement}
        />
      ) : null}
    </>
  );
};

export default AddActivitiesPage;
