import VideoPlayerCover from "@/components/VideoPlayer/VideoPlayerCover";
import CoreVideoPlayer from "@/components/VideoPlayer/CoreVideoPlayer";
import { VideoData } from "../shorts/ShortsSwiper";
import { useSwiperSlide } from "swiper/react";
import { useEffect } from "react";

interface VideoPlayerProps {
  video: VideoData;
}

function VideoPlayer({ video }: VideoPlayerProps) {
  const swiperSlide = useSwiperSlide();

  useEffect(() => {
    console.log("swiperSlide", swiperSlide);
    return () => {
      console.log("swiperSlide", swiperSlide);
    };
  }, [swiperSlide]);

  return (
    <>
      <CoreVideoPlayer video={video} isActive={swiperSlide.isActive} />
      <VideoPlayerCover />
    </>
  );
}

export default VideoPlayer;
