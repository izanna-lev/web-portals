/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { dashboard } from "../../store/Actions/dashboard";
import "./index.scss";
import { useEffect } from "react";

const DashboardCard = (title: string, data: number, className: string) => (
  <div className={`stat-box ${className}`}>
    <div className="feild-number">{data}</div>
    <div className="feild-name">{title}</div>
  </div>
);

const DashboardPage = () => {
  const dashboardData = useAppSelector((state) => state.dashboard.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(dashboard());
  }, [dispatch]);

  return (
    <section className="statsPage" id="statsPage">
      <div className="dashboard">
        <div className="heading">
          <div className="heading-text">Dashboard</div>
        </div>
      </div>

      <div className="stats">
        {DashboardCard("Pending Itinerary", dashboardData.pending, "pending")}
        {DashboardCard(
          "Approved Itinerary",
          dashboardData.approved,
          "approved"
        )}
        {DashboardCard(
          "Completed Itinerary",
          dashboardData.completed,
          "completed"
        )}
      </div>

      <div className="heading rating">
        <div className="rating-text">Ratings</div>
      </div>

      <div className="overall-ratings">
        <div className="stars">
          {[...Array(5)].map((elementInArray, index) => {
            const percentage =
              dashboardData.overallExperience - index > 0
                ? dashboardData.overallExperience - index < 1
                  ? dashboardData.overallExperience - index
                  : 1
                : 0;
            return (
              <div className="star-icon" key={index}>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 576 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id={`grad${index}`}>
                      <stop offset="0%" stopColor="#fcca00" />
                      <stop
                        offset={`${percentage * 100}%`}
                        stopColor="#fcca00"
                      />
                      <stop
                        offset={`${percentage * 100}%`}
                        stopColor="#484848"
                      />
                      <stop offset="100%" stopColor="#484848" />
                    </linearGradient>
                  </defs>
                  <path
                    fill={"url(#grad" + index + ")"}
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  ></path>
                </svg>
              </div>
            );
          })}
        </div>
        <div className="overall-experience">Overall Experience</div>
        <div className="experience-note">
          Note: Overall experience is evaluated through "Specialist, Value &
          Experience" rating and review.
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
