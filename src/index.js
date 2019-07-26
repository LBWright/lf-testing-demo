import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";

const submitRequest = async data => {
  await axios.get("/");
  return { logged: true };
};

ReactDOM.render(
  <App submitRequest={submitRequest} />,
  document.getElementById("root")
);
