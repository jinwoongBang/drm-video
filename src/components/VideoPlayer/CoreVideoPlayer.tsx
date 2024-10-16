import { VideoData } from "@/components/shorts/ShortsSwiper";
import { isVideoPlayingState } from "@/store/video";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";

interface VideoPlayerProps {
  video: VideoData;
  isActive: boolean;
}

function VideoPlayer({ video, isActive }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] =
    useRecoilState(isVideoPlayingState);

  useEffect(() => {
    // console.log("video", video);
    // console.log("isActive", isActive);
  }, [video, isActive]);

  useEffect(() => {
    if (isActive) {
      if (isVideoPlaying) {
        videoRef.current?.play();
      } else {
        videoRef.current?.pause();
      }
    }
  }, [isVideoPlaying, isActive]);

  return (
    <section className="relative flex justify-center align-middle w-screen h-screen">
      <video
        ref={videoRef}
        src={video.videoUrl}
        className="max-w-[572px] w-full"
        //   controls
        loop
        playsInline
        autoPlay={false}
        muted={true}
      />
    </section>
  );
}

export default VideoPlayer;
