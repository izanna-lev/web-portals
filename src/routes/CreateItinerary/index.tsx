/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import { useEffect, useState } from "react";
import "./index.scss";

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
    name: "Accommodation",
    path: "accomodation",
  },
  {
    number: 4,
    name: "Restaurant Reservation",
    path: "restaurant",
  },
  {
    number: 5,
    name: "Activities",
    path: "activities",
  },
  {
    number: 6,
    name: "Notes",
    path: "notes",
  },
  {
    number: 7,
    name: "Trip Summary",
    path: "summary",
  },
];

const FormNavigation = (item: any, index: number, setTab: any, tab: string) => (
  <Link
    to={item.path}
    key={index}
    className="step"
    onClick={() => setTab(item.path)}
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

const CreateItinerary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tabNum, setTabNum] = useState("details");

  useEffect(() => {
    const currentLocation = location.pathname.split("/")[3];
    setTabNum(currentLocation);
  }, [location]);

  return (
    <section className="content-container" id="itineraryDetailPage">
      <section className="content-top">
        <h2
          className="content-heading"
          onClick={() => navigate("/itineraries")}
          style={{ cursor: "pointer" }}
        >
          <BsChevronLeft />
          <span>Create Itinerary</span>
        </h2>
      </section>
      <section className="createItineraryNav">
        {NavigationOptions.map((item: any, index: number) =>
          FormNavigation(item, index, setTabNum, tabNum)
        )}
      </section>
      <div className="content-bottom">
        <h4 className="form-request">Please fill the form below</h4>
        <Outlet />
      </div>
    </section>
  );
};

export default CreateItinerary;
