export type TExtensionStorageVideo = {
  name: string;
  url: string;
  thumbnailUrl: string;
};

export type TExtensionStorage = {
  videos: TExtensionStorageVideo[];
};

export class ExtensionStorage {
  constructor() {}

  public async init() {
    await chrome.storage.local.set({ videos: [] });
    return this;
  }

  public async get(): Promise<TExtensionStorage> {
    return chrome.storage.local.get<TExtensionStorage>("videos");
  }

  public async put(video: TExtensionStorageVideo) {
    const storage = await this.get();
    const videos = storage.videos || [];
    videos.push(video);

    await chrome.storage.local.set({ ...storage, videos });
  }
}

export const storage = new ExtensionStorage();
