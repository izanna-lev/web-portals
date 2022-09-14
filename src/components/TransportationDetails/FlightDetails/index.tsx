/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable array-callback-return */
/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { API, FLIGHT_CLASS, TRANSPORTATION_TYPE } from "../../../constants";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getFormattedDate, getFormattedTime } from "../../../util";
import NewFlight from "../../TransportationAdd/AddFlight";
import { DeleteEntity } from "../../../api/Delete";
import { Modal } from "../../../components/Portal";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import styles from "./index.module.scss";
import { useState } from "react";

const AddActivitiesPage = () => {
  const [canAddMore, setAddMore] = useState(false);
  const flightList = useAppSelector(
    (state: any) => state.transportation.flight
  );
  const { _id } = useAppSelector(
    (state) => state.itineraryData.itineraryDetails
  );
  const dispatch = useAppDispatch();

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
          { transportationType: TRANSPORTATION_TYPE.FLIGHT, itineraryRef: _id },
          1,
          10
        )
      );
  };

  return (
    <>
      <section className={styles["AddFlightsPage"]}>
        <div className={styles["flightDetails-table"]}>
          <div>Day</div>
          <div>Outbound</div>
          <div>Flight Class</div>
          <div>Depart</div>
          <div>Depart Date</div>
          <div>Depart Time</div>
          <div>Arrival</div>
          <div>Arrival Time</div>
          <div>Specialist Note</div>
          <div>Actions</div>
        </div>

        <div className={styles["forms"]}>
          {flightList.list?.length ? (
            flightList.list.map((element: any, index: number) => (
              <div
                className={`${styles["flightDetails-table"]} ${styles["table-item"]}`}
                key={index}
              >
                <div>{element.day || "NA"}</div>
                <div>{element.airline || "NA"}</div>
                <div>{FLIGHT_CLASS[element.flightClass - 1 || 0].name}</div>
                <div>{element.depart || "NA"}</div>
                <div>{getFormattedDate(element.departDateTime)}</div>
                <div>{getFormattedTime(element.departDateTime)}</div>
                <div>{element.arrival || "NA"}</div>
                <div>{getFormattedTime(element.arrivalDateTime)}</div>
                <div>{element.specialistNote || "NA"}</div>
                <div className="add-activity-buttons">
                  <button className="btn edit-button">
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
          + Add Flight Details
        </div>

        {canAddMore ? (
          <Modal
            modal={<NewFlight closePopup={setAddMore} />}
            root={document.getElementById("overlay-root") as HTMLElement}
          />
        ) : null}
      </section>

      <div
        onClick={() => console.log("continue")}
        className={styles["continue-button"]}
      >
        Continue
      </div>
    </>
  );
};

export default AddActivitiesPage;
