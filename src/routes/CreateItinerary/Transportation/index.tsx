/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import FlightDetails from "../../../components/TransportationDetails/FlightDetails";
import TrainDetails from "../../../components/TransportationDetails/TrainDetails";
import FerryDetails from "../../../components/TransportationDetails/FerryDetails";
import CarDetails from "../../../components/TransportationDetails/CarDetails";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { API, TRANSPORTATION_TYPE } from "../../../constants";
import { DeleteEntity } from "../../../api/Delete";
import { useState, useEffect, useCallback } from "react";
import { Fetch } from "../../../api/Fetch";
import "./index.scss";

const transportationTabsEnum = [
  { name: "Flight Details", value: TRANSPORTATION_TYPE.FLIGHT },
  { name: "Train Details", value: TRANSPORTATION_TYPE.TRAIN },
  { name: "Ferry Details", value: TRANSPORTATION_TYPE.FERRY },
  { name: "Car Details", value: TRANSPORTATION_TYPE.CAR },
];

const TransportationTab = (
  detailType: number,
  setDetailType: any,
  title: string,
  type: number,
  index: number
) => {
  return (
    <button
      className="option"
      key={index}
      id={`${detailType === type && "active"}`}
      onClick={() => setDetailType(type)}
    >
      {title}
    </button>
  );
};

const TransportationPage = ({ status }: { status?: string }) => {
  const [detailType, setDetailType] = useState(1);
  const dispatch = useAppDispatch();

  const {
    ferry,
    flight,
    train,
    car,
    itineraryDetails: { _id },
  } = useAppSelector((state: any) => state.itinerary);

  const fetchData = useCallback(
    (page: number = 1, limit: number = 10, transportationType: number = 1) => {
      dispatch(
        Fetch(
          API.TRANSPORTATION_DATA,
          {
            itineraryRef: _id,
          },
          page,
          limit,
          { transportationType }
        )
      );
    },
    [_id, dispatch]
  );

  useEffect(() => {
    fetchData(1, 10, detailType);
  }, [fetchData, detailType]);

  const nextPage = (page: number = 0, limit: number = 10) =>
    fetchData(page + 1, limit, detailType);

  const previousPage = (page: number = 2, limit: number = 10) =>
    fetchData(page - 1, limit, detailType);

  const deleteTransportation = (transportationRef: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transportation?"
    );
    if (confirmDelete)
      dispatch(
        DeleteEntity(
          API.TRANSPORTATION_DELETE,
          { transportationRef },
          API.TRANSPORTATION_DATA,
          { transportationType: detailType, itineraryRef: _id },
          1,
          10
        )
      );
  };

  const pageProps = {
    nextTab: setDetailType,
    itineraryRef: _id,
    nextPage: nextPage,
    previousPage: previousPage,
    deleteTransportation: deleteTransportation,
    status,
  };

  return (
    <section className="AddItineraryPage">
      <div className="TransportationOptions">
        {transportationTabsEnum.map((tab: any, index: number) =>
          TransportationTab(
            detailType,
            setDetailType,
            tab.name,
            tab.value,
            index
          )
        )}
      </div>

      <div className="TransportationData">
        {detailType === TRANSPORTATION_TYPE.FLIGHT ? (
          <FlightDetails {...pageProps} flight={flight} />
        ) : null}
        {detailType === TRANSPORTATION_TYPE.TRAIN ? (
          <TrainDetails {...pageProps} train={train} />
        ) : null}
        {detailType === TRANSPORTATION_TYPE.FERRY ? (
          <FerryDetails {...pageProps} ferry={ferry} />
        ) : null}
        {detailType === TRANSPORTATION_TYPE.CAR ? (
          <CarDetails {...pageProps} car={car} />
        ) : null}
      </div>
    </section>
  );
};

export default TransportationPage;
