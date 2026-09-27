import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { captureCampaignFromUrl } from "@/lib/sourceCode";
import { captureTrackingFromUrl } from "@/lib/tracking";
import "./i18n";
import "./index.css";

if (
  window.location.pathname
    .replace(/\/+$/, "")
    .startsWith("/german-citizenship")
) {
  document.documentElement.classList.add("german-page-active");
  document.body.classList.add("german-page-active");
}

captureCampaignFromUrl();
captureTrackingFromUrl();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
