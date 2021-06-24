import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { TwitchExtProvider } from "./TwitchExt";
import Panel from "./Panel";
import Config from "./Config";
import Broadcaster from "./Broadcaster";
import Mobile from "./Mobile";
import VideoComponent from "./VideoComponent";
import VideoOverlay from "./VideoOverlay";

export default function App() {
  return (
    <TwitchExtProvider>
      <Router>
        <Switch>
          <Route path="/panel.html">
            <Panel />
          </Route>
          <Route path="/config.html">
            <Config />
          </Route>
          <Route path="/broadcaster.html">
            <Broadcaster />
          </Route>
          <Route path="/mobile.html">
            <Mobile />
          </Route>
          <Route path="/video_component.html">
            <VideoComponent />
          </Route>
          <Route path="/video_overlay.html">
            <VideoOverlay />
          </Route>
          <Route path="/">
            <Redirect to="/panel.html" />
          </Route>
        </Switch>
      </Router>
    </TwitchExtProvider>
  );
}
