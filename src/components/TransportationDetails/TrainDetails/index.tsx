import EditTrain from "../../TransportationEdit/EditTrain";
import NewTrain from "../../TransportationAdd/AddTrain";
import { Modal } from "../../../components/Portal";
import { TRAIN_CLASS } from "../../../constants";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { Pagination } from "../../Pagination";
import { FaRegEdit } from "react-icons/fa";
import styles from "./index.module.scss";
import { useState } from "react";

const TrainDetails = (props: any) => {
  const {
    train,
    deleteTransportation,
    nextPage,
    previousPage,
    nextTab,
    status,
  } = props;
  const { list, page, limit, total, size } = train;

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
        <div
          className={`${styles["flightDetails-table"]} ${styles["table-grid"]} itinerary-table-header`}
        >
          <div>Day</div>
          <div>Arrival Station</div>
          <div>Train Class</div>
          <div>Arrival Date</div>
          <div>Arrival Time</div>
          <div>Depart Station</div>
          <div>Depart Time</div>
          <div>Specialist Note</div>
          <div>Action</div>
        </div>

        {list.length ? (
          list.map((element: any, index: number) => (
            <div
              key={index}
              className={`${styles["flightDetails-table"]} ${styles["table-item"]} ${styles["table-grid"]} itinerary-table-row`}
            >
              <div>{element.day || "NA"}</div>
              <div>{element.arrival || "NA"}</div>
              <div>{TRAIN_CLASS[element.trainClass - 1 || 0].name}</div>
              <div>{element.arrivalDate}</div>
              <div>{element.arrivalTime}</div>
              <div>{element.depart || "NA"}</div>
              <div>{element.departTime}</div>
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
          &nbsp;Add Train Details
        </span>
      ) : null}

      {status === 4 ? (
        <div onClick={() => nextTab(3)} className="continue-button">
          Continue
        </div>
      ) : null}

      {addMore ? (
        <Modal
          modal={<NewTrain handleAddPopup={setAddMore} />}
          root={document.getElementById("overlay-root") as HTMLElement}
        />
      ) : null}
      {edit ? (
        <Modal
          modal={<EditTrain handleEditPopup={setEdit} data={edit} />}
          root={document.getElementById("overlay-root") as HTMLElement}
        />
      ) : null}
    </>
  );
};

export default TrainDetails;
