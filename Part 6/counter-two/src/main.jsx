import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CounterContextProvider } from "./CounterContext";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <CounterContextProvider>
    <App />
  </CounterContextProvider>
);
