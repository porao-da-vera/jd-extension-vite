import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Broadcaster from "./Broadcaster.jsx";
import { TwitchExtProvider } from "./TwitchExt";

ReactDOM.render(
  <React.StrictMode>
    <TwitchExtProvider>
      <Broadcaster />
    </TwitchExtProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
