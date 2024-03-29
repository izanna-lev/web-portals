/**
 * This file defines application level constants
 */

// Global Environment Variables

const S3_URL = process.env.S3_URL;
const SERVER_TYPE = `${process.env.BRANCH}/`;
export const SOCKET_URL = process.env.SERVER || "";
export const API_URL = `${process.env.SERVER}api/` || "";

// Firebase config for push notifications

export const FIREBASE_CONFIG = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

export const FIREBASE_VAPID_KEY = process.env.FIREBASE_VAPID_KEY;

const IMAGE_URL = `${S3_URL}${SERVER_TYPE}images/`;

// Google Places Api Key

export const GOOGLE_API = process.env.GOOGLE_API;

// Available Image Quality Prefixes

export const IMAGE = {
  SMALL: `${IMAGE_URL}small/`,
  AVERAGE: `${IMAGE_URL}average/`,
  BEST: `${IMAGE_URL}best/`,
};

// All Server API Endpoints

export const API = {
  LOGIN: `${API_URL}specialist/login`,
  PROFILE: `${API_URL}specialist/details`,
  DASHBOARD: `${API_URL}specialist/dashboard`,
  UPDATE_PROFILE_IMAGE: `${API_URL}specialist/update`,

  // Itinerary (List & Actions)

  ITINERARIES: `${API_URL}itinerary/list`,
  ITINERARY_ADD: `${API_URL}itinerary/add`,
  ITINERARY_EDIT: `${API_URL}itinerary/edit`,
  ITINERARY_DETAILS: `${API_URL}itinerary/details`,
  ITINERARY_COMPLETE: `${API_URL}itinerary/complete`,
  ITINERARY_CANCEL: `${API_URL}itinerary/cancel`,
  ITINERARY_CANCEL_REQUESTS: `${API_URL}specialist/cancelRequestList`,

  // Itinerary Transportation (List & Actions)

  TRANSPORTATION_DATA: `${API_URL}transportation/list`,
  TRANSPORTATION_DELETE: `${API_URL}transportation/delete`,

  ADD_CAR: `${API_URL}transportation/addCar`,
  ADD_FERRY: `${API_URL}transportation/addTrainFerry`,
  ADD_FLIGHT: `${API_URL}transportation/addFlight`,
  ADD_TRAIN: `${API_URL}transportation/addTrainFerry`,

  EDIT_CAR: `${API_URL}transportation/editCar`,
  EDIT_FERRY: `${API_URL}transportation/editTrainFerry`,
  EDIT_FLIGHT: `${API_URL}transportation/editFlight`,
  EDIT_TRAIN: `${API_URL}transportation/editTrainFerry`,

  // Reservation (List & Actions)

  RESERVATION_DELETE: `${API_URL}reservation/delete`,
  RESERVATION_LIST: `${API_URL}reservation/list`,

  ACCOMODATION_ADD: `${API_URL}reservation/addAccommodation`,
  ACCOMODATION_EDIT: `${API_URL}reservation/editAccommodation`,

  ACTIVITY_ADD: `${API_URL}reservation/addActivity`,
  ACTIVITY_EDIT: `${API_URL}reservation/editActivity`,

  RESTAURANT_ADD: `${API_URL}reservation/addRestaurant`,
  RESTAURANT_EDIT: `${API_URL}reservation/editRestaurant`,

  // Notes (List & Actions)

  NOTE_ADD: `${API_URL}note/add`,
  NOTE_DELETE: `${API_URL}note/delete`,
  NOTE_EDIT: `${API_URL}note/edit`,
  NOTES_LIST: `${API_URL}note/list`,

  // Trip Summary (List)

  TRIP_LIST: `${API_URL}trip/list`,

  // Trip Days (List)

  DAYS_LIST: `${API_URL}trip/dayList`,

  // Submit Itinerary (List)

  SUBMIT_ITINERARY: `${API_URL}itinerary/submit`,

  // Upload Image

  IMAGE_UPLOAD: `${API_URL}transportation/upload`,

  // Socket

  MESSAGE_LIST: `${API_URL}chat/messageList`,
  CHAT_LIST: `${API_URL}chat/chatList`,
  CHAT_IMAGE: `${API_URL}chat/chatImage`,

  // Notifications
  TRAVELLER_LIST: `${API_URL}specialist/travellerList`,
  NOTIFICATION_LIST: `${API_URL}notification/specialistList`,
  BROADCAST: `${API_URL}specialist/broadcast`,
  LIST_TEMPLATE: `${API_URL}specialist/template`,
};

// Custom Constants

type ItineraryOptions = {
  [key: number]: string;
};

export const ITINERARY_STATUS: ItineraryOptions = {
  1: "Ongoing",
  2: "Upcoming",
  3: "Cancelled",
  4: "Pending",
  5: "Completed",
  6: "Expired",
};

export const ITINERARY_SECTION = {
  TRAVELER: 1,
  ITINERARY: 2,
  TRANSPORTATION: 3,
  ACCOMODATIONS: 4,
  RESTAURANT: 5,
  ACTIVITIES: 6,
  NOTES: 7,
  SUMMARY: 8,
};

export const PAYMENT_STATUS = [
  { name: "Unpaid", value: 1 },
  { name: "Paid", value: 2 },
];

export const NOTIFICATION = {
  ADMIN: 1,
  MESSAGE: 2,
  ASSIGN_SPECIALIST: 5,
};

export const RESERVATION_TYPE = {
  ACCOMMODATION: 1,
  RESTAURANT: 2,
  ACTIVITY: 3,
};

export const TRANSPORTATION_TYPE = {
  FLIGHT: 1,
  TRAIN: 2,
  FERRY: 3,
  CAR: 4,
};

export const TRAIN_CLASS = [
  { name: "Business", value: 1 },
  { name: "Economy", value: 2 },
];

export const FERRY_CLASS = [
  { name: "Business", value: 1 },
  { name: "Economy", value: 2 },
];

export const FLIGHT_CLASS = [
  { name: "Business", value: 1 },
  { name: "Economy", value: 2 },
  { name: "First Class", value: 3 },
];

export const ITINERARY_TYPE = [
  { name: "None", value: 0 },
  { name: "One Day", value: 1 },
  { name: "Domestic Trip", value: 2 },
  { name: "International Trip", value: 3 },
  // { name: "First Class", value: 3 },
];

export const ITINERARY_TYPE_MAP = {
  ONE_DAY: 1,
  DOMESTIC_TRIP: 2,
  INTERNATIONAL_TRIP: 3,
};

export const PLANNED_TRAVELLER = [
  { name: "I haven't even started", value: 1 },
  { name: "I have a few things planned but still have a lot to go", value: 2 },
  {
    name: "The important stuff is booked but I need to plan the itinerary",
    value: 3,
  },
];

export const TYPE_OF_MESSAGE = {
  TEXT: 1,
  IMAGE: 2,
  LINK: 3,
};

export const USER_TYPE = {
  USER: 1,
  SPECIALIST: 2,
};
