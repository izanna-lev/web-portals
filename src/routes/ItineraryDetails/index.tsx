/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { ITINERARY_SECTION, ITINERARY_STATUS, API } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { BsChevronLeft, BsChatRightDots } from "react-icons/bs";
import EditItinerary from "../CreateItinerary/ItineraryDetails";
import { useNavigate, useParams } from "react-router-dom";
import ItineraryDetail from "./ItineraryDetail/index";
import DetailsPage from "./TravelerDetails/index";
import { Modal } from "../../components/Portal";
import { ICON } from "../../assets/index";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { Create } from "../../api/Create";
import { Fetch } from "../../api/Fetch";
import "./index.scss";
import { IoCloseOutline } from "react-icons/io5";
import { setFormRef } from "../../store/slices/appData";
import TransportationDetails from "../CreateItinerary/Transportation";
import AccomodationDetails from "../CreateItinerary/Accomodation";
import RestaurantDetails from "../CreateItinerary/Restaurant";
import ActivitiesDetails from "../CreateItinerary/Activities";
import NotesDetails from "../CreateItinerary/Notes";
import TripSummaryDetails from "../CreateItinerary/TripSummary";
import { INITIAL_STATE } from "../../store/slices/itinerary";

const EditDetailsContainer = ({ children, setedit }: any) => {
  return (
    <div className="edit-itinerary">
      <div className="edit-form-container">
        <IoCloseOutline className="cross" onClick={() => setedit(null)} />
        <div className="edit-form-wrapper">{children}</div>
      </div>
    </div>
  );
};

