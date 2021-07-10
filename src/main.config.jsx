import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Config from "./Config.jsx";
import { TwitchExtProvider } from "./TwitchExt";

ReactDOM.render(
  <React.StrictMode>
    <TwitchExtProvider>
      <Config />
    </TwitchExtProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
