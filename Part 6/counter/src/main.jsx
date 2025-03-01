// eslint-disable-next-line no-unused-vars
import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// @ts-ignore
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
