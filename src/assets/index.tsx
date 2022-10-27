import APP_LOGO from "./logo.png";
import APP_LOGO_BACKGROUND from "./ic_login-background.png";
import SIGNIN from "./signin.png";
import ADMIN from "./admin.svg";
import USER_PLACEHOLDER from "./placeholder.png";

import CHAT_ADD from "./action/ic_add.svg";
import CHAT_SEND from "./action/ic_send.svg";
import LOGOUT from "./action/ic_logout.svg";
import NEXT_PAGE from "./action/ic_next.svg";
import PREV_PAGE from "./action/ic_previous.svg";

import PENDING from "./status/ic_pending.svg";
import UPCOMING from "./status/ic_upcoming.svg";
import COMPLETED from "./status/ic_completed.svg";
import CANCELLED from "./status/ic_cancel.svg";
import ONGOING from "./status/ic_ongoing.svg";

import ACCESS_MANAGEMENT_INACTIVE from "./navigation/ic_access-management-inactive.svg";
import CANCELLED_ITINERARIES_INACTIVE from "./navigation/ic_cancel-requests_inactive.svg";
import CHAT_INACTIVE from "./navigation/ic_chat-inactive.svg";
import DASHBOARD_INACTIVE from "./navigation/ic_home-inactive.svg";
import ITINERARIES_INACTIVE from "./navigation/ic_itinerary-inactive.svg";
import NOTIFICATIONS_INACTIVE from "./navigation/ic_notification_inactive.svg";
import PROFILE_INACTIVE from "./navigation/ic_profile_inactive.svg";
import SETTINGS_INACTIVE from "./navigation/ic_settings-inactive.svg";
import TRAVELLERS_INACTIVE from "./navigation/ic_travellers-inactive.svg";

type IconOptions = {
  [key: string]: string;
};

// All Icon

export const ICON: IconOptions = {
  ADMIN,
  SIGNIN,
  LOGOUT,
  USER_PLACEHOLDER,

  // APP LOGO & BANNER
  APP_LOGO,
  APP_LOGO_BACKGROUND,

  // CHAT SCREEN ICONS
  CHAT_SEND,
  CHAT_ADD,

  // NAVBAR ICONS INACTIVE
  ACCESS_MANAGEMENT_INACTIVE,
  CANCELLED_ITINERARIES_INACTIVE,
  CHAT_INACTIVE,
  DASHBOARD_INACTIVE,
  ITINERARIES_INACTIVE,
  NOTIFICATIONS_INACTIVE,
  PROFILE_INACTIVE,
  SETTINGS_INACTIVE,
  TRAVELLERS_INACTIVE,

  // PAGINATION ICONS
  NEXT_PAGE,
  PREV_PAGE,

  // STATUS ICONS
  PENDING,
  UPCOMING,
  COMPLETED,
  CANCELLED,
  ONGOING,
};
