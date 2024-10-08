
export async function onWebRequestCompleted(details) {
    const url = details.url;

    if (url.endsWith(".mp4") || url.endsWith(".m3u8")) {
      chrome.storage.local.get(["videos"], (result) => {
        const videos = result.videos || [];
        videos.push({ name: url.split("/").pop(), url });
        chrome.storage.local.set({ videos });
      });
    }
  }
