/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsChatRightDots } from "react-icons/bs";
import dayjs from "dayjs";

import { API } from "../../constants";
import { Modal } from "../../components/Portal";

import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { Pagination } from "../../components/Pagination";
import { SerialNum } from "../../util";
import { Fetch } from "../../api/Fetch";
import { DeleteEntity } from "../../api/Delete";
import "./index.scss";
import Popup from "../../components/Popup";
import { UserIcon } from "../../components/UserIcon";

const TableHead = () => (
  <thead className="table-head">
    <tr className="head-tr">
      <th>Sr.No.</th>
      <th>Itinerary Name</th>
      <th>User Name</th>
      <th>No. of guests</th>
      <th>Assigned Date</th>
      <th className="custom-head">Actions</th>
    </tr>
  </thead>
);

const TableRow = (
  item: any,
  index: number,
  limit: number,
  page: number,
  navigate: any,
  dispatch: any,
  popupUpdate: any
) => {
  return (
    <tr className="body-tr" key={index}>
      <td>{SerialNum(limit, page, index)}</td>
      <td>
        <div className="name-image-cell">
          <UserIcon image={item.image} />
          <span className="access-management">{item.name}</span>
        </div>
      </td>
      <td>
        <div className="access-management-user">
          <span className="access-management text">{item.email}</span>
          <span className="access-management text">{item.phoneNumber}</span>
        </div>
      </td>
      <td>{item.guests || 0}</td>
      <td>{dayjs(item.assignedDate).format("DD-MMM-YYYY")}</td>
      <td className="specialist-actions">
        <button
          className={`btn view-button chat-specialist ${
            item.cancelled ? "cancelled-itinerary" : ""
          } `}
          onClick={() => {
            navigate(`/chat/${item.channelRef}`, {
              state: {
                id: item._id,
                name: item.name,
                email: item.email,
                phoneNumber: item.phoneNumber,
                permissions: item.permissions,
                image: item.image,
              },
            });
          }}
        >
          <BsChatRightDots />
          Chat
        </button>
        <button
          className={`btn view-button cancel-itinerary ${
            item.cancelled ? "cancelled-itinerary" : ""
          } `}
          onClick={() => popupUpdate(true, item._id)}
        >
          {item.cancelled ? "Cancelled" : "Cancel Itinerary"}
        </button>
      </td>
    </tr>
  );
};

const CancelItinerary = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { page, limit, size, total, list } = useAppSelector(
    (state) => state.cancelItineraryList
  );
  const [popup, setPopup] = useState({
    id: "",
    show: false,
  });

  const popupUpdate = (show: boolean, id: string) => {
    setPopup({ ...popup, show, id });
  };

  const cancel = () => {
    setPopup({ ...popup, show: false, id: "" });
  };

  const cancelItinerary = () => {
    dispatch(
      DeleteEntity(
        API.ITINERARY_CANCEL,
        { itineraryRef: popup.id },
        API.ITINERARY_CANCEL_REQUESTS
      )
    );
    cancel();
    // window.location.reload();
  };

  useEffect(() => {
    dispatch(Fetch(API.ITINERARY_CANCEL_REQUESTS, {}, 1, 10));
  }, [dispatch]);

  return (
    <main className="content-container">
      <section className="content-top">
        <h2 className="content-heading">Cancel Requests</h2>
      </section>
      {list.length
        ? Pagination({
            page,
            limit,
            total,
            size,
            nextPage: () =>
              dispatch(
                Fetch(API.ITINERARY_CANCEL_REQUESTS, {}, page + 1, limit)
              ),
            previousPage: () =>
              dispatch(
                Fetch(API.ITINERARY_CANCEL_REQUESTS, {}, page - 1, limit)
              ),
          })
        : null}
      <section className="table-container">
        <table className="itinerary-table table">
          {TableHead()}
          <tbody className="body-tr">
            {list.length ? (
              list.map((item, index) =>
                TableRow(
                  item,
                  index,
                  limit,
                  page,
                  navigate,
                  dispatch,
                  popupUpdate
                )
              )
            ) : (
              <tr className="table-empty">
                <td colSpan={7}>
                  <div>No Data</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      {popup.show && (
        <Modal
          modal={
            <Popup
              heading="Cancel Itinerary"
              text="Are you sure you want to cancel this itinerary. This can`t be undone"
              firstButtonText="Ok"
              secondButtonText="Cancel"
              firstButtonAction={cancelItinerary}
              secondButtonAction={cancel}
            />
          }
          root={document.getElementById("overlay-root") as HTMLElement}
        />
      )}
    </main>
  );
};

export default CancelItinerary;
