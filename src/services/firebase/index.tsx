// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

import { FIREBASE_CONFIG } from "../../constants";

// Initialize Firebase
export const firebaseApp = initializeApp(FIREBASE_CONFIG);
export const messaging = getMessaging(firebaseApp);
