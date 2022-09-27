/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import moment from "moment";

import {
  IMAGE,
  ITINERARY_STATUS,
  ICON,
  API,
  PLANNED_TRAVELLER,
} from "../../constants";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setFormRef } from "../../store/slices/appData";
import { Pagination } from "../../components/Pagination";
import { getFormattedDate, SerialNum } from "../../util";
import { Fetch } from "../../api/Fetch";
import "./index.scss";

const TableHead = () => (
  <thead className="table-head">
    <tr className="head-tr">
      <th>Sr.No.</th>
      <th>Name</th>
      <th>User Name</th>
      <th>Email</th>
      <th>Planned Date</th>
      <th className="custom-head">How much have you already planned?</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
);

const TableRow = (
  item: any,
  index: number,
  limit: number,
  page: number,
  navigate: any,
  dispatch: any
) => {
  const itineraryDetailsPage = (item: any) => {
    dispatch(setFormRef(item._id));
    navigate(`/itinerary/detail/${item._id}`);
  };

  return (
    <tr className="body-tr" key={index}>
      <td>{SerialNum(limit, page, index)}</td>
      <td>
        <div className="name-image-cell">
          <img
            className="user-image"
            src={IMAGE.SMALL + item.image}
            alt={item.name}
            onError={(e: any) => {
              e.target.src = ICON.USER_PLACEHOLDER;
            }}
          />
          <span className="table-user-name">{item.location}</span>
        </div>
      </td>
      <td>{item.userName}</td>
      <td>
        {item.travellerEmail ? (
          <a href={`mailto:${item.travellerEmail}`}>{item.travellerEmail}</a>
        ) : (
          "NA"
        )}
      </td>
      <td>{getFormattedDate(item.plannedDate)}</td>
      <td>{PLANNED_TRAVELLER[item.plannedTraveller - 1 || 0].name}</td>
      <td>
        <div className="table-data-status">
          {ITINERARY_STATUS[item.itineraryStatus]}
        </div>
      </td>
      <td>
        <button
          className=" btn view-button"
          onClick={() => {
            itineraryDetailsPage(item);
          }}
        >
          View Details
        </button>
      </td>
    </tr>
  );
};

const ItineraryPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { page, limit, size, total, list } = useAppSelector(
    (state) => state.itineraries
  );

  useEffect(() => {
    dispatch(Fetch(API.ITINERARIES, {}, 1, 10));
  }, [dispatch]);

  return (
    <main className="content-container">
      <section className="content-top">
        <h2 className="content-heading">Assigned Itineraries</h2>
      </section>
      {list.length
        ? Pagination({
            page,
            limit,
            total,
            size,
            nextPage: () =>
              dispatch(Fetch(API.ITINERARIES, {}, page + 1, limit)),
            previousPage: () =>
              dispatch(Fetch(API.ITINERARIES, {}, page - 1, limit)),
          })
        : null}
      <section className="table-container">
        <table className="itinerary-table table">
          {TableHead()}
          <tbody className="body-tr">
            {list.length ? (
              list.map((item, index) =>
                TableRow(item, index, limit, page, navigate, dispatch)
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
    </main>
  );
};

export default ItineraryPage;
