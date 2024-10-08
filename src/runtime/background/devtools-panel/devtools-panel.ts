export function createDevtoolsPanel() {
  chrome.devtools.panels.create(
    "Video Network Request Preview",
    "assets/icon-48.png",
    "panel.html",
    (panel) => {
      console.log("DevTools panel created:", panel);
    }
  );
}

