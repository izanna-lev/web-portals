/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */


import { BsChevronLeft } from "react-icons/bs";
import "./index.scss";
import { NavLink, Outlet } from "react-router-dom";

const Nav = ({ steps }: any) => {
  return (
    <section className="createItineraryDetailPage" id="itineraryDetailPage">
      <div className="nav-heading">
        <BsChevronLeft />
        <div className="heading-text">Create Itinerary</div>
      </div>
      <div className="createItineraryNav">
        {steps.map((item: any, index: number) => {
          return (
            <div key={index} className="step">
              <div className="step-number-background">
                <div className="step-number">{item.number}</div>
              </div>
              <NavLink
                className="step-name-background"
                to={item.path}
                style={({ isActive }) => ({
                  color: isActive ? "#000000" : "#000000",
                  "backgroundColor": isActive ? "#73d8bb" : "",
                })}
              >
                <div className="step-name">{item.name}</div>
              </NavLink>
            </div>
          );
        })}
      </div>
      <div className="form-request">Please fill the form below</div>

      <Outlet />
    </section>
  );
};

export default Nav;
