/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Pagination } from "../../../components/Pagination";
import AddEditNote from "../../../components/AddEditNote";
import { DeleteEntity } from "../../../api/Delete";
import { MdDeleteOutline } from "react-icons/md";
import { API, IMAGE } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { Fetch } from "../../../api/Fetch";
import "./index.scss";
import { EDIT_NOTES } from "../../../store/slices/itinerary";
import {
  editListItem,
  getFormattedDate,
  getFormattedTime,
} from "../../../util";

const NotesDetails = () => {
  const [addMore, setAddMore] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { list, page, limit, total, size } = useAppSelector(
    (state) => state.itinerary.notes
  );

  const { _id } = useAppSelector((state) => state.itinerary.itineraryDetails);

  const editNote = (id: any = "") =>
    editListItem(dispatch, list, EDIT_NOTES, id);

  const fetchData = useCallback(
    (page: number = 1, limit: number = 10) =>
      dispatch(Fetch(API.NOTES_LIST, { itineraryRef: _id }, page, limit, {})),
    [_id, dispatch]
  );

  useEffect(() => {
    fetchData(1, 10);
  }, [fetchData]);

  const nextPage = () => fetchData(page + 1, limit);
  const previousPage = () => fetchData(page - 1, limit);

  const deleteNote = (noteRef: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this reservation?"
    );
    if (confirmDelete)
      dispatch(
        DeleteEntity(
          API.NOTE_DELETE,
          { noteRef },
          API.NOTES_LIST,
          { itineraryRef: _id },
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
        <div className="AddNotesPage">
          <div className="add-notes">
            <div>Day</div>
            <div>Image</div>
            <div>Description</div>
            <div>Action</div>
          </div>

          <div className="forms">
            {addMore ? <AddEditNote handleAddEdit={setAddMore} /> : null}
            {list.length ? (
              list.map((element: any, index: number) => {
                return element.edit ? (
                  <AddEditNote handleAddEdit={editNote} data={element} />
                ) : (
                  <div className={`add-notes table-item`} key={index}>
                    <div>{element.day}</div>
                    <div>
                      <img
                        className="itineraryImage"
                        src={`${IMAGE.SMALL}${element.image}`}
                        alt={element.name}
                      />
                    </div>
                    <div>{element.description}</div>
                    <div className="add-activity-buttons">
                      <button
                        className="btn edit-button"
                        onClick={() => editNote(element._id)}
                      >
                        <FaRegEdit />
                        &nbsp;<span>Edit</span>
                      </button>
                      <button
                        className="btn delete-button"
                        onClick={() => deleteNote(element._id)}
                      >
                        <MdDeleteOutline />
                        &nbsp;<span>Delete</span>
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={`empty-table table-item`}>Nothing Added</div>
            )}
          </div>
        </div>
      </section>
      <span
        className="add-more"
        onClick={() => {
          setAddMore(true);
        }}
      >
        + Add More
      </span>
      <div
        onClick={() => navigate("/itinerary/add/summary")}
        className="continue-button"
      >
        Continue
      </div>
    </>
  );
};

export default NotesDetails;
