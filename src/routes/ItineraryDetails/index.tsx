/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import "react-toastify/dist/ReactToastify.css";
import { TRAVELER_ITINERARY_DETAILS } from "../../constants";
import DetailsPage  from './TravelerDetails/index'
import ItineraryDetail from './ItineraryDetail/index'
import { BsChevronLeft, BsHourglassTop, BsChatRightDots } from "react-icons/bs";

import { Dispatch, useState } from "react";
import { connect } from "react-redux";

import { fetchEntity } from "../../redux/actions";
import "./index.scss";
import { useParams } from "react-router";

type Props = {
  triggerFetchEntity: (endpoint: string) => void;
  fetching: boolean;
  dashboard: {
    active: number;
    blocked: number;
    deleted: number;
    pActive: number;
    pBlocked: number;
    pDeleted: number;
    totalClicksOnAds: number;
  };
};
const ItineraryDetailsPage = () => {
  const [getDetail, setDetail] = useState(TRAVELER_ITINERARY_DETAILS.TRAVELER);

  return (
    <section className="itineraryDetailPage" id="itineraryDetailPage">
      <div className="heading">
        <BsChevronLeft />
        <div className="heading-text">Itinerary Details</div>
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
          <div className="status-text">Pending</div>
        </div>

        <div className="chat">
          <BsChatRightDots />
          <div>Chat</div>
        </div>
      </div>
      
      { getDetail === TRAVELER_ITINERARY_DETAILS.TRAVELER ? <DetailsPage/> : <ItineraryDetail/>}
    </section>
  );
};

// handles the outgoing dispatches
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    triggerFetchEntity: (endpoint: string) =>
      dispatch(fetchEntity({ endpoint, payload: {}, page: 1, limit: 10 })),
  };
};

// handles incoming state changes
const mapStateToProps = (state: any) => {
  const { fetching, dashboard } = state;
  return { fetching, dashboard };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItineraryDetailsPage);
