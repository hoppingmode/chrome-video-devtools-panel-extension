import React from "react";
import { createRoot } from "react-dom/client";
import { VideoNetworkRequestPage } from "./VideoRequestPage/Page";

const documentRoot = document.getElementById("root");

createRoot(documentRoot).render(<VideoNetworkRequestPage />);
