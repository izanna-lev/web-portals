/**
 * This file defines application level constants
 */

const S3_URL = "https://app-onsite.s3.amazonaws.com/development/images/";
const ASSET_URL = "https://onsite-travel-assets.s3.amazonaws.com/";

export const SERVER_BASE_URL = "http://44.209.25.93:3000/api/";

export const APPLICATION_ROUTES = {
  LOGIN: `${SERVER_BASE_URL}specialist/login`,
  DETAILS: `${SERVER_BASE_URL}specialist/details`,
  DASHBOARD: `${SERVER_BASE_URL}specialist/dashboard`,

  ITINERARIES: `${SERVER_BASE_URL}itinerary/list`,
};

export const IMAGE_PREFIXES = {
  IMAGE_SMALL: `${S3_URL}small/`,
  IMAGE_AVERAGE: `${S3_URL}average/`,
  IMAGE_BEST: `${S3_URL}best/`,
};

export const ASSETS = {
  SIGNIN: `${ASSET_URL}signin.png`,
  IMAGE_PLACEHOLDER: `${ASSET_URL}placeholder.png`,

  // APP LOGO & BANNER

  APP_LOGO: `${ASSET_URL}logo.png`,
  APP_LOGO_BACKGROUND: `${ASSET_URL}ic_login-background.png`,

  // NAVBAR ICONS INACTIVE

  ACCESS_MANAGEMENT_INACTIVE: `${ASSET_URL}ic_access-management-inactive.svg`,
  CHAT_INACTIVE: `${ASSET_URL}ic_chat-inactive.svg`,
  DASHBOARD_INACTIVE: `${ASSET_URL}ic_home-inactive.svg`,
  ITINERARIES_INACTIVE: `${ASSET_URL}ic_itinerary-inactive.svg`,
  NOTIFICATIONS_INACTIVE: `${ASSET_URL}ic_notification_inactive.svg`,
  SETTINGS_INACTIVE: `${ASSET_URL}ic_settings-inactive.svg`,
  TRAVELLERS_INACTIVE: `${ASSET_URL}ic_travellers-inactive.svg`,

  // CHAT SCREEN ICONS

  CHAT_SEND: `${ASSET_URL}ic_send.svg`,
  CHAT_ADD: `${ASSET_URL}ic_add.svg`,

  // PAGINATION ICONS

  NEXT_PAGE: `${ASSET_URL}ic_next.svg`,
  PREV_PAGE: `${ASSET_URL}ic_previous.svg`,

  LOGOUT: `${ASSET_URL}ic_logout.svg`,
};

// ////////// NAVIGATION CONSTANT ///////////

export const navigationIndexer = {
  dashboard: 1,
  users: 2,
  groups: 3,
  reportedUsers: 4,
  notifications: 5,
  settings: 6,
};

export const TRAVELER_ITINERARY_DETAILS = {
  TRAVELER: 1,
  ITINERARY: 2,
};

export const ITINERARY_TYPE = [
  {
    name: "One Day",
    value: 1,
  },
  {
    name: "Domestic Trip",
    value: 1,
  },
  {
    name: "International Trip",
    value: 1,
  },
];

type tplotOptions = {
  [key: number]: string;
};

export const ITINERARY_STATUS: tplotOptions = {
  1: "ongoing",
  2: "upcoming",
  3: "cancelled",
  4: "pending",
  5: "completed",
};
