/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import "react-toastify/dist/ReactToastify.css";
import { APPLICATION_ROUTES } from "../../constants";
import logo from  "../../images/249911.jpg";
import { ToastContainer } from "react-toastify";
import { Dispatch, useEffect } from "react";
import { connect } from "react-redux";
import { fetchEntity } from "../../redux/actions";
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
const ProfilePage = ({
  triggerFetchEntity,
  fetching = false,
  dashboard,
}: Props) => {
  useEffect(() => {
    triggerFetchEntity(APPLICATION_ROUTES.DASHBOARD);
  }, []);

  return (
    <section className="profilePage" id="profilePage">
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="dashboard">
        <div className="heading">
          <div className="heading-text">Profile</div>
        </div>
      </div>

      <div className="profile">
        <img className="profile-image" src="https://sneakers-app.s3.amazonaws.com/staging/images/small/staging-image-1658749914901-223" alt="signinImage" />
        <div className="profile-details">
          <div className="profile-name">Steven Walter</div>
          <div className="profile-text">steven@gmail.com</div>
          <div className="profile-text">+91-8375927593</div>
        </div>
      </div>
    </section>
  );
};

// handles the outgoing dispatches
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    triggerFetchEntity: (endpoint: string) =>
      dispatch(fetchEntity({ endpoint, payload: {}, page: 1, limit: 10 })),
  };
};

// handles incoming state changes
const mapStateToProps = (state: any) => {
  const { fetching, dashboard } = state;
  return { fetching, dashboard };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
