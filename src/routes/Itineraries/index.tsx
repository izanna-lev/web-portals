/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useEffect } from "react";
import "./index.scss";

import { setItineraryDetails } from "../../store/Slice/itineraryDetails";
import { IMAGE_PREFIXES, ITINERARY_STATUS } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { itineraries } from "../../store/Actions/itineraries";
import { Pagination } from "../../components/Pagination";
import { SerialNum } from "../../util";

const ItineraryPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const itinerariesData = useAppSelector((state) => state.itineraries);

  const { page, limit, size, total, list } = itinerariesData;

  function updateItineraryDetails(data: any) {
    dispatch(setItineraryDetails(data));
  }

  useEffect(() => {
    dispatch(itineraries());
  }, [dispatch]);

  return (
    <section className="itenaryPage" id="itenaryPage">
      <div className="yo">
        <div className="dashboard">
          <div className="heading">
            <div className="heading-text">Assigned Itineraries</div>
          </div>
        </div>

        <div className="pagination">
          {list.length
            ? Pagination({
                page,
                limit,
                total,
                size,
                nextPage: () => dispatch(itineraries(page + 1, limit)),
                previousPage: () => dispatch(itineraries(page - 1, limit)),
              })
            : null}
        </div>
      </div>
      <div className="itenary-list">
        <table className="itinerary-table">
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
            {list.map((item, index) => {
              return (
                <tr className="table-data-row" key={item._id}>
                  <td className="table-data">
                    {SerialNum(limit, page, index)}
                  </td>
                  <td className="table-data name">
                    <img
                      className="table-user-image"
                      src={IMAGE_PREFIXES.IMAGE_SMALL + item.image}
                      alt="user"
                    />
                    <div className="table-user-name">{item.name}</div>
                  </td>
                  <td className="table-data">{item.duration}</td>
                  <td className="table-data">{item.guests}</td>
                  <td className="table-data">
                    {moment(item.fromDate).format("D-MMM-YYYY")}
                  </td>
                  <td className="table-data">
                    <div className="table-data-status">
                      {ITINERARY_STATUS[item.itineraryStatus]}
                    </div>
                  </td>
                  <td className="table-data">
                    <b
                      className="table-data-details"
                      onClick={() => {
                        updateItineraryDetails(item);
                        navigate(`/itineraries/${item._id}`);
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

export default ItineraryPage;
