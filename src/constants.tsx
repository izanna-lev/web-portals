/**
 * This file defines application level constants
 */


const S3_URL = process.env.REACT_APP_S3_URL;
const ASSET_URL = process.env.REACT_APP_ASSET_URL;


export const SERVER_BASE_URL = "http://44.209.25.93:3000/api/";

export const APPLICATION_ROUTES = {
  LOGIN: `${SERVER_BASE_URL}specialist/login`,
  DASHBOARD: `${SERVER_BASE_URL}admin/stats`,
  USERS: `${SERVER_BASE_URL}admin/userList`,
  EDIT_USER: `${SERVER_BASE_URL}admin/editUser`,
  EXPORT: `${SERVER_BASE_URL}admin/exportCsv`,
  REPORTED_USERS: `${SERVER_BASE_URL}admin/reportList`,
  GROUP_LIST: `${SERVER_BASE_URL}admin/eventList`,
  DELETE_GROUP: `${SERVER_BASE_URL}admin/deleteEvent`,
  NOTIFICATION_BROADCAST: `${SERVER_BASE_URL}notification/broadcast`,
  APP_DETAILS: `${SERVER_BASE_URL}appDetail/list`,
  EDIT_APP_DETAILS: `${SERVER_BASE_URL}appDetail/add`,
  FAQ_ADD: `${SERVER_BASE_URL}faq/add`,
  FAQ_DELETE: `${SERVER_BASE_URL}faq/delete`,
  FAQ_EDIT: `${SERVER_BASE_URL}faq/update`,
  FAQ_LIST: `${SERVER_BASE_URL}faq/list`,
  GOOGLE_PLACE: `${SERVER_BASE_URL}admin/googlePlaceDetails`,
  PLACES_DETAILS: `${SERVER_BASE_URL}admin/placeid`,
};

export const IMAGE_PREFIXES = {
  IMAGE_SMALL: `${S3_URL}small/`,
  IMAGE_AVERAGE: `${S3_URL}average/`,
  IMAGE_BEST: `${S3_URL}best/`,
};

export const ASSETS = {
  SIGNIN: `${ASSET_URL}signin.png`,
  CROSS: `${ASSET_URL}cross.png`,
  LOGO_LOGIN: `${ASSET_URL}logo.png`,
  IMAGE_PLACEHOLDER: `${ASSET_URL}placeholder.png`,
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

// ////////// SETTINGS CONSTANT ///////////

export const settingsIndexer = {
  aboutUs: 1,
  faq: 2,
  termConditions: 3,
  privacyPolicy: 4,
};

// ///////// MODEL CONSTANT ////////////

export const MODAL_STATE = {
  NONE: 0,
};

// //////// NOTIFICATION LIST TYPE ///////

export const NOTIFICATION_LIST = {
  ALL: 0,
  SELECTED: 1,
  NONE: 2,
};

export const ADMIN_USER_ACTIONS = {
  VERIFIED: 1,
  BLOCKED: 2,
  UNBLOCKED: 3,
  DELETED: 4,
};

export const TRAVELER_ITINERARY_DETAILS = {
  TRAVELER: 1,
  ITINERARY: 2,
};


export const ITINERARY_TYPE = [{
  name: "One Day",
  value: 1
},{
  name: "Domestic Trip",
  value: 1
},{
  name: "International Trip",
  value: 1
}]

