/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable array-callback-return */
/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useAppSelector } from "../../store/hooks";
import { Modal } from "../../components/Portal";
import styles from "./index.module.scss";
import NewFerry from "./NewFerry";
import { useState } from "react";

const AddActivitiesPage = () => {
  const ferryList = useAppSelector((state: any) => state.transportation.ferry);
  const [canAddMore, setAddMore] = useState(false);

  return (
    <>
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
          <div>Actions</div>
        </div>

        <div className={styles["forms"]}>
          {ferryList.length ? (
            ferryList.map((element: any, index: number) => (
              <div
                className={`${styles["flightDetails-table"]} ${styles["table-item"]}`}
                key={index}
              >
                <div>{element.day || "NA"}</div>
                <div>{element.arrival || "NA"}</div>
                <div>{element.ferryClass || "NA"}</div>
                <div>{element.arrivalDate || "NA"}</div>
                <div>{element.arrivalTime || "NA"}</div>
                <div>{element.depart || "NA"}</div>
                <div>{element.departTime || "NA"}</div>
                <div>{element.specialistNote || "NA"}</div>
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
          + Add Ferry Details
        </div>

        {canAddMore ? (
          <Modal
            modal={<NewFerry cancelAdd={setAddMore} />}
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
