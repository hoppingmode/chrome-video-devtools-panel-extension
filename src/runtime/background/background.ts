import { createDevtoolsPanel } from "./devtools-panel/devtools-panel";

chrome.runtime.onStartup.addListener(() => {
  console.log("Video Network Request Preview extension started.");
  createDevtoolsPanel();
})