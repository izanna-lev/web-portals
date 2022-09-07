import NavigationOption from "../sub-components/NavigationOption";
import { ICON } from "../../constants";
import styles from "./index.module.scss";

const SideNavBar = () => (
  <nav className={`${styles["navigation-sidebar"]} `}>
    {NavigationOption("Dashboard", ICON.DASHBOARD_INACTIVE)}
    {NavigationOption(
      "Assigned Itineraries",
      ICON.ITINERARIES_INACTIVE,
      "itineraries"
    )}
    {NavigationOption("Chat", ICON.CHAT_INACTIVE)}
    {NavigationOption("Cancel Request", ICON.CANCELLED_ITINERARIES_INACTIVE)}
    {NavigationOption(
      "Send Notifications",
      ICON.NOTIFICATIONS_INACTIVE,
      "notifications"
    )}
    {NavigationOption("Profile", ICON.PROFILE_INACTIVE)}
  </nav>
);

export default SideNavBar;
