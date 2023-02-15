/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import SubmitPopup from "../../../components/SubmitItnineraryPopup";
import { Pagination } from "../../../components/Pagination";
import { useCallback, useEffect, useState } from "react";
import { Modal } from "../../../components/Portal";
import { API, IMAGE } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { Create } from "../../../api/Create";
import { Fetch } from "../../../api/Fetch";
import "./index.scss";

const TripSummary = ({ status }: { status?: number }) => {
  const [isItinerarySubmitted, setisItinerarySubmitted] = useState(false);
  const [submitPopup, setSubmitPopup] = useState(false);
  const [dayFilter, setdayFilter] = useState("1");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    days,
    trip: { list, page, limit, total, size },
  } = useAppSelector((state) => state.itinerary);

  const { _id, itineraryStatus } = useAppSelector(
    (state) => state.itinerary.itineraryDetails
  );

  const { formRef } = useAppSelector((state) => state.appData);
  const { type } = useAppSelector((state) => state.apiMessage);

  const fetchData = useCallback(
    (endpoint: string, page = 1, limit = 10, dayFilter = 1) =>
      dispatch(
        Fetch(endpoint, { itineraryRef: _id, dayFilter }, page, limit, {})
      ),
    [_id, dispatch]
  );

  const submitItinerary = () => {
    dispatch(
      Create(
        API.SUBMIT_ITINERARY,
        { itineraryRef: _id },
        false,
        null,
        API.ITINERARIES
      )
    );
    setSubmitPopup(false);
    setisItinerarySubmitted(true);
  };

  useEffect(() => {
    if (type === "success") {
      setSubmitPopup(true);
    }
  }, [type]);

  useEffect(() => {
    itineraryStatus === 4 && fetchData(API.DAYS_LIST);
  }, [fetchData, itineraryStatus]);

  useEffect(() => {
    itineraryStatus === 4 && fetchData(API.TRIP_LIST, 1, 10, Number(dayFilter));
  }, [fetchData, dayFilter, itineraryStatus]);

  const nextPage = () =>
    fetchData(API.TRIP_LIST, page + 1, limit, Number(dayFilter));
  const previousPage = () =>
    fetchData(API.TRIP_LIST, page - 1, limit, Number(dayFilter));

  return (
    <>
      {itineraryStatus === 4 ? (
        <div className="days-dropdown">
          <div className="feild-heading">Select Day</div>
          <select
            className="field-value"
            onChange={(e) => setdayFilter(e.target.value)}
          >
            {days.list?.map((element: any, index: number) => (
              <option value={element} key={index}>
                Day {element}
              </option>
            ))}
          </select>
        </div>
      ) : null}

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
        <div className="TripSummaryPage">
          <div className="add-trip trip-grid itinerary-table-header">
            <div>Image</div>
            <div>Title</div>
            <div>Time</div>
            <div>Date</div>
            <div>Description</div>
          </div>

          {list.length ? (
            list.map((element: any, index: number) => (
              <div
                className={`add-trip table-item trip-grid itinerary-table-row`}
                key={index}
              >
                <div>
                  <img
                    className="itineraryImage"
                    src={`${IMAGE.SMALL}${element.image}`}
                    alt={element.name}
                  />
                </div>
                <div>{element.title}</div>
                <div>{element.time || "NA"}</div>
                <div>{element.date || "NA"}</div>
                <div>{element.description}</div>
              </div>
            ))
          ) : (
            <div className={`empty-table table-item`}>Nothing Added</div>
          )}
        </div>
      </section>

      {status !== 4 ? null : (
        <div onClick={() => submitItinerary()} className="continue-button">
          Submit Itinerary
        </div>
      )}
      {isItinerarySubmitted && submitPopup ? (
        <Modal
          modal={<SubmitPopup navigate={navigate} location={formRef} />}
          root={document.getElementById("overlay-root") as HTMLElement}
        />
      ) : null}
    </>
  );
};

export default TripSummary;
