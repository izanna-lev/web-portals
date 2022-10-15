/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { getFormattedDate, getFormattedTime } from "../../../util";
import EditFlight from "../../TransportationEdit/EditFlight";
import NewFlight from "../../TransportationAdd/AddFlight";
import { Modal } from "../../../components/Portal";
import { FLIGHT_CLASS } from "../../../constants";
import { MdDeleteOutline } from "react-icons/md";
import { Pagination } from "../../Pagination";
import { FaRegEdit } from "react-icons/fa";
import styles from "./index.module.scss";
import { useState } from "react";

const FlightDetails = (props: any) => {
  const {
    flight,
    deleteTransportation,
    nextPage,
    previousPage,
    nextTab,
    status,
  } = props;
  const { list, page, limit, total, size } = flight;

  const [addMore, setAddMore] = useState(false);
  const [edit, setEdit] = useState(undefined);

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
          <div>Action</div>
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
      {!status ? (
        <>
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
        </>
      ) : null}
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
