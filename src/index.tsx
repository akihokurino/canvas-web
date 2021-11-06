import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./ui/App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "",
  authDomain: "canvas-329810.firebaseapp.com",
  projectId: "canvas-329810",
  storageBucket: "canvas-329810.appspot.com",
  messagingSenderId: "1077059530284",
  appId: "1:1077059530284:web:95fd5ede890db7a356eb89",
};

initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
