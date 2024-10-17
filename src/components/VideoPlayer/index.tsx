import VideoPlayerCover from "@/components/VideoPlayer/VideoPlayerCover";
import CoreVideoPlayer from "@/components/VideoPlayer/CoreVideoPlayer";

import { useSwiperSlide } from "swiper/react";
import { use, useEffect } from "react";
import { useVideoQuery } from "@/hooks/useVideoQuery";

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

  useEffect(() => {
    console.log("swiperSlide", swiperSlide);
    return () => {
      console.log("swiperSlide", swiperSlide);
    };
  }, [swiperSlide]);

  useEffect(() => {
    console.log("videoInfo", videoInfo);
  }, [videoInfo]);

  if (isLoading) return <div>로딩중...</div>;

  return (
    <>
      <CoreVideoPlayer videoInfo={videoInfo} isActive={swiperSlide.isActive} />
      <VideoPlayerCover />
    </>
  );
}

export default VideoPlayer;
