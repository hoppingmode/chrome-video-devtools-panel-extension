const ContextMenuItems: Array<{
  properties: chrome.contextMenus.CreateProperties;
  action: (...args: unknown[]) => void;
}> = [
  {
    properties: {
      id: "open-devtools-panel-menu-item",
      title: "Open DevTools Panel",
      contexts: ["action"]
    },
    action: () => {
      console.log("Opening DevTools panel");
    }
  }
];

async function createMenuItems() {
  ContextMenuItems.forEach((menuItem) => {
    chrome.contextMenus.create(menuItem.properties, () => {
      console.log("Context menu item created: ", menuItem.properties.title);
    });
  });
}

export function createContextMenu() {
  createMenuItems();
}
