/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

// import { GiSandsOfTime } from "react-icons/gi";
// import logo from "../../../images/placeholder.png";

import { useNavigate } from "react-router-dom";
import { IoImageOutline } from "react-icons/io5";
import { useAppSelector } from "../../../store/hooks";


const ItineraryDetailsPage = () => {
  const navigate = useNavigate();
  const profileData = useAppSelector((state) => state.profile);

  return (
    <section className="itinerary-details">
      <div className="itinerary-details-heading">Itinerary Details</div>
      <div className="no-itenary">
        <div className="image-background">
          <IoImageOutline className="image" />
        </div>
        <div className="itinerary-heading">No Itinerary Created</div>
        {
          profileData.access?.createItinerary &&         <>
          <div className="itinerary-text">
            Please create itinerary for the user below.
          </div>
          <div
            className="create-itinerary-btn"
            onClick={() => {
              navigate("/itinerary/add/details");
            }}
          >
            Create Itinerary
          </div>
          </>
        }

      </div>
    </section>
  );
};

export default ItineraryDetailsPage;
