import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

reportWebVitals();

// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
// import axios from "axios";

// axios.defaults.baseURL = "https://www.server.ebmc.ae";

// axios.defaults.withCredentials = true;

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);

// reportWebVitals();
