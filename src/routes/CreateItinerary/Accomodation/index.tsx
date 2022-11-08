/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import AddEditAccomodation from "../../../components/ReservationForms/AddEditAccomodation";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getFormattedDate, getFormattedTime } from "../../../util";
import { API, IMAGE, RESERVATION_TYPE } from "../../../constants";
import { Pagination } from "../../../components/Pagination";
import { DeleteEntity } from "../../../api/Delete";
import { Modal } from "../../../components/Portal";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Fetch } from "../../../api/Fetch";
import { FaRegEdit } from "react-icons/fa";
import styles from "./index.module.scss";
import { AiOutlinePlus } from "react-icons/ai";

const AccomodationDetails = ({ status }: { status?: number }) => {
  const [addMore, setAddMore] = useState(false);
  const [edit, setEdit] = useState(undefined);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { _id } = useAppSelector((state) => state.itinerary.itineraryDetails);

  useEffect(() => {
    dispatch(
      Fetch(API.RESERVATION_LIST, { itineraryRef: _id }, 1, 10, {
        reservationType: RESERVATION_TYPE.ACCOMMODATION,
      })
    );
  }, [dispatch, _id]);

  const nextPage = () =>
    dispatch(
      Fetch(API.RESERVATION_LIST, { itineraryRef: _id }, page + 1, limit, {
        reservationType: RESERVATION_TYPE.ACCOMMODATION,
      })
    );

  const previousPage = () =>
    dispatch(
      Fetch(API.RESERVATION_LIST, { itineraryRef: _id }, page - 1, limit, {
        reservationType: RESERVATION_TYPE.ACCOMMODATION,
      })
    );

  const { list, page, limit, total, size } = useAppSelector(
    (state) => state.itinerary.accomodation
  );

  const deleteReservation = (reservationRef: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this reservation?"
    );
    if (confirmDelete)
      dispatch(
        DeleteEntity(
          API.RESERVATION_DELETE,
          { reservationRef },
          API.RESERVATION_LIST,
          {
            reservationType: RESERVATION_TYPE.ACCOMMODATION,
            itineraryRef: _id,
          },
          page,
          limit
        )
      );
  };

  return (
    <>
      {/* {list.length
        ? Pagination({
            page,
            limit,
            total,
            size,
            nextPage,
            previousPage,
          })
        : null} */}
      <section className="itinerary-details-container">
        <div className={styles["AddFlightsPage"]}>
          <div
            className={`${styles["flightDetails-table"]} ${styles["table-grid"]} itinerary-table-header`}
          >
            <div>Day</div>
            <div>Image</div>
            <div>Title</div>
            <div>Location</div>
            <div>Contact Number</div>
            <div>Check In Time</div>
            <div>Check In Date</div>
            <div>Check Out Time</div>
            <div>Check Out Date</div>
            <div>Description</div>
            <div>Action</div>
          </div>

          {list.length ? (
            list.map((element: any, index: number) => (
              <div
                className={`${styles["flightDetails-table"]} ${styles["table-item"]} ${styles["table-grid"]} itinerary-table-row`}
                key={index}
              >
                <div>{element.day || "NA"}</div>
                <div>
                  <img
                    className="itineraryImage"
                    src={`${IMAGE.SMALL}${element.image}`}
                    alt={element.name}
                  />
                </div>
                <div>{element.name}</div>
                <div>{element.location.location || "NA"}</div>
                <div>
                  {element.contactNumber ? (
                    <a href={`tel:+${element.contactNumber}`}>
                      {element.phoneCode}{`${element.phoneCode ? "-" : ""}`}{element.contactNumber}
                    </a>
                  ) : (
                    "NA"
                  )}
                </div>
                <div>{getFormattedTime(element.checkInDateTime)}</div>
                <div>{getFormattedDate(element.checkInDateTime)}</div>
                <div>{getFormattedTime(element.checkOutDateTime)}</div>
                <div>{getFormattedDate(element.checkOutDateTime)}</div>
                <div>{element.description || "NA"}</div>
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
                      onClick={() => deleteReservation(element._id)}
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
      {status !== 4 ? null : (
        <>
          <span className="add-more-tickets" onClick={() => setAddMore(true)}>
            <AiOutlinePlus />
            &nbsp;Add Days
          </span>
          <div
            onClick={() => navigate("/itinerary/add/restaurant")}
            className="continue-button"
          >
            Continue
          </div>
        </>
      )}
      {addMore ? (
        <Modal
          modal={<AddEditAccomodation handleAddPopup={setAddMore} />}
          root={document.getElementById("overlay-root") as HTMLElement}
        />
      ) : null}
      {edit ? (
        <Modal
          modal={<AddEditAccomodation handleAddPopup={setEdit} data={edit} />}
          root={document.getElementById("overlay-root") as HTMLElement}
        />
      ) : null}
    </>
  );
};

export default AccomodationDetails;
