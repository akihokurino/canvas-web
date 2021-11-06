importScripts("https://www.gstatic.com/firebasejs/5.7.3/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.7.3/firebase-messaging.js");

firebase.initializeApp({
  messagingSenderId: "1077059530284",
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    title: "push-test-web",
    body: "push-test-web: Background Message body",
    icon: "/favicon.ico",
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
