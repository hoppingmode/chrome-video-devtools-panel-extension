export async function getActiveTabId(): Promise<number> {
  const activeTabs = await chrome.tabs.query({ active: true, currentWindow: true });

  if (activeTabs.length === 0) {
    return null;
  }

  return activeTabs[0].id;
}
