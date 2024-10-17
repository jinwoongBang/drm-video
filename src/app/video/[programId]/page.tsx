import getQueryClient from "@/query";
import { getProgram, getVideoList } from "@/service";

import ShortsSwiper from "@/components/shorts/ShortsSwiper";
import ProgramInfoProvider from "@/app/video/[programId]/component/ProgramInfoProvider";

interface VideoData {
  id: string;
  videoUrl: string;
}

const videoData: VideoData[] = [
  { id: "1", videoUrl: "http://localhost:3000/video/ForBiggerBlazes.mp4" },
  { id: "2", videoUrl: "http://localhost:3000/video/ForBiggerBlazes.mp4" },
  { id: "3", videoUrl: "http://localhost:3000/video/ForBiggerBlazes.mp4" },
  { id: "4", videoUrl: "http://localhost:3000/video/ForBiggerBlazes.mp4" },
  { id: "5", videoUrl: "http://localhost:3000/video/ForBiggerBlazes.mp4" },
];

async function Page({ params }: { params: { programId: string } }) {
  const programId = Number(params.programId);

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["program", programId],
    queryFn: () => getProgram(programId),
  });
  await queryClient.prefetchQuery({
    queryKey: ["videoList", programId],
    queryFn: () => getVideoList(programId),
  });

  return (
    <ProgramInfoProvider programId={programId}>
      <div className="flex flex-col items-center justify-center h-screen">
        <ShortsSwiper programId={programId} />
      </div>
    </ProgramInfoProvider>
  );
}

export default Page;
