import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { WorkList } from "./WorkList";
import { WorkDetail } from "./WorkDetail";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useRegisterFmcTokenMutation } from "../generated/graphql";

function App() {
  const [logined, setLogined] = useState<boolean>(false);
  const [fcmToken, setFcmToken] = useState<string>();

  const [registerToken] = useRegisterFmcTokenMutation({
    variables: {
      token: fcmToken!,
      device: "web",
    },
  });

  useEffect(() => {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        setLogined(true);
        const messaging = getMessaging();
        return getToken(messaging, {
          vapidKey: process.env.REACT_APP_FIREBASE_VAPID || "",
        });
      })
      .then((token) => {
        if (token) {
          console.log(`fcm: ${token}`);
          setFcmToken(token);
          registerToken().then(() => {});
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          );
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorMessage}, code = ${errorCode}`);
      });

    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
    });
  }, [registerToken]);

  const render = () => {
    if (logined) {
      return (
        <Router>
          <Routes>
            <Route path="/" element={<WorkList />} />
            <Route path="/:work_id" element={<WorkDetail />} />
          </Routes>
        </Router>
      );
    } else {
      return <div className="fixed w-full h-screen dark:bg-gray-800"></div>;
    }
  };

  return <div>{render()}</div>;
}

export default App;