const ItineraryDetailsPage = () => {
  const [tabSelected, setTabSelected] = useState(ITINERARY_SECTION.TRAVELER);
  const [edit, setedit] = useState(null);

  const { formRef } = useAppSelector((state: any) => state.appData);
  const { itineraryDetails, channelRef } = useAppSelector(
    (state: any) => state.itinerary
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(Fetch(API.ITINERARY_DETAILS, { formRef: params.formRef }));
    dispatch(setFormRef(params.formRef));
  }, [params.formRef, dispatch]);

  const handleItineraryStatus = (status = "cancel") => {
    const endpoint =
      status === "complete" ? API.ITINERARY_COMPLETE : API.ITINERARY_CANCEL;
    dispatch(
      Create(
        endpoint,
        { itineraryRef: itineraryDetails._id },
        false,
        null,
        API.ITINERARY_DETAILS,
        { formRef }
      )
    );
  };

  const handleBack = () => {
    navigate("/itinerary/list");
    dispatch(INITIAL_STATE({}));
  };

  const itineraryProps = {
    status: itineraryDetails.itineraryStatus,
  };

  return (
    <>
      <main className="content-container">
        <section className="content-top">
          <h2
            className="content-heading"
            onClick={handleBack}
            style={{ cursor: "pointer" }}
          >
            <BsChevronLeft />
            <span>Itinerary Details</span>
          </h2>
        </section>

        <section
          className={`tab-group ${
            itineraryDetails.itineraryStatus === 4 ? "itinerary-pending" : ""
          }`}
        >
          <div
            className={`tab-option ${
              tabSelected === ITINERARY_SECTION.TRAVELER ? "tab-selected" : ""
            }`}
            onClick={() => setTabSelected(ITINERARY_SECTION.TRAVELER)}
          >
            Traveler Details
          </div>
          <div
            className={`tab-option ${
              tabSelected === ITINERARY_SECTION.ITINERARY ? "tab-selected" : ""
            }`}
            onClick={() => setTabSelected(ITINERARY_SECTION.ITINERARY)}
          >
            Itinerary Details
          </div>
          {itineraryDetails.itineraryStatus !== 4 ? (
            <>
              <div
                className={`tab-option ${
                  tabSelected === ITINERARY_SECTION.TRANSPORTATION
                    ? "tab-selected"
                    : ""
                }`}
                onClick={() => setTabSelected(ITINERARY_SECTION.TRANSPORTATION)}
              >
                Transportation
              </div>
              <div
                className={`tab-option ${
                  tabSelected === ITINERARY_SECTION.ACCOMODATIONS
                    ? "tab-selected"
                    : ""
                }`}
                onClick={() => setTabSelected(ITINERARY_SECTION.ACCOMODATIONS)}
              >
                Accommodations
              </div>
              <div
                className={`tab-option ${
                  tabSelected === ITINERARY_SECTION.RESTAURANT
                    ? "tab-selected"
                    : ""
                }`}
                onClick={() => setTabSelected(ITINERARY_SECTION.RESTAURANT)}
              >
                Restaurant Reservations
              </div>
              <div
                className={`tab-option ${
                  tabSelected === ITINERARY_SECTION.ACTIVITIES
                    ? "tab-selected"
                    : ""
                }`}
                onClick={() => setTabSelected(ITINERARY_SECTION.ACTIVITIES)}
              >
                Activities
              </div>
              <div
                className={`tab-option ${
                  tabSelected === ITINERARY_SECTION.NOTES ? "tab-selected" : ""
                }`}
                onClick={() => setTabSelected(ITINERARY_SECTION.NOTES)}
              >
                Notes
              </div>
              <div
                className={`tab-option ${
                  tabSelected === ITINERARY_SECTION.SUMMARY
                    ? "tab-selected"
                    : ""
                }`}
                onClick={() => setTabSelected(ITINERARY_SECTION.SUMMARY)}
              >
                Trip Summary
              </div>
            </>
          ) : null}
        </section>

        <div className="status-chat">
          <img
            src={
              ICON[
                ITINERARY_STATUS[
                  itineraryDetails.itineraryStatus || 4
                ].toUpperCase()
              ]
            }
            alt={ITINERARY_STATUS[itineraryDetails.itineraryStatus || 4]}
            className="time-icon"
          />
          <div className="status-view">
            <div className="status">Status</div>
            <div className="status-text">
              {ITINERARY_STATUS[itineraryDetails.itineraryStatus || 4]}
            </div>
          </div>

          {tabSelected === ITINERARY_SECTION.TRAVELER ? (
            <div className="itinerary-buttons">
              {itineraryDetails.itineraryStatus === 2 ? (
                <>
                  <div
                    className="btn view-button"
                    onClick={() => handleItineraryStatus("complete")}
                  >
                    <span>Complete Trip</span>
                  </div>
                  <div
                    className="btn cancel-button"
                    onClick={() => handleItineraryStatus("cancel")}
                  >
                    <span>Cancel Itinerary</span>
                  </div>
                </>
              ) : null}

              {itineraryDetails.itineraryStatus === 2 ? (
                <div
                  className="chat"
                  onClick={() => navigate(`/chat/${channelRef}`)}
                >
                  <BsChatRightDots />
                  <span>Chat</span>
                </div>
              ) : null}
            </div>
          ) : null}

          {tabSelected === ITINERARY_SECTION.ITINERARY &&
          itineraryDetails.itineraryStatus === 2 ? (
            <div className="itinerary-buttons">
              <div
                className="btn view-button"
                onClick={() => setedit(itineraryDetails)}
              >
                <FaRegEdit />
                &nbsp;<span>Edit details</span>
              </div>
            </div>
          ) : null}
        </div>

        {tabSelected === ITINERARY_SECTION.TRAVELER ? <DetailsPage /> : null}
        {tabSelected === ITINERARY_SECTION.ITINERARY ? (
          <ItineraryDetail />
        ) : null}
        {tabSelected === ITINERARY_SECTION.TRANSPORTATION ? (
          <TransportationDetails {...itineraryProps} />
        ) : null}
        {tabSelected === ITINERARY_SECTION.ACCOMODATIONS ? (
          <AccomodationDetails {...itineraryProps} />
        ) : null}
        {tabSelected === ITINERARY_SECTION.RESTAURANT ? (
          <RestaurantDetails {...itineraryProps} />
        ) : null}
        {tabSelected === ITINERARY_SECTION.ACTIVITIES ? (
          <ActivitiesDetails {...itineraryProps} />
        ) : null}
        {tabSelected === ITINERARY_SECTION.NOTES ? (
          <NotesDetails {...itineraryProps} />
        ) : null}
        {tabSelected === ITINERARY_SECTION.SUMMARY ? (
          <TripSummaryDetails {...itineraryProps} />
        ) : null}
      </main>

      {edit ? (
        <Modal
          modal={
            <EditDetailsContainer setedit={setedit}>
              <EditItinerary data={edit} handleEditPopup={setedit} />
            </EditDetailsContainer>
          }
          root={document.getElementById("overlay-root") as HTMLElement}
        />
      ) : null}
    </>
  );
};

export default ItineraryDetailsPage;
