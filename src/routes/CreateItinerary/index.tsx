/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import { useEffect, useState } from "react";
import "./index.scss";
import { useAppSelector } from "../../store/hooks";

const NavigationOptions = [
  {
    number: 1,
    name: "Itinerary Details",
    path: "details",
  },
  {
    number: 2,
    name: "Transportation",
    path: "transportation",
  },
  {
    number: 3,
    name: "Accommodations",
    path: "accomodation",
  },
  {
    number: 4,
    name: "Restaurant Reservations",
    path: "restaurant",
  },
  {
    number: 5,
    name: "Activities",
    path: "activity",
  },
  {
    number: 6,
    name: "Notes",
    path: "note",
  },
  {
    number: 7,
    name: "Trip Summary",
    path: "summary",
  },
];

const FormNavigation = (
  item: any,
  index: number,
  setTab: any,
  tab: string,
  detailsSubmission: boolean = false
) => {
  const handleClick = () => (detailsSubmission ? setTab(item.path) : null);

  return (
    <Link
      to={detailsSubmission ? item.path : "details"}
      key={index}
      className="step"
      onClick={handleClick}
    >
      <div className="step-number-background">
        <span className="step-number">{item.number}</span>
      </div>
      <div
        className={`step-name-background ${
          tab === item.path ? "tab-active" : ""
        }`}
      >
        <span className={`step-name`}>{item.name}</span>
      </div>
    </Link>
  );
};

const CreateItinerary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tabNum, setTabNum] = useState("details");

  const { formRef } = useAppSelector((state) => state.appData);
  const { details } = useAppSelector((state) => state.itinerary);

  useEffect(() => {
    !formRef && navigate("/itinerary/list");
  }, [formRef, navigate]);

  useEffect(() => {
    const currentLocation = location.pathname.split("/")[3];
    setTabNum(currentLocation);
  }, [location]);

  return (
    <section className="content-container" id="itineraryDetailPage">
      <section className="content">
        <section className="content-top">
          <h2
            className="content-heading"
            onClick={() => navigate(`/itinerary/detail/${formRef}`)}
            style={{ cursor: "pointer" }}
          >
            <BsChevronLeft />
            <span>Create Itinerary</span>
          </h2>
        </section>
        <section className="createItineraryNav">
          {NavigationOptions.map((item: any, index: number) =>
            FormNavigation(item, index, setTabNum, tabNum, details)
          )}
        </section>
        <section className="content-bottom">
          <h4 className="form-request">
            {tabNum !== "summary"
              ? "Please fill the form below"
              : "Please review the details below"}
          </h4>
          <Outlet />
        </section>
      </section>
    </section>
  );
};

export default CreateItinerary;
