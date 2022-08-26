/**
 * This file defines application level constants
 */


const S3_URL = process.env.REACT_APP_S3_URL;
const ASSET_URL = process.env.REACT_APP_ASSET_URL;


export const SERVER_BASE_URL = "http://44.209.25.93:3000/api/";

export const APPLICATION_ROUTES = {
  LOGIN: `${SERVER_BASE_URL}specialist/login`,
  DETAILS: `${SERVER_BASE_URL}specialist/details`,
  DASHBOARD: `${SERVER_BASE_URL}specialist/dashboard`,

  ITINERARIES: `${SERVER_BASE_URL}itinerary/list`,
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


type tplotOptions = {
  [key: number]: string
}

export const ITINERARY_STATUS: tplotOptions = {
	1: "ongoing",
	2: "upcoming",
	3: "cancelled",
	4: "pending",
	5: "completed",
};