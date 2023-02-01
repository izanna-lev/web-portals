/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useAppSelector } from "../../../store/hooks";
import { IoImageOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { getFormattedDate } from "../../../util";
import { ITINERARY_TYPE, PAYMENT_STATUS } from "../../../constants";

const NoItinerary = ({ navigate, access }: any) => (
  <section className="itinerary-details">
    <h2 className="itinerary-details-heading color-blue">Itinerary Details</h2>
    <div className="no-itenary">
      <div className="image-background">
        <IoImageOutline className="image" />
      </div>
      <div className="itinerary-heading">No Itinerary Created</div>

      {access.createItinerary && (
        <>
          {" "}
          <div className="itinerary-text">
            Please create itinerary for the traveler below.
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
      )}
    </div>
  </section>
);

const AvailableItinerary = ({ navigate, data = {} }: any) => {
  const detail = (title: string, value: string) => (
    <div className="detail-item">
      <h3 className="item-name">{title}</h3>
      <p className="item-value">{value}</p>
    </div>
  );
  return (
    <>
      <section className="itinerary-details">
        <h2 className="itinerary-details-heading color-blue">
          Itinerary Details
        </h2>
        <div className="basic-itinerary-details">
          <div className="details-row">
            {detail("Title", data.name)}
            {detail("Price", `$${data.price}`)}
            {detail("No. Of Days", data.duration)}
            {detail(
              "Date Of Trip",
              `${getFormattedDate(data.fromDate)} | ${getFormattedDate(
                data.toDate
              )}`
            )}
            {detail("No. Of People", data.guests)}
          </div>
          <div className="details-row">
            {detail(
              "Payment Status",
              PAYMENT_STATUS[data.paymentStatus - 1 || 0].name
            )}
            {detail(
              "Licenses",
              data.isDrivingLicense ? "Required" : "Not Required"
            )}
            {detail("Passports", data.isPassport ? "Required" : "Not Required")}
            {detail(
              "Itinerary Type",
              ITINERARY_TYPE[data.itineraryType - 1].name
            )}
          </div>
        </div>
        <div className="basic-itinerary-details">
          <div className="details-row height-max">
            {detail("Specialist Note", data.specialistNote)}
            {detail("Email", data.email)}
            {detail("Location", data.location)}
          </div>
        </div>
      </section>
      <section className="itinerary-details">
        <div className="itinerary-details-heading color-blue">
          Additional Information
        </div>
        <div className="additional-itinerary-details">
          <div className="details-row">
            {detail(
              "Specific Restrictions and Regulations",
              data.specificRestrictionsAndRegulations
            )}
          </div>
        </div>
      </section>
    </>
  );
};

const ItineraryDetailsPage = () => {
  const navigate = useNavigate();
  const { access } = useAppSelector((state) => state.profile);

  const { itineraryDetails } = useAppSelector((state: any) => state.itinerary);

  return itineraryDetails.itineraryStatus === 4 ? (
    <NoItinerary navigate={navigate} access={access} />
  ) : (
    // <NoItinerary navigate={navigate} />
    <AvailableItinerary navigate={navigate} data={itineraryDetails} />
  );
};

export default ItineraryDetailsPage;
