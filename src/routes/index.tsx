/* eslint-disable import/no-anonymous-default-export */
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { BiHome, BiConversation, BiUser } from "react-icons/bi";
import { RiTodoLine } from "react-icons/ri";
import loadable from "@loadable/component";
import { Provider } from "react-redux";
import { store } from "../store";

const ItineraryDetailsPage = loadable(() => import("./ItineraryDetails/index"));
const SideNavigation = loadable(() => import("./SideNavigation/index"));
const NavBar = loadable(() => import("./CreateItinerary/Nav/index"));
const ItineraryPage = loadable(() => import("./Itineraries/index"));
const LandingPage = loadable(() => import("./LandingPage/index"));
const DashboardPage = loadable(() => import("./Dashboard/index"));
const ProfilePage = loadable(() => import("./Profile/index"));
const ChatPage = loadable(() => import("./Chat/index"));

const AddItineraryPage = loadable(
  () => import("./CreateItinerary/AddItineraryDetails/index")
);
const AddTransportationPage = loadable(
  () => import("./CreateItinerary/AddTransportation/index")
);
const AddActivitiesPage = loadable(
  () => import("./CreateItinerary/AddActivities/index")
);

const paths = [
  {
    key: 1,
    path: "/dashboard",
    name: "Dashboard",
    icon: <BiHome />,
    element: <DashboardPage />,
    state: 1,
  },
  {
    key: 2,
    path: "/itineraries",
    name: "Assigned Itineraries",
    icon: <RiTodoLine />,
    element: <ItineraryPage />,
    state: 2,
  },
  {
    key: 3,
    path: "/chat",
    name: "Chat",
    icon: <BiConversation />,
    element: <ChatPage />,
    state: 3,
  },
  {
    key: 4,
    path: "/profile",
    name: "Profile",
    abc: 1,
    icon: <BiUser />,
    element: <ProfilePage />,
    state: 4,
  },
];

const createItinerarySteps = [
  {
    number: 1,
    name: "Itinerary Details",
    path: "1",
    element: <h1>hi</h1>,
  },
  {
    number: 2,
    name: "Transportation",
    path: "2",
  },
  {
    number: 3,
    name: "Accommodation",
    path: "3",
  },
  {
    number: 4,
    name: "Restaurant Reservation",
    path: "4",
  },
  {
    number: 5,
    name: "Activities",
    path: "5",
  },
  {
    number: 6,
    name: "Notes",
    path: "6",
  },
  {
    number: 7,
    name: "Trip Summary",
    path: "7",
  },
];

export default () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LandingPage showUserData={false} />} />
          <Route path="/" element={<SideNavigation navPaths={paths} />}>
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="itineraries">
              <Route index element={<ItineraryPage />} />
              <Route path=":id" element={<ItineraryDetailsPage />} />
              <Route
                path="1/create"
                element={<NavBar steps={createItinerarySteps} />}
              >
                <Route path="1" element={<AddItineraryPage />} />
                <Route path="2" element={<AddTransportationPage />} />
                <Route path="3" element={<h1>hi</h1>} />
                <Route path="4" element={<h1>hi</h1>} />
                <Route path="5" element={<AddActivitiesPage />} />
                <Route path="6" element={<h1>hi</h1>} />
                <Route path="7" element={<AddActivitiesPage />} />
              </Route>
            </Route>
            <Route path="/chat">
              <Route index element={<ChatPage />} />
              <Route path=":channelId" element={<ChatPage />} />
            </Route>
            <Route path="profile" element={<ProfilePage />} />
            <Route
              path="*"
              element={<Navigate to="/dashboard" replace={true} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
