/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useAppSelector } from "../../../store/hooks";
import { IMAGE } from "../../../constants";
import moment from "moment";
import "./index.scss";

const DetailsPage = () => {
  const { itineraryDetails, travellerDetails } = useAppSelector(
    (state: any) => state.itineraryData
  );

  const { name, phoneNumber, picture } = useAppSelector(
    (state: any) => state.profile
  );

  return (
    <>
      <div className="trip-details">
        <div className="trip-details-heading">Trip Request From Details</div>
        <div className="trip-details-data">
          <div>
            <div className="key">Location</div>
            <div className="value">
              {itineraryDetails.location?.location || "NA"}
            </div>
          </div>

          <div>
            <div className="key">Planned Date</div>
            <div className="value">
              {itineraryDetails.toDate
                ? moment(itineraryDetails.toDate).format("DD-MM-YYYY")
                : "NA"}
            </div>
          </div>

          <div>
            <div className="key">Traveler/Companions</div>
            <div className="value">{`${
              itineraryDetails.rooms || "NA"
            } Rooms | ${
              itineraryDetails.plannedTraveller ||
              itineraryDetails.guests ||
              "NA"
            } Travellers`}</div>
          </div>
        </div>
        <div className="trip-details-heading">Assigned Specialist</div>

        <div className="trip-details-data">
          <div className="assigned-specialist">
            <img
              className="specialist-image"
              src={`${IMAGE.SMALL}${picture}`}
              alt="signinImage"
            />
            <div className="specialist-details">
              <div className="key">{name || "NA"}</div>
              <a
                className="specialist-detail value"
                href={`tel:${phoneNumber}`}
              >
                {phoneNumber || "NA"}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="trip-details">
        <div className="trip-details-heading">Travler Details</div>
        <div className="trip-details-data">
          <div>
            <div className="key">Name</div>
            <div className="value">
              {travellerDetails.travellerName || "NA"}
            </div>
          </div>

          <div>
            <div className="key">Email</div>
            <a
              className="value"
              href={`mailto:${travellerDetails.travellerEmail}`}
            >
              {travellerDetails.travellerEmail || "NA"}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
