import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { VideoRequestList } from "./VideoRequestList/VideoRequestList";

export function VideoNetworkRequestPage() {
  const queryClient = new QueryClient();

  return (
    <div>
      <h1>Video Network Request Preview</h1>
      <p>Preview video network requests in the Chrome DevTools panel.</p>
      <div>
        <QueryClientProvider client={queryClient}>
          <VideoRequestList></VideoRequestList>
        </QueryClientProvider>
      </div>
    </div>
  );
}
