/* eslint-disable import/no-anonymous-default-export */
import { Navigate, Route, Routes } from "react-router-dom";
import loadable from "@loadable/component";

// import AddItinerary from "./CreateItinerary/AddItineraryDetails";
// import AddTransportation from "./CreateItinerary/AddTransportation";
// import AddActivities from "./CreateItinerary/AddActivities";

const Account = loadable(() => import("./Account"));
const AssignedItineraries = loadable(() => import("./AssignedItineraries"));
const Chat = loadable(() => import("./Chat"));
const CreateItinerary = loadable(() => import("./CreateItinerary"));
const Dashboard = loadable(() => import("./Dashboard"));
const ItineraryDetails = loadable(() => import("./ItineraryDetails"));
const Login = loadable(() => import("./Login"));
const Profile = loadable(() => import("./Profile"));
const SendNotifications = loadable(() => import("./Notifications"));

const AddItinerary = loadable(
  () => import("./CreateItinerary/AddItineraryDetails")
);
const AddTransportation = loadable(
  () => import("./CreateItinerary/AddTransportation")
);
const AddActivities = loadable(() => import("./CreateItinerary/AddActivities"));

const App = () => (
  <Routes>
    <Route path="/" element={<Account />}>
      <Route index element={<Dashboard />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="/itineraries" element={<AssignedItineraries />} />
      <Route path="itinerary">
        <Route path=":itineraryRef" element={<ItineraryDetails />} />
        <Route path="create" element={<CreateItinerary />}>
          <Route index element={<AddItinerary />} />
          <Route path="details" element={<AddItinerary />} />
          <Route path="transportation" element={<AddTransportation />} />
          <Route path="accomodation" element={<h3>accomodation</h3>} />
          <Route path="restaurant" element={<h3>restaurant</h3>} />
          <Route path="activities" element={<AddActivities />} />
          <Route path="notes" element={<h3>notes</h3>} />
          <Route path="summary" element={<AddActivities />} />
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
    <Route path="login" element={<Login showUserData={false} />} />
  </Routes>
);

export default App;
