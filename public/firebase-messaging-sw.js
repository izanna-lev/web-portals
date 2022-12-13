importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDysxPbJS2KStgi-o1jjirSnOXtSeXG2X8",
  authDomain: "onsite-travel.firebaseapp.com",
  projectId: "onsite-travel",
  storageBucket: "onsite-travel.appspot.com",
  messagingSenderId: "757245140014",
  appId: "1:757245140014:web:6141547c58931e23a593bf",
  measurementId: "G-X1RMPLGFVY",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
