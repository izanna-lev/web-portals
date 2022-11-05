/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { getFormattedDate, getFormattedTime } from "../../../util";
import EditCar from "../../TransportationEdit/EditCar";
import NewCar from "../../TransportationAdd/AddCar";
import { Modal } from "../../../components/Portal";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import styles from "./index.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../../Pagination";

const CarDetails = (props: any) => {
  const { deleteTransportation, nextPage, previousPage, car, status } = props;
  const { list, page, limit, total, size } = car;

  const [addMore, setAddMore] = useState(false);
  const [edit, setEdit] = useState(undefined);
  const navigate = useNavigate();

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
      <section className={styles["AddCarsPage"]}>
        <div className={styles["flightDetails-table"]}>
          <div>Day</div>
          <div>Pickup Location</div>
          <div>Arrival Date</div>
          <div>Arrival Time</div>
          <div>Dropoff Location</div>
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
                <div>{element.depart || "NA"}</div>
                <div>{getFormattedDate(element.departDateTime)}</div>
                <div>{getFormattedTime(element.departDateTime)}</div>
                <div>{element.arrival || "NA"}</div>
                <div>{element.specialistNote || "NA"}</div>
                {status === 3 || status === 5 ? (
                  <div></div>
                ) : (
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
                )}
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
            className="add-more-tickets"
            onClick={() => {
              setAddMore(true);
            }}
          >
            + Add Car Details
          </span>

          <div
            onClick={() => navigate("/itinerary/add/accomodation")}
            className="continue-button"
          >
            Continue
          </div>
        </>
      ) : null}
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

export default CarDetails;
