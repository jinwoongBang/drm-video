import { useSwiperSlide } from "swiper/react";

import VideoPlayerCover from "@/components/VideoPlayer/VideoPlayerCover";
import CoreVideoPlayer from "@/components/VideoPlayer/CoreVideoPlayer";

import { useVideoQuery } from "@/hooks/useVideoQuery";
import Loading from "@/components/loading/Loading";

interface VideoPlayerProps {
  programId: number;
  seasonId: number;
  episodeNumber: number;
}

function VideoPlayer({ programId, seasonId, episodeNumber }: VideoPlayerProps) {
  const swiperSlide = useSwiperSlide();

  const { data: videoInfo, isLoading } = useVideoQuery(
    seasonId,
    episodeNumber,
    "HLS"
  );

  if (isLoading) return <Loading />;

  return (
    <>
      <CoreVideoPlayer videoInfo={videoInfo} isActive={swiperSlide.isActive} />
      <VideoPlayerCover />
    </>
  );
}

export default VideoPlayer;
