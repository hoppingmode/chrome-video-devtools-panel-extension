import { storage, TExtensionStorageVideo } from "@shared";
import { createContextMenu } from "./context-menu";

chrome.runtime.onInstalled.addListener(() => {
  console.log("Video Network Request Preview extension started.");
  createContextMenu();

  chrome.devtools.panels.create(
    "Video Network Request Preview",
    "assets/icon-48.png",
    "devtools_panel.html",
    async (panel) => {
      console.log("DevTools panel created:", panel);
      await storage.init();

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
});
