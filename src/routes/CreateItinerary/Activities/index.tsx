import AddEditActivity from "../../../components/ReservationForms/AddEditActivity";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { API, IMAGE, RESERVATION_TYPE } from "../../../constants";
import { EDIT_ACTIVITY } from "../../../store/slices/itinerary";
import { Pagination } from "../../../components/Pagination";
import { useCallback, useEffect, useState } from "react";
import { DeleteEntity } from "../../../api/Delete";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { editListItem } from "../../../util";
import { Fetch } from "../../../api/Fetch";
import { FaRegEdit } from "react-icons/fa";
import "./index.scss";

const ActivityDetails = ({ status }: { status?: number }) => {
  const [addMore, setAddMore] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { _id } = useAppSelector((state) => state.itinerary.itineraryDetails);

  const { list, page, limit, total, size } = useAppSelector(
    (state) => state.itinerary.activity
  );

  const editActivity = (id: any = "") =>
    editListItem(dispatch, list, EDIT_ACTIVITY, id);

  const fetchData = useCallback(
    (page = 1, limit = 10) => {
      dispatch(
        Fetch(API.RESERVATION_LIST, { itineraryRef: _id }, page, limit, {
          reservationType: RESERVATION_TYPE.ACTIVITY,
        })
      );
    },
    [_id, dispatch]
  );

  useEffect(() => {
    fetchData(1, 10);
  }, [fetchData]);

  const nextPage = () => fetchData(page + 1, limit);
  const previousPage = () => fetchData(page - 1, limit);

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
            reservationType: RESERVATION_TYPE.ACTIVITY,
            itineraryRef: _id,
          },
          page,
          limit
        )
      );
  };

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
      <section className="itinerary-details-container">
        <div className="AddActivitiesPage">
          <div className="add-activities activities-grid itinerary-table-header">
            <div>Day</div>
            <div>Image</div>
            <div>Title</div>
            <div>Time</div>
            <div>Date</div>
            <div>Location</div>
            <div>Note</div>
            <div>Action</div>
          </div>

          <div className="forms">
            {addMore ? <AddEditActivity handleAddEdit={setAddMore} /> : null}
            {list.length ? (
              list.map((element: any, index: number) => {
                return element.edit ? (
                  <AddEditActivity
                    handleAddEdit={editActivity}
                    data={element}
                  />
                ) : (
                  <div
                    className={`add-activities table-item itinerary-table-row activities-grid`}
                    key={index}
                  >
                    <div>{element.day}</div>
                    <div>
                      <img
                        className="itineraryImage"
                        src={`${IMAGE.SMALL}${element.image}`}
                        alt={element.name}
                      />
                    </div>
                    <div>{element.name}</div>
                    <div>{element.time}</div>
                    <div>{element.date}</div>
                    <div>{element.location?.location}</div>
                    <div>{element.description}</div>
                    {status === 3 || status === 5 ? (
                      <div></div>
                    ) : (
                      <div className="add-activity-buttons">
                        <button
                          className="btn edit-button"
                          onClick={() => editActivity(element._id)}
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
                );
              })
            ) : (
              <div className={`empty-table table-item`}>Nothing Added</div>
            )}
          </div>
        </div>
      </section>
      {status === 1 || status === 2 || status === 4 ? (
        <span
          className="add-more-tickets"
          onClick={() => {
            setAddMore(true);
          }}
        >
          <AiOutlinePlus />
          &nbsp;Add More
        </span>
      ) : null}

      {status === 4 ? (
        <div
          onClick={() => navigate("/itinerary/add/note")}
          className="continue-button"
        >
          Continue
        </div>
      ) : null}
    </>
  );
};

export default ActivityDetails;
