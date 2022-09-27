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
import EditFlight from "../../TransportationEdit/EditFlight";
import { Pagination } from "../../Pagination";
import { Fetch } from "../../../api/Fetch";

const FlightDetails = ({ nextTab }: any) => {
  const [addMore, setAddMore] = useState(false);
  const [edit, setEdit] = useState(undefined);

  const dispatch = useAppDispatch();

  const { list, page, limit, total, size } = useAppSelector(
    (state: any) => state.transportation.flight
  );
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
          { transportationType: TRANSPORTATION_TYPE.FLIGHT, itineraryRef: _id },
          1,
          10
        )
      );
  };

  const nextPage = () =>
    dispatch(
      Fetch(
        API.TRANSPORTATION_DATA,
        {
          itineraryRef: _id,
        },
        page + 1,
        limit,
        { transportationType: 1 }
      )
    );

  const previousPage = () =>
    dispatch(
      Fetch(
        API.TRANSPORTATION_DATA,
        {
          itineraryRef: _id,
        },
        page - 1,
        limit,
        { transportationType: 1 }
      )
    );

  return (
    <>
      {list.length
        ? Pagination({
            page,
            limit,
            total,
            size,
            nextPage,
            previousPage,
          })
        : null}
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
          {list.length ? (
            list.map((element: any, index: number) => (
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
                  <button
                    className="btn edit-button"
                    onClick={() => setEdit(element)}
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
      </section>
      <span
        className={styles["add-more"]}
        onClick={() => {
          setAddMore(true);
        }}
      >
        + Add Flight Details
      </span>
      <div onClick={() => nextTab(2)} className="continue-button">
        Continue
      </div>
      {addMore ? (
        <Modal
          modal={<NewFlight handleAddPopup={setAddMore} />}
          root={document.getElementById("overlay-root") as HTMLElement}
        />
      ) : null}
      {edit ? (
        <Modal
          modal={<EditFlight handleEditPopup={setEdit} data={edit} />}
          root={document.getElementById("overlay-root") as HTMLElement}
        />
      ) : null}
    </>
  );
};

export default FlightDetails;
