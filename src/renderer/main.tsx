import React from "react";
import { createRoot } from "react-dom/client";
import { storage, TExtensionStorageVideo } from "@shared";
import { VideoNetworkRequestPage } from "./VideoRequestPage/Page";

chrome.devtools.panels.create(
  "Video Network Request Preview",
  "assets/icon-48.png",
  "devtools_page.html",
  async (panel) => {
    console.log("DevTools panel created:", panel);
    await storage.init();

    const documentRoot = document.getElementById("root");

    createRoot(documentRoot).render(<VideoNetworkRequestPage />);

    chrome.webRequest.onCompleted.addListener(
      async (details) => {
        console.log("A web request completed:", details);

        const url = details.url;

        if (url.endsWith(".mp4") || url.endsWith(".m3u8")) {
          console.log("Video URL detected:", url);

          const video: TExtensionStorageVideo = {
            name: url.split("/").pop(),
            url,
            thumbnailUrl: ""
          };
          await storage.put(video);
          console.log("Added video to storage: ", video);
        }
      },
      {
        urls: ["<all_urls>"],
        types: ["media"]
      }
    );
  }
);
