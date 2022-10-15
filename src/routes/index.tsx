import { Navigate, Route, Routes } from "react-router-dom";
import loadable from "@loadable/component";

const Account = loadable(() => import("./Account"));
const AssignedItineraries = loadable(() => import("./AssignedItineraries"));
const Chat = loadable(() => import("./Chat"));
const CreateItinerary = loadable(() => import("./CreateItinerary"));
const Dashboard = loadable(() => import("./Dashboard"));
const Itinerary = loadable(() => import("./Itinerary"));
const ItineraryDetails = loadable(() => import("./ItineraryDetails"));
const Login = loadable(() => import("./Login"));
const Profile = loadable(() => import("./Profile"));
const SendNotifications = loadable(() => import("./Notifications"));
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

const App = () => (
  <Routes>
    <Route path="/" element={<Account />}>
      <Route index element={<Dashboard />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="itinerary" element={<Itinerary />}>
        <Route index element={<AssignedItineraries />} />
        <Route path="list" element={<AssignedItineraries />} />
        <Route path="cancelled" element={<CancelledItineraries />} />
        <Route path="detail/:formRef" element={<ItineraryDetails />} />
        <Route path="add" element={<CreateItinerary />}>
          <Route index element={<AddItinerary />} />
          <Route path="details" element={<AddItinerary />} />
          <Route path="transportation" element={<Transportation />} />
          <Route path="accomodation" element={<Accomodation />} />
          <Route path="restaurant" element={<Restaurant />} />
          <Route path="activity" element={<Activities />} />
          <Route path="note" element={<Notes />} />
          <Route path="summary" element={<TripSummary />} />
        </Route>
      </Route>
      <Route path="profile" element={<Profile />} />
      <Route path="notifications" element={<SendNotifications />} />
      <Route path="chat">
        <Route index element={<Chat />} />
        <Route path=":channelId" element={<Chat />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace={true} />} />
    </Route>
    <Route path="login" element={<Login />} />
  </Routes>
);

export default App;
