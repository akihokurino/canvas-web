importScripts("https://www.gstatic.com/firebasejs/5.7.3/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.7.3/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "${REACT_APP_FIREBASE_API_KEY}",
  authDomain: "canvas-329810.firebaseapp.com",
  projectId: "canvas-329810",
  storageBucket: "canvas-329810.appspot.com",
  messagingSenderId: "1077059530284",
  appId: "1:1077059530284:web:95fd5ede890db7a356eb89",
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
});

messaging.onMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received foreground message ",
    payload
  );
});
