/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import "react-toastify/dist/ReactToastify.css";
import { APPLICATION_ROUTES } from "../../constants";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { Dispatch, useEffect } from "react";
import { connect } from "react-redux";


import { fetchEntity } from "../../redux/actions";
import "./index.scss";

import { DUMMY } from "./dummy";
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
const ItineraryPage = ({
  triggerFetchEntity,
  fetching = false,
  dashboard,
}: Props) => {
  const navigate = useNavigate();
  useEffect(() => {
    triggerFetchEntity(APPLICATION_ROUTES.DASHBOARD);
  }, []);

  return (
    <section className="itenaryPage" id="itenaryPage">
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

      <div className="yo">
        <div className="dashboard">
          <div className="heading">
            <div className="heading-text">Assigned Itineraries</div>
          </div>
        </div>

        <div className="pagination">
          <HiOutlineChevronLeft className="left" />
          <div className="pagination-text">8 of 50</div>
          <HiOutlineChevronRight className="right" />
        </div>
      </div>
      <div className="itenary-list">
        <table>
          <thead className="table-head">
            <tr className="table-row">
              <th className="table-head" scope="col">
                Sr.No.
              </th>
              <th className="table-head" scope="col">
                Name
              </th>
              <th className="table-head" scope="col">
                No. of Days
              </th>
              <th className="table-head" scope="col">
                No. of Guests
              </th>
              <th className="table-head" scope="col">
                Assigned Date
              </th>
              <th className="table-head" scope="col">
                Status
              </th>
              <th className="table-head" scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {DUMMY.map((element, index) => {
              return (
                <tr className="table-data-row">
                  <td className="table-data">{index + 1}</td>
                  <td className="table-data name">
                    <img
                      className="table-user-image"
                      src={element.image}
                      alt="user"
                    />
                    <div className="table-user-name">{element.name}</div>
                  </td>
                  <td className="table-data">{element.days}</td>
                  <td className="table-data">{element.guest}</td>
                  <td className="table-data">{element.date}</td>
                  <td className="table-data">
                    <div className="table-data-status">{element.status}</div>
                  </td>
                  <td className="table-data">
                    <b
                      className="table-data-details"

                      onClick={() => {
                        let path = `/itineraries/${index}`;
                        navigate(path);
                      }}
                    >
                      View Details
                    </b>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(ItineraryPage);
