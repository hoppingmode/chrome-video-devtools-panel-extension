import { ExtensionStorageVideo, storeVideo } from "@shared";

chrome.devtools.panels.create(
  "Video Network Request Preview",
  "assets/icon-48.png",
  "devtools_page.html",
  (panel) => {
    console.log("DevTools panel created:", panel);
  }
);

chrome.webRequest.onCompleted.addListener(
  async (details) => {
    console.log("A web request completed:", details);

    const url = details.url;

    if (url.endsWith(".mp4") || url.endsWith(".m3u8")) {
      console.log("Video URL detected:", url);

      const video: ExtensionStorageVideo = { name: url.split("/").pop(), url, thumbnailUrl: "" };
      await storeVideo(video);
      console.log("Added video to storage: ", video);
    }
  },
  {
    urls: ["<all_urls>"],
    types: ["media"]
  }
);
