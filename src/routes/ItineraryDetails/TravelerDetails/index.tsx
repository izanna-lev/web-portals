/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useAppSelector } from "../../../store/hooks";
import moment from "moment";
import "./index.scss";

import { IMAGE_PREFIXES } from "../../../constants";

interface Props {
  details: any;
}

const DetailsPage = (props: Props) => {
  const specialist = useAppSelector((state) => state.profile);
  const { details } = props;
  return (
    <>
      <div className="trip-details">
        <div className="trip-details-heading">Trip Request From Details</div>
        <div className="trip-details-data">
          <div>
            <div className="key">Location</div>
            <div className="value">{details.location.location || "NA"}</div>
          </div>

          <div>
            <div className="key">Planned Date</div>
            <div className="value">
              {moment(details.toDate).format("DD-MM-YYYY")}
            </div>
          </div>

          <div>
            <div className="key">Traveler/Companions</div>
            <div className="value">{`${details.rooms} rooms | ${details.plannedTraveller} travellers`}</div>
          </div>
        </div>
        <div className="trip-details-heading">Assigned Specialist</div>

        <div className="trip-details-data">
          <div className="assigned-specialist">
            <img
              className="specialist-image"
              src={`${IMAGE_PREFIXES.IMAGE_SMALL}${specialist.data.picture}`}
              alt="signinImage"
            />
            <div className="specialist-details">
              <div className="key">{specialist.data.name || "NA"}</div>
              <div className="specialist-detail value">
                {specialist.data.phoneNumber || "NA"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="trip-details">
        <div className="trip-details-heading">Travler Details</div>
        <div className="trip-details-data">
          <div>
            <div className="key">Name</div>
            <div className="value">Elina Williams</div>
          </div>

          <div>
            <div className="key">Email</div>
            <div className="value">ewilliam2@gmail.com</div>
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

export default DetailsPage;
