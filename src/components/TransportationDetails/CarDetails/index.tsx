import EditCar from "../../TransportationEdit/EditCar";
import NewCar from "../../TransportationAdd/AddCar";
import { Modal } from "../../../components/Portal";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { Pagination } from "../../Pagination";
import { FaRegEdit } from "react-icons/fa";
import styles from "./index.module.scss";
import { useState } from "react";

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
        <div
          className={`${styles["flightDetails-table"]} ${styles["table-grid"]} itinerary-table-header`}
        >
          <div>Day</div>
          <div>Pickup Location</div>
          <div>Arrival Date</div>
          <div>Arrival Time</div>
          <div>Dropoff Location</div>
          <div>Specialist Note</div>
          <div>Action</div>
        </div>

        {list.length ? (
          list.map((element: any, index: number) => (
            <div
              className={`${styles["flightDetails-table"]} ${styles["table-item"]} ${styles["table-grid"]} itinerary-table-row`}
              key={index}
            >
              <div>{element.day || "NA"}</div>
              <div>{element.depart || "NA"}</div>
              <div>{element.departDate}</div>
              <div>{element.departTime}</div>
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
      </section>
      {status === 1 || status === 2 || status === 4 ? (
        <span
          className="add-more-tickets"
          onClick={() => {
            setAddMore(true);
          }}
        >
          <AiOutlinePlus />
          &nbsp;Add Car Details
        </span>
      ) : null}

      {status === 4 ? (
        <div
          onClick={() => navigate("/itinerary/add/accomodation")}
          className="continue-button"
        >
          Continue
        </div>
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
