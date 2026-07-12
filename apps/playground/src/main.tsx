import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@behindthemusictree/brand/styles";
import "@behindthemusictree/brand/styles/icon-links.css";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
