/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { getFormattedDate, getFormattedTime } from "../../../util";
import EditFerry from "../../TransportationEdit/EditFerry";
import NewFerry from "../../TransportationAdd/AddFerry";
import { Modal } from "../../../components/Portal";
import { MdDeleteOutline } from "react-icons/md";
import { FERRY_CLASS } from "../../../constants";
import { Pagination } from "../../Pagination";
import { FaRegEdit } from "react-icons/fa";
import styles from "./index.module.scss";
import { useState } from "react";

const FerryDetails = (props: any) => {
  const {
    deleteTransportation,
    nextPage,
    previousPage,
    nextTab,
    ferry,
    status,
  } = props;
  const { list, page, limit, total, size } = ferry;

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
      <section className={styles["AddTrainsPage"]}>
        <div className={styles["flightDetails-table"]}>
          <div>Day</div>
          <div>Arrival Station</div>
          <div>Ferry Class</div>
          <div>Arrival Date</div>
          <div>Arrival Time</div>
          <div>Depart Station</div>
          <div>Depart Time</div>
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
                <div>{element.arrival || "NA"}</div>
                <div>{FERRY_CLASS[element.trainClass - 1 || 0].name}</div>
                <div>{getFormattedDate(element.arrivalDateTime)}</div>
                <div>{getFormattedDate(element.arrivalDateTime)}</div>
                <div>{element.depart || "NA"}</div>
                <div>{getFormattedTime(element.departDateTime)}</div>
                <div>{element.specialistNote || "NA"}</div>
                <div className="add-activity-buttons">
                  {status === 3 || status === 5 ? null : (
                    <button
                      className="btn edit-button"
                      onClick={() => setEdit(element)}
                    >
                      <FaRegEdit />
                      &nbsp;<span>Edit</span>
                    </button>
                  )}
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
      {status === 4 ? (
        <>
          <span
            className={styles["add-more"]}
            onClick={() => {
              setAddMore(true);
            }}
          >
            + Add Ferry Details
          </span>
          <div onClick={() => nextTab(4)} className="continue-button">
            Continue
          </div>
        </>
      ) : null}
      {addMore ? (
        <Modal
          modal={<NewFerry handleAddPopup={setAddMore} />}
          root={document.getElementById("overlay-root") as HTMLElement}
        />
      ) : null}
      {edit ? (
        <Modal
          modal={<EditFerry handleEditPopup={setEdit} data={edit} />}
          root={document.getElementById("overlay-root") as HTMLElement}
        />
      ) : null}
    </>
  );
};

export default FerryDetails;
