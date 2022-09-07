/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { BsChevronLeft, BsHourglassTop, BsChatRightDots } from "react-icons/bs";
import ItineraryDetail from "./ItineraryDetail/index";
import { useAppSelector } from "../../store/hooks";
import DetailsPage from "./TravelerDetails/index";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  TRAVELER_ITINERARY_DETAILS,
  // API,
} from "../../constants";
import { ITINERARY_STATUS, ICON } from "../../constants";
// import { Fetch } from "../../store/fetch";
import "./index.scss";
// import { useDispatch } from "react-redux";

const ItineraryDetailsPage = () => {
  const [tabSelected, setTabSelected] = useState(
    TRAVELER_ITINERARY_DETAILS.TRAVELER
  );

  const itineraryDetails = useAppSelector(
    (state: any) => state.itineraryDetails
  );

  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const params = useParams();

  // useEffect(() => {
  //   const { itineraryRef } = params;
  //   Fetch(API.ITINERARY_DETAILS, { itineraryRef })(dispatch);
  // }, [params, dispatch]);

  return (
    <main className="content-container">
      <section className="content-top">
        <h2
          className="content-heading"
          onClick={() => navigate("/itineraries")}
          style={{ cursor: "pointer" }}
        >
          <BsChevronLeft />
          <span>Itinerary Details</span>
        </h2>
      </section>

      <section className="tab-group">
        <div
          className={`tab-option ${
            tabSelected === TRAVELER_ITINERARY_DETAILS.TRAVELER
              ? "tab-selected"
              : ""
          }`}
          onClick={() => setTabSelected(TRAVELER_ITINERARY_DETAILS.TRAVELER)}
        >
          Traveller Details
        </div>
        <div
          className={`tab-option ${
            tabSelected === TRAVELER_ITINERARY_DETAILS.ITINERARY
              ? "tab-selected"
              : ""
          }`}
          onClick={() => setTabSelected(TRAVELER_ITINERARY_DETAILS.ITINERARY)}
        >
          Itinerary Details
        </div>
      </section>

      <div className="status-chat">
        <img
          src={
            ICON[
              ITINERARY_STATUS[
                itineraryDetails.itineraryStatus || 4
              ].toUpperCase()
            ]
          }
          alt={ITINERARY_STATUS[itineraryDetails.itineraryStatus || 4]}
          className="time-icon"
        />
        <div className="status-view">
          <div className="status">Status</div>
          <div className="status-text">
            {ITINERARY_STATUS[itineraryDetails.itineraryStatus || 4]}
          </div>
        </div>

        <div className="chat">
          <BsChatRightDots />
          <div>Chat</div>
        </div>
      </div>

      {tabSelected === TRAVELER_ITINERARY_DETAILS.TRAVELER ? (
        <DetailsPage itineraryDetails={itineraryDetails} />
      ) : (
        <ItineraryDetail />
      )}
    </main>
  );
};

export default ItineraryDetailsPage;
