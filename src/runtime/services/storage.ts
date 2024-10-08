type ExtensionLocalStorageVideo = {
  name: string;
  url: string;
  thumbnailUrl: string;
};

export type ExtensionLocalStorage = {
  videos: ExtensionLocalStorageVideo[];
};
