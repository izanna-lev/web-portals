// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";

import { FIREBASE_CONFIG } from "../../constants";

// Initialize Firebase
export const firebaseApp = initializeApp(FIREBASE_CONFIG);
// export const messaging = getMessaging(firebaseApp);

let messaging: any;

isSupported().then((res) => {
  if (res) {
    messaging = getMessaging(firebaseApp);
  }
});

export { messaging };
