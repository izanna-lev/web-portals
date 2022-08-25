/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable array-callback-return */
/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useState } from "react";
import { Modal } from "../../components/Portal";
import NewFlight from "./NewFlight";
import styles from "./index.module.scss";

type ActivityProps = {
  day: number;
  outbound: string;
  flightClass: string;
  depart: string;
  departDate: Date;
  departTime: Date;
  arrivalTime: Date;
  arrival: string;
  note: string;
};

const AddActivitiesPage = () => {
  const [flightDataList, setflightDataList] = useState<ActivityProps[]>([]);
  const [canAddMore, setAddMore] = useState(false);

  const addObjectToArray = (obj: {
    day: number;
    outbound: string;
    flightClass: string;
    depart: string;
    departDate: Date;
    departTime: Date;
    arrivalTime: Date;
    arrival: string;
    note: string;
  }) => {
    setflightDataList((current) => [...current, obj]);
    setAddMore(false);
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
          {flightDataList.length ? (
            flightDataList.map((element, index) => (
              <div
                className={`${styles["flightDetails-table"]} ${styles["table-item"]}`}
                key={index}
              >
                <div>{element.day || "NA"}</div>
                <div>{element.day || "NA"}</div>
                <div>{element.day || "NA"}</div>
                <div>{element.day || "NA"}</div>
                <div>{element.day || "NA"}</div>
                <div>{element.day || "NA"}</div>
                <div>{element.day || "NA"}</div>
                <div>{element.day || "NA"}</div>
                <div>{element.day || "NA"}</div>
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
            modal={
              <NewFlight cancelAdd={setAddMore} addFlight={addObjectToArray} />
            }
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
