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
import { useState } from "react";
import NewCar from "./NewCar";

const AddActivitiesPage = () => {
  const [canAddMore, setAddMore] = useState(false);
  const carDataList = useAppSelector((state: any) => state.transportation.car);

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
          {carDataList.length ? (
            carDataList.map((element: any, index: number) => (
              <div
                className={`${styles["flightDetails-table"]} ${styles["table-item"]}`}
                key={index}
              >
                <div>{element.day || "NA"}</div>
                <div>{element.pickup || "NA"}</div>
                <div>{element.arrivalDate || "NA"}</div>
                <div>{element.arrivalTime || "NA"}</div>
                <div>{element.dropOff || "NA"}</div>
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
          + Add Car Details
        </div>

        {canAddMore ? (
          <Modal
            modal={<NewCar cancelAdd={setAddMore} />}
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
