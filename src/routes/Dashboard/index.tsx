/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { API } from "../../constants";
import { useEffect } from "react";
import { Fetch } from "../../api/Fetch";
import "./index.scss";
import React from "react";

const DashboardCard = (title: string, data: number) => (
  <div className="card-container">
    <div className="card-value">{data}</div>
    <div className="card-title">{title}</div>
  </div>
);

const Stars = React.memo(({ dashboard }: any) => {
  let arr = [0, 1, 2, 3, 4];
  return (
    <div className="stars">
      {arr.map((index) => {
        const percentage =
          dashboard.overallExperience - index > 0
            ? dashboard.overallExperience - index < 1
              ? dashboard.overallExperience - index
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
                  <stop offset={`${percentage * 100}%`} stopColor="#fcca00" />
                  <stop offset={`${percentage * 100}%`} stopColor="#dee2e6" />
                  <stop offset="100%" stopColor="#dee2e6" />
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
  );
});

const DashboardPage = () => {
  const dashboardData = useAppSelector((state) => state.dashboard);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(Fetch(API.DASHBOARD));
  }, [dispatch]);

  return (
    <main className="content-container">
      <section className="content-top">
        <h2 className="content-heading">Dashboard</h2>
      </section>

      <section className="dashboard-stats">
        {DashboardCard("Pending Itinerary", dashboardData.pending)}
        {DashboardCard("Approved Itinerary", dashboardData.approved)}
        {DashboardCard("Completed Itinerary", dashboardData.completed)}
      </section>

      <section className="dashboard-ratings">
        <h3 className="rating-text">Ratings</h3>
        <div className="overall-ratings">
          <Stars dashboard={dashboardData} />
          <h4 className="overall-experience">Overall Experience</h4>
          <p className="experience-note">
            Note: Overall experience is evaluated through "Specialist, Value &
            Experience" ratings and reviews.
          </p>
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
