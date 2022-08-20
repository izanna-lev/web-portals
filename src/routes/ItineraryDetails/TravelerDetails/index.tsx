/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import "react-toastify/dist/ReactToastify.css";
import { GiSandsOfTime } from "react-icons/gi";

import { BsChevronLeft, BsHourglassTop, BsChatRightDots } from "react-icons/bs";

import { Dispatch, useState } from "react";
import { connect } from "react-redux";

import "./index.scss";
import { useParams } from "react-router";

type Props = {
};
const DetailsPage = () => {

  return (
    <>
      <div className="trip-details">
        <div className="trip-details-heading">Trip Request From Details</div>
        <div className="trip-details-data">
          <div>
            <div className="key">Location</div>
            <div className="value">Cebu city, LA</div>
          </div>

          <div>
            <div className="key">Planned Date</div>
            <div className="value">12-may-2022</div>
          </div>

          <div>
            <div className="key">Traveler/Companions</div>
            <div className="value">1 Room|2 Adults|2 Children</div>
          </div>
        </div>
        <div className="trip-details-heading">Assigned Specialist</div>

        <div className="trip-details-data">
          <div className="assigned-specialist">
            <img
              className="specialist-image"
              src="https://sneakers-app.s3.amazonaws.com/staging/images/small/staging-image-1658749914901-223"
              alt="signinImage"
            />
            <div className="specialist-details">
              <div className="key">Steven Walter</div>
              <div className="specialist-detail value">+01-943-432-4317</div>
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

export default DetailsPage
