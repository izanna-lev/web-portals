import NavigationOption from "../sub-components/NavigationOption";
import { useAppSelector } from "../../store/hooks";
import { ICON } from "../../assets/index";
import styles from "./index.module.scss";

const SideNavBar = () => {
  const { access } = useAppSelector((state) => state.profile);
  const sidebar = useAppSelector((state) => state.appData.sidebarSmall);
  const { totalUnseenChats } = useAppSelector((state) => state.chatList);

  return (
    <nav
      className={`${styles["navigation-sidebar"]} ${
        sidebar ? styles["small-navigation-sidebar"] : ""
      }`}
    >
      {NavigationOption("Dashboard", ICON.DASHBOARD_INACTIVE)}

      {NavigationOption(
        "Assigned Itineraries",
        ICON.ITINERARIES_INACTIVE,
        "itinerary"
      )}

      {NavigationOption("Chat", ICON.CHAT_INACTIVE, null, totalUnseenChats)}

      {NavigationOption(
        "Cancel Requests",
        ICON.CANCELLED_ITINERARIES_INACTIVE,
        "itineraries/cancelled"
      )}

      {access.sendNotifications
        ? NavigationOption(
            "Send Notifications",
            ICON.NOTIFICATIONS_INACTIVE,
            "notifications"
          )
        : null}

      {NavigationOption("Profile", ICON.PROFILE_INACTIVE)}
    </nav>
  );
};

export default SideNavBar;
