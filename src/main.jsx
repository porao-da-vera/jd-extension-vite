import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Router from "./Router";
window.Twitch.ext.rig.log(window.Twitch.ext.viewer.sessionToken);
ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById("root")
);
