/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { IMAGE } from "../../../constants";
import moment from "moment";
import "./index.scss";

interface Props {
  itineraryDetails: any;
}

const DetailsPage = (props: Props) => {
  const { itineraryDetails } = props;
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
              src={`${IMAGE.SMALL}${itineraryDetails.specialist?.picture}`}
              alt="signinImage"
            />
            <div className="specialist-details">
              <div className="key">
                {itineraryDetails.specialist?.name || "NA"}
              </div>
              <a
                className="specialist-detail value"
                href={`tel:${itineraryDetails.specialist?.phoneNumber}`}
              >
                {itineraryDetails.specialist?.phoneNumber || "NA"}
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
              {itineraryDetails.traveller?.name || "NA"}
            </div>
          </div>

          <div>
            <div className="key">Email</div>
            <a
              className="value"
              href={`mailto:${itineraryDetails.traveller?.email}`}
            >
              {itineraryDetails.traveller?.email || "NA"}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
