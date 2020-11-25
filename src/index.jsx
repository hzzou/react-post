import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";

const hacks = require("viewport-units-buggyfill/viewport-units-buggyfill.hacks");

//解决兼容问题
require("viewport-units-buggyfill").init({
  hacks: hacks
});

ReactDOM.render(<App />, document.querySelector("#root"));
