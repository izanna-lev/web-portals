/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useState } from "react";
import FlightDetails from "../../../components/FlightDetails";
import TrainDetails from "../../../components/TrainDetails";
import FerryDetails from "../../../components/FerryDetails";
import CarDetails from "../../../components/CarDetails";
import "./index.scss";

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
const AddItineraryPage = () => {
  const [detailType, setDetailType] = useState(0);

  return (
    <section className="AddItineraryPage">
      <div className="TransportationOptions">
        <button
          className="option"
          id={`${detailType === 0 && "active"}`}
          onClick={() => setDetailType(0)}
        >
          Flight Details
        </button>
        <button
          className="option"
          id={`${detailType === 1 && "active"}`}
          onClick={() => setDetailType(1)}
        >
          Train Details
        </button>
        <button
          className="option"
          id={`${detailType === 2 && "active"}`}
          onClick={() => setDetailType(2)}
        >
          Ferry Details
        </button>
        <button
          className="option"
          id={`${detailType === 3 && "active"}`}
          onClick={() => setDetailType(3)}
        >
          Car Details
        </button>
      </div>

      <div className="TransportationData">
        {detailType === 0 ? <FlightDetails /> : null}
        {detailType === 1 ? <TrainDetails /> : null}
        {detailType === 2 ? <FerryDetails /> : null}
        {detailType === 3 ? <CarDetails /> : null}
      </div>
    </section>
  );
};

export default AddItineraryPage;
