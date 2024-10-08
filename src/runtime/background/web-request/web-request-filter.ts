import { onWebRequestCompleted } from "./event-handlers";

chrome.webRequest.onCompleted.addListener(
  onWebRequestCompleted,
  { urls: ["<all_urls>"],types: ["media"] },
);