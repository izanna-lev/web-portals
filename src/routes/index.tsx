import { Navigate, Route, Routes } from "react-router-dom";
import loadable from "@loadable/component";
import { useAppSelector } from "../store/hooks";

const Account = loadable(() => import("./Account"));
const AssignedItineraries = loadable(() => import("./AssignedItineraries"));
const Chat = loadable(() => import("./Chat"));
const CreateItinerary = loadable(() => import("./CreateItinerary"));
const Dashboard = loadable(() => import("./Dashboard"));
const Itinerary = loadable(() => import("./Itinerary"));
const ItineraryDetails = loadable(() => import("./ItineraryDetails"));
const Login = loadable(() => import("./Login"));
const Profile = loadable(() => import("./Profile"));
const Notifications = loadable(() => import("./Notifications"));
const CancelledItineraries = loadable(() => import("./CancelledItineraries"));

const Activities = loadable(() => import("./CreateItinerary/Activities"));
const Accomodation = loadable(() => import("./CreateItinerary/Accomodation"));
const AddItinerary = loadable(
  () => import("./CreateItinerary/ItineraryDetails")
);
const Notes = loadable(() => import("./CreateItinerary/Notes"));
const TripSummary = loadable(() => import("./CreateItinerary/TripSummary"));

const Restaurant = loadable(() => import("./CreateItinerary/Restaurant"));
const Transportation = loadable(
  () => import("./CreateItinerary/Transportation")
);

const App = () => {
  const { itineraryDetails } = useAppSelector((state) => state.itinerary);
  return (
    <Routes>
      <Route path="/" element={<Account />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="itinerary" element={<Itinerary />}>
          <Route index element={<Navigate to="list" />} />
          <Route path="list" element={<AssignedItineraries />} />
          <Route path="detail/:formRef" element={<ItineraryDetails />} />
          <Route path="add" element={<CreateItinerary />}>
            <Route index element={<Navigate to="details" />} />
            <Route
              path="details"
              element={<AddItinerary data={itineraryDetails} />}
            />
            <Route
              path="transportation"
              element={
                <Transportation status={itineraryDetails.itineraryStatus} />
              }
            />
            <Route
              path="accomodation"
              element={
                <Accomodation status={itineraryDetails.itineraryStatus} />
              }
            />
            <Route
              path="restaurant"
              element={<Restaurant status={itineraryDetails.itineraryStatus} />}
            />
            <Route
              path="activity"
              element={<Activities status={itineraryDetails.itineraryStatus} />}
            />
            <Route
              path="note"
              element={<Notes status={itineraryDetails.itineraryStatus} />}
            />
            <Route
              path="summary"
              element={
                <TripSummary status={itineraryDetails.itineraryStatus} />
              }
            />
          </Route>
        </Route>
        <Route
          path="itineraries/cancelled"
          element={<CancelledItineraries />}
        />
        <Route path="profile" element={<Profile />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="chat">
          <Route index element={<Chat />} />
          <Route path=":channelId" element={<Chat />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace={true} />} />
      </Route>
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default App;
