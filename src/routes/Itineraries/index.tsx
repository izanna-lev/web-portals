/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */


import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useEffect } from "react";
import "./index.scss";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { itineraries } from "../../store/Actions/itineraries";
import { IMAGE_PREFIXES, ITINERARY_STATUS } from "../../constants";
import { setItineraryDetails } from "../../store/Slice/itineraryDetails";

const ItineraryPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const itinerariesData = useAppSelector((state) => state.itineraries);

  function updateItineraryDetails(data: any) {
    dispatch(setItineraryDetails(data));
  }

  useEffect(() => {
    dispatch(itineraries({}))
  }, []);


  return (
    <section className="itenaryPage" id="itenaryPage">


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
            {itinerariesData.list.map((element, index) => {
              return (
                <tr className="table-data-row" key={element._id}>
                  <td className="table-data">{index + 1}</td>
                  <td className="table-data name">
                    <img
                      className="table-user-image"
                      src={IMAGE_PREFIXES.IMAGE_SMALL + element.image}
                      alt="user"
                    />
                    <div className="table-user-name">{element.name}</div>
                  </td>
                  <td className="table-data">{element.duration}</td>
                  <td className="table-data">{element.guests}</td>
                  <td className="table-data">{moment(element.fromDate).format("D-MMM-YYYY")}</td>
                  <td className="table-data">
                    <div className="table-data-status">{ITINERARY_STATUS[element.itineraryStatus]}</div>
                  </td>
                  <td className="table-data">
                    <b
                      className="table-data-details"
                      onClick={() => {
                        updateItineraryDetails(element)
                        let path = `/itineraries/${element._id}`;
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


export default ItineraryPage;
