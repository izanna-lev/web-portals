/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useState, useEffect } from "react";
import FlightDetails from "../../../components/FlightDetails";
import TrainDetails from "../../../components/TrainDetails";
import FerryDetails from "../../../components/FerryDetails";
import CarDetails from "../../../components/CarDetails";
import "./index.scss";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Fetch } from "../../../api/Fetch";
import { API, TRANSPORTATION_TYPE } from "../../../constants";

const AddItineraryPage = () => {
  const [detailType, setDetailType] = useState(1);

  const { _id } = useAppSelector(
    (state) => state.itineraryData.itineraryDetails
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      Fetch(
        API.TRANSPORTATION_DATA,
        {
          itineraryRef: _id,
          timezoneOffset: "Asia/Kolkata",
        },
        1,
        10,
        { transportationType: detailType }
      )
    );
  }, [dispatch, _id, detailType]);

  return (
    <section className="AddItineraryPage">
      <div className="TransportationOptions">
        <button
          className="option"
          id={`${detailType === TRANSPORTATION_TYPE.FLIGHT && "active"}`}
          onClick={() => setDetailType(TRANSPORTATION_TYPE.FLIGHT)}
        >
          Flight Details
        </button>
        <button
          className="option"
          id={`${detailType === TRANSPORTATION_TYPE.TRAIN && "active"}`}
          onClick={() => setDetailType(TRANSPORTATION_TYPE.TRAIN)}
        >
          Train Details
        </button>
        <button
          className="option"
          id={`${detailType === TRANSPORTATION_TYPE.FERRY && "active"}`}
          onClick={() => setDetailType(TRANSPORTATION_TYPE.FERRY)}
        >
          Ferry Details
        </button>
        <button
          className="option"
          id={`${detailType === TRANSPORTATION_TYPE.CAR && "active"}`}
          onClick={() => setDetailType(TRANSPORTATION_TYPE.CAR)}
        >
          Car Details
        </button>
      </div>

      <div className="TransportationData">
        {detailType === TRANSPORTATION_TYPE.FLIGHT ? <FlightDetails /> : null}
        {detailType === TRANSPORTATION_TYPE.TRAIN ? <TrainDetails /> : null}
        {detailType === TRANSPORTATION_TYPE.FERRY ? <FerryDetails /> : null}
        {detailType === TRANSPORTATION_TYPE.CAR ? <CarDetails /> : null}
      </div>
    </section>
  );
};

export default AddItineraryPage;
