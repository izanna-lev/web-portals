/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import "react-toastify/dist/ReactToastify.css";
import { APPLICATION_ROUTES } from "../../constants";
import { FaStar } from 'react-icons/fa';

import { Dispatch, useEffect } from "react";
import { connect } from "react-redux";
import { fetchEntity } from "../../redux/actions";
import LoadingOverlay from "../../components/LoadingOverlay";
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
const DashboardPage = ({
  triggerFetchEntity,
  fetching = false,
  dashboard,
}: Props) => {
  useEffect(() => {
    triggerFetchEntity(APPLICATION_ROUTES.DASHBOARD);
  }, []);

  return (
    <section className="statsPage" id="statsPage">
<LoadingOverlay/>

      <div className="dashboard">
        <div className="heading">
          <div className="heading-text">Dashboard</div>
        </div>
      </div>

      <div className="stats">
        <div className="stat-box pending">
          <div className="feild-number">15</div>
          <div className="feild-name">Pending Itinerary</div>
        </div>

        <div className="stat-box approved">
          <div className="feild-number">20</div>
          <div className="feild-name">Approved Itinerary</div>
        </div>

        <div className="stat-box completed">
          <div className="feild-number">05</div>
          <div className="feild-name">Completed Itinerary</div>
        </div>
      </div>

      <div className="heading rating">
        <div className="rating-text">Ratings</div>
      </div>

      <div className="overall-ratings">
        <div className="stars">
          <div className="star-icon"><FaStar/></div>
          <div className="star-icon"><FaStar/></div>
          <div className="star-icon"><FaStar/></div>
          <div className="star-icon"><FaStar/></div>
          <div className="star-icon"><FaStar/></div>

        </div>
        <div className="overall-experience">Overall Experience</div>
        <div className="experience-note">Note: Overall experience is evaluated through "Specialist, Value & Experience" rating and review.</div>

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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
