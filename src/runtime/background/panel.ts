import { AnchorElementBuilder, FlexBoxElementBuilder, ImageElementBuilder } from "runtime/services/dom-element-generators";
import { ExtensionLocalStorage } from "runtime/services/storage";


document.addEventListener("DOMContentLoaded", () => {
  const videoList = document.getElementById("video-list");
  if (videoList) {
    chrome.storage.local.get<ExtensionLocalStorage>(["videos"], (result) => {
      const videos = result.videos ?? [];

      videos.forEach((video) => {
        const container = FlexBoxElementBuilder.new()
          .backgroundColor("#1b1b1b")
          .direction("row")
          .justifyContent("space-around")
          .insert(videoList);
        ImageElementBuilder.new().src(video.thumbnailUrl).insert(container);
        AnchorElementBuilder.new()
          .text(video.name)
          .href(video.url)
          .insert(container);

        videoList.appendChild(container);
      });
    });
  }
});
