import { useSwiperSlide } from "swiper/react";

import VideoPlayerCover from "@/components/VideoPlayer/VideoPlayerCover";
import CoreVideoPlayer from "@/components/VideoPlayer/CoreVideoPlayer";

import { useVideoQuery } from "@/hooks/useVideoQuery";
import Loading from "@/components/loading/Loading";
import { use, useEffect, useId } from "react";

interface VideoPlayerProps {
  programId: number;
  seasonId: number;
  episodeNumber: number;
}

function VideoPlayer({ programId, seasonId, episodeNumber }: VideoPlayerProps) {
  const swiperSlide = useSwiperSlide();

  const id = useId();

  const {
    data: videoInfo,
    isLoading,
    isPending,
  } = useVideoQuery(seasonId, episodeNumber, "HLS");

  if (isLoading) return <Loading />;

  return (
    <>
      <CoreVideoPlayer
        plaerId={id}
        videoInfo={videoInfo}
        isActive={swiperSlide.isActive}
      />
      <VideoPlayerCover plaerId={id} />
    </>
  );
}

export default VideoPlayer;
