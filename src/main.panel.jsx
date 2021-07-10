import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Panel from "./Panel.jsx";
import { TwitchExtProvider } from "./TwitchExt";

ReactDOM.render(
  <React.StrictMode>
    <TwitchExtProvider>
      <Panel />
    </TwitchExtProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
