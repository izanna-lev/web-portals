/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import {
  TRAVELER_ITINERARY_DETAILS,
  ITINERARY_STATUS,
  ICON,
  API,
} from "../../constants";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { BsChevronLeft, BsChatRightDots } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import ItineraryDetail from "./ItineraryDetail/index";
import DetailsPage from "./TravelerDetails/index";
import { useEffect, useState } from "react";
import { Fetch } from "../../api/Fetch";
import "./index.scss";

const ItineraryDetailsPage = () => {
  const [tabSelected, setTabSelected] = useState(
    TRAVELER_ITINERARY_DETAILS.TRAVELER
  );

  const { itineraryDetails } = useAppSelector(
    (state: any) => state.itineraryData
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    const { formRef } = params;
    dispatch(Fetch(API.ITINERARY_DETAILS, { formRef }));
  }, [params, dispatch]);

  return (
    <main className="content-container">
      <section className="content-top">
        <h2
          className="content-heading"
          onClick={() => navigate("/itinerary/list")}
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
        <DetailsPage />
      ) : (
        <ItineraryDetail />
      )}
    </main>
  );
};

export default ItineraryDetailsPage;
