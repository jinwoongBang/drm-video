import getQueryClient, { getProgram } from "@/query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default async function VideoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>{children}</main>
      <ReactQueryDevtools initialIsOpen={false} />
    </HydrationBoundary>
  );
}
