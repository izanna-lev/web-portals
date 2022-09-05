/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { BsChevronLeft, BsHourglassTop, BsChatRightDots } from "react-icons/bs";
import ItineraryDetail from "./ItineraryDetail/index";
import { useAppSelector } from "../../store/hooks";
import DetailsPage from "./TravelerDetails/index";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { TRAVELER_ITINERARY_DETAILS } from "../../constants";
import { ITINERARY_STATUS } from "../../constants";
import "./index.scss";

const ItineraryDetailsPage = () => {
  const [getDetail, setDetail] = useState(TRAVELER_ITINERARY_DETAILS.TRAVELER);
  const details = useAppSelector((state) => state.itineraryDetails.data);
  const navigate = useNavigate();
  return (
    <section className="itineraryDetailPage" id="itineraryDetailPage">
      <div
        className="heading"
        onClick={() => navigate("/itineraries")}
        style={{ cursor: "pointer" }}
      >
        <BsChevronLeft />
        <span className="heading-text">Itinerary Details</span>
      </div>

      <div className="button">
        <div
          className={`button-text ${
            getDetail === TRAVELER_ITINERARY_DETAILS.TRAVELER ? "selected" : ""
          }`}
          onClick={() => setDetail(TRAVELER_ITINERARY_DETAILS.TRAVELER)}
        >
          Travler Details
        </div>
        <div
          className={`button-text ${
            getDetail === TRAVELER_ITINERARY_DETAILS.ITINERARY ? "selected" : ""
          }`}
          onClick={() => setDetail(TRAVELER_ITINERARY_DETAILS.ITINERARY)}
        >
          Itinerary Details
        </div>
      </div>

      <div className="status-chat">
        <BsHourglassTop className="time-icon" />
        <div className="status-view">
          <div className="status">Status</div>
          <div className="status-text">
            {ITINERARY_STATUS[details.itineraryStatus || 4]}
          </div>
        </div>

        <div className="chat">
          <BsChatRightDots />
          <div>Chat</div>
        </div>
      </div>

      {getDetail === TRAVELER_ITINERARY_DETAILS.TRAVELER ? (
        <DetailsPage details={details} />
      ) : (
        <ItineraryDetail />
      )}
    </section>
  );
};

export default ItineraryDetailsPage;
