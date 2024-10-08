export const ContextMenuItems: Record<string, chrome.contextMenus.CreateProperties> = {
  "Video Network Request Preview": {
    id: "open-devtools-panel-menu-item",
    title: "Open DevTools Panel",
    contexts: ["action"]
  }
};

export async function createMenuItems() {
  return new Promise<string[]>((resolve) => {
    const menuItemsCreated: string[] = [];

    Object.values(ContextMenuItems).forEach((menuItem) => {
      chrome.contextMenus.create(menuItem, () => {
        console.log("Context menu item created: ", menuItem.title);
        menuItemsCreated.push(menuItem.id);
      });
    });
    resolve(menuItemsCreated);
  });
}

export function createContextMenu() {
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === ContextMenuItems["Video Network Request Preview"].id) {
      console.log("Opening DevTools panel");
    }
  });

  createMenuItems();
}
