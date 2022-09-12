/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable array-callback-return */
/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useAppSelector } from "../../store/hooks";
import { MdDeleteOutline } from "react-icons/md";
import { Modal } from "../../components/Portal";
import { FaRegEdit } from "react-icons/fa";
import styles from "./index.module.scss";
import NewFlight from "./NewFlight";
import { useState } from "react";

const AddActivitiesPage = () => {
  const [canAddMore, setAddMore] = useState(false);
  const flightList = useAppSelector(
    (state: any) => state.transportation.flight
  );

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
                <div>{element.flightClass || "NA"}</div>
                <div>{element.depart || "NA"}</div>
                <div>{element.departDate || "NA"}</div>
                <div>{element.departTime || "NA"}</div>
                <div>{element.arrival || "NA"}</div>
                <div>{element.arrivalTime || "NA"}</div>
                <div>{element.specialistNote || "NA"}</div>
                <div className="action-buttons">
                  <button className="edit-button">
                    <FaRegEdit />
                    &nbsp;<span>Edit</span>
                  </button>
                  <button className="delete-button">
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
            modal={<NewFlight cancelAdd={setAddMore} />}
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
