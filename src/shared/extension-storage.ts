export type ExtensionStorageVideo = {
  name: string;
  url: string;
  thumbnailUrl: string;
};

export type ExtensionStorage = {
  videos: ExtensionStorageVideo[];
};

export function getExtensionStorage(): Promise<ExtensionStorage> {
  return chrome.storage.local.get<ExtensionStorage>("videos");
}

export async function storeVideo(video: ExtensionStorageVideo): Promise<void> {
  const storage = await getExtensionStorage();
  if (!storage.videos) {
    storage.videos = [video];
  }

  storage.videos.push(video);
}
