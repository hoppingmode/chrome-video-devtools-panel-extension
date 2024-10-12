import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { storage, TExtensionStorageVideo } from "@shared";

export function VideoRequestList() {
  const { isPending, error, data } = useQuery({
    queryKey: ["extensionStorage"],
    queryFn: () => storage.get()
  });

  useEffect(() => {
    const onStorageChanged = async () => {
      await storage.get();
    };

    chrome.storage.onChanged.addListener(onStorageChanged);

    return () => {
      chrome.storage.onChanged.removeListener(onStorageChanged);
    };
  }, []);

  return (
    <div>
      <h1>Video Requests</h1>
      <ul>
        {isPending && <li>Loading...</li>}
        {error && <li>Error: {error.message}</li>}
        {data?.videos &&
          data.videos.map((video: TExtensionStorageVideo) => (
            <li key={video.url}>
              <a href={video.url} target="_blank" rel="noreferrer">
                {video.name}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}
