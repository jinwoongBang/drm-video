"use client";

import { VideoData } from "@/components/shorts/ShortsSwiper";
import { ShakaPlayerController } from "@/libs/ShakaPlayerController";
import { isVideoPlayingState } from "@/store/video";
import { VideoPlayInfo } from "@/types/response";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

interface VideoPlayerProps {
  videoInfo?: VideoPlayInfo | null;
  isActive: boolean;
}

function VideoPlayer({ videoInfo, isActive }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shakaPlayerControllerRef = useRef(new ShakaPlayerController());

  const [isInit, setIsInit] = useState(false);

  const [isVideoPlaying, setIsVideoPlaying] =
    useRecoilState(isVideoPlayingState);

  useEffect(() => {
    if (isActive) {
      shakaPlayerControllerRef.current
        .initApp(videoRef.current as HTMLVideoElement)
        .then(() => {
          setIsInit(true);
        })
        .then(() => {
          shakaPlayerControllerRef.current.loadVideo(videoInfo?.url as string);
        });
    } else {
      shakaPlayerControllerRef.current.detach();
    }

    return () => {
      shakaPlayerControllerRef.current.detach();
    };
  }, [videoInfo, isActive]);

  return (
    <section className="relative flex justify-center align-middle w-screen h-screen">
      {isActive && (
        <video
          ref={videoRef}
          // src={videoInfo?.url}
          className="max-w-[572px] w-full"
          //   controls
          poster={
            "https://content.vigloo.com/media/kr010/p01/s01/e001/thumbnails/3dfd04bd9b6946fa99bf54c28c93d628_thumbnail.0000000.jpg"
          }
          loop
          playsInline
          autoPlay={true}
          muted={true}
        />
      )}
    </section>
  );
}

export default VideoPlayer;
