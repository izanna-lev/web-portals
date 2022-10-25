/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getFormattedDate, getFormattedTime } from "../../../util";
import SubmitPopup from "../../../components/SubmitItnineraryPopup";
import { Pagination } from "../../../components/Pagination";
import { useCallback, useEffect, useState } from "react";
import { API, IMAGE } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { Create } from "../../../api/Create";
import { Fetch } from "../../../api/Fetch";
import "./index.scss";
import { Modal } from "../../../components/Portal";

const TripSummary = ({ status }: { status?: number }) => {
  const [dayFilter, setdayFilter] = useState("1");
  const [submitPopup, setSubmitPopup] = useState(false);
  const [isItinerarySubmitted, setisItinerarySubmitted] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    days,
    trip: { list, page, limit, total, size },
  } = useAppSelector((state) => state.itinerary);
  const { _id } = useAppSelector((state) => state.itinerary.itineraryDetails);
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
    fetchData(API.TRIP_LIST, 1, 10, Number(dayFilter));
    fetchData(API.DAYS_LIST);
  }, [fetchData, dayFilter]);

  const nextPage = () =>
    fetchData(API.TRIP_LIST, page + 1, limit, Number(dayFilter));
  const previousPage = () =>
    fetchData(API.TRIP_LIST, page - 1, limit, Number(dayFilter));

  return (
    <>
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
          <div className="add-trip">
            <div>Image</div>
            <div>Title</div>
            <div>Time</div>
            <div>Date</div>
            <div>Description</div>
          </div>

          <div className="forms">
            {list.length ? (
              list.map((element: any, index: number) => (
                <div className={`add-trip table-item`} key={index}>
                  <div>
                    <img
                      className="itineraryImage"
                      src={`${IMAGE.SMALL}${element.image}`}
                      alt={element.name}
                    />
                  </div>
                  <div>{element.title}</div>
                  <div>{element.dateTime ? getFormattedTime(element.dateTime): "NA"}</div>
                  <div>{element.dateTime ? getFormattedDate(element.dateTime): "NA"}</div>
                  <div>{element.description}</div>
                </div>
              ))
            ) : (
              <div className={`empty-table table-item`}>Nothing Added</div>
            )}
          </div>
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
