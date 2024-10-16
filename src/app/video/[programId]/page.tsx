import ShortsSwiper from "@/components/shorts/ShortsSwiper";
import getQueryClient, { getProgram } from "@/query";

interface VideoData {
  id: string;
  videoUrl: string;
}

const videoData: VideoData[] = [
  { id: "1", videoUrl: "http://localhost:3000/video/ForBiggerBlazes.mp4" },
  { id: "2", videoUrl: "http://localhost:3000/video/ForBiggerBlazes.mp4" },
  { id: "3", videoUrl: "http://localhost:3000/video/ForBiggerBlazes.mp4" },
];

async function Page({ params }: { params: { programId: string } }) {
  const { programId } = params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["videos", programId],
    queryFn: () => getProgram(programId),
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <ShortsSwiper videos={videoData} programId={programId} />
    </div>
  );
}

export default Page;
