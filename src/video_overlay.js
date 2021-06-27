import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Viewer from "./Viewer.jsx";

const root = document.createElement("DIV");
root.classList.add('root');
ReactDOM.render(<Viewer />, document.body.appendChild(root));
