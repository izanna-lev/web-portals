/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

// import { GiSandsOfTime } from "react-icons/gi";
// import logo from "../../../images/placeholder.png";

import { useNavigate } from "react-router-dom";
import { IoImageOutline } from "react-icons/io5";

import "./index.scss";

// type Props = {};

const ItineraryDetailsPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="itinerary-details">
        <div className="itinerary-details-heading">Itinerary Details</div>
        <div className="no-itenary">
          <div className="image-background">
            <IoImageOutline className="image" />
          </div>
          <div className="itinerary-heading">No itenary created</div>
          <div className="itinerary-text">
            Please create itinerary for the user below.
          </div>
          <div
            className="button-text create-itinerary"
            onClick={() => {
              let path = `/itineraries/1/create`;
              navigate(path);
            }}
          >
            Create Itinerary
          </div>
        </div>
      </div>
    </>
  );
};

// handles the outgoing dispatches
// const mapDispatchToProps = (dispatch: Dispatch<any>) => {
//   return {
//   };
// };

// handles incoming state changes
// const mapStateToProps = (state: any) => {
//   const { fetching, dashboard } = state;
//   return { fetching, dashboard };
// };

export default ItineraryDetailsPage;
