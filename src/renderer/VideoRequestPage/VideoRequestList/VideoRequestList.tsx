import { useQuery } from "@tanstack/react-query";
import { ExtensionStorageVideo, getExtensionStorage } from "@shared";

export function VideoRequestList() {
  const { isPending, error, data } = useQuery({
    queryKey: ["extensionStorage"],
    queryFn: () => getExtensionStorage()
  });

  return (
    <div>
      <h1>Video Requests</h1>
      <ul>
        {(error && <li>Error: {error.message}</li>) ||
          data.videos.map((video: ExtensionStorageVideo) => <li key={video.url}>{video.name}</li>)}
      </ul>
    </div>
  );
}
