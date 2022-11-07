/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useAppSelector } from "../../../store/hooks";
import { PLANNED_TRAVELLER } from "../../../constants";
import dayjs from "dayjs";
import "./index.scss";
import { UserIcon } from "../../../components/UserIcon";

const DetailsPage = () => {
  const { itineraryDetails, travellerDetails } = useAppSelector(
    (state: any) => state.itinerary
  );

  const { name, phoneNumber, image } = useAppSelector(
    (state: any) => state.profile
  );

  return (
    <>
      <div className="trip-details">
        <div className="trip-details-heading color-blue">
          Trip Request Form Details
        </div>
        <div className="trip-details-data">
          <div>
            <div className="key">Name</div>
            <div className="value">
              <UserIcon image={itineraryDetails.image} />
              <span>{itineraryDetails.location?.location || "NA"}</span>
            </div>
          </div>

          <div>
            <div className="key">Planned Date</div>
            <div className="value">
              {travellerDetails.plannedDate
                ? dayjs(travellerDetails.plannedDate).format("DD-MM-YYYY")
                : "NA"}
            </div>
          </div>

          <div>
            <div className="key">How much have you already planned?</div>
            <div className="value">
              {
                PLANNED_TRAVELLER[travellerDetails.plannedTraveller - 1 || 0]
                  .name
              }
            </div>
          </div>
        </div>

        <div className="trip-details-heading">Assigned Specialist</div>
        <div className="trip-details-data">
          <div className="assigned-specialist">
            <UserIcon image={image} />
            <div className="specialist-details">
              <div className="key">{name || "NA"}</div>
              <a
                className="specialist-detail value"
                href={`tel:+${phoneNumber}`}
              >
                +{phoneNumber || "NA"}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="trip-details">
        <div className="trip-details-heading color-blue">Traveler Details</div>
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
