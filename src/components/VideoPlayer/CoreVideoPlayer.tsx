"use client";

import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { ShakaPlayerController } from "@/libs/ShakaPlayerController";
import { errorState } from "@/store/error";
import {
  isVideoLoadingState,
  isVideoPlayingState,
  videoCurrentTimeState,
  videoDurationState,
  videoElementState,
} from "@/store/video";
import { VideoPlayInfo } from "@/types/response";

interface VideoPlayerProps {
  videoInfo?: VideoPlayInfo | null;
  isActive: boolean;
  plaerId: string;
}

function VideoPlayer({ videoInfo, isActive, plaerId }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shakaPlayerControllerRef = useRef(new ShakaPlayerController());

  const [isInit, setIsInit] = useState(false);

  const [isVideoPlaying, setIsVideoPlaying] =
    useRecoilState(isVideoPlayingState);

  const [isVideoLoading, setIsVideoLoading] =
    useRecoilState(isVideoLoadingState);

  const [videoCurrentTime, setVideoCurrentTime] = useRecoilState(
    videoCurrentTimeState
  );

  const [videoDuration, setVideoDuration] = useRecoilState(videoDurationState);

  const setVideoElementState = useSetRecoilState(videoElementState);
  const setError = useSetRecoilState(errorState);

  useEffect(() => {
    if (isActive) {
      console.log(`init :: ${plaerId}`);
      shakaPlayerControllerRef.current
        .initApp(videoRef.current as HTMLVideoElement)
        .then(() => {
          setIsInit(true);
          setVideoElementState(videoRef.current);
          shakaPlayerControllerRef.current.setErrorEventHandler((error) => {
            setError(error);
          });
        })
        .then(() => {
          shakaPlayerControllerRef.current.loadVideo({
            // hls: "",
            // dash: "",
            // hls: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
            // dash: "https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd",
            hls: videoInfo?.hls.url || "",
            dash: videoInfo?.dash.url || "",
          });
        });
    } else {
      setIsInit(false);
      setIsVideoPlaying(false);
      setVideoCurrentTime(0);
      shakaPlayerControllerRef.current.detach();
    }

    return () => {
      setIsInit(false);
      setIsVideoPlaying(false);
      setVideoCurrentTime(0);
      shakaPlayerControllerRef.current.detach();
    };
  }, [videoInfo, isActive]);

  useEffect(() => {
    isVideoPlaying ? videoRef.current?.play() : videoRef.current?.pause();
  }, [isVideoPlaying]);

  const handleLoadStart = () => {
    console.debug("onLoadStart");
  };

  const handleLoadedMetadata = () => {
    console.debug("onLoadedMetadata");
  };

  const handleLoadedData = () => {
    console.debug("onLoadedData");
  };

  const handleWaiting = () => {
    console.debug("onWaiting");
    setIsVideoLoading(true);
  };

  const handleCanPlay = () => {
    console.debug("onCanPlay");
    setIsVideoLoading(false);
  };

  const handleTimeUpdate = () => {
    console.debug("onTimeUpdate");
    setVideoCurrentTime(videoRef.current?.currentTime || 0);
  };

  const handleDurationChange = () => {
    console.debug("onDurationChange");
    setVideoDuration(videoRef.current?.duration || 0);
  };

  return (
    <section className="relative flex justify-center align-middle w-screen h-screen">
      {isActive && (
        <video
          ref={videoRef}
          // src={videoInfo?.url}
          className="max-w-sm w-full"
          //   controls
          poster={
            "https://content.vigloo.com/media/kr010/p01/s01/e001/thumbnails/3dfd04bd9b6946fa99bf54c28c93d628_thumbnail.0000000.jpg"
          }
          loop
          playsInline
          autoPlay={false}
          muted={true}
          onLoadStart={handleLoadStart}
          onLoadedMetadata={handleLoadedMetadata}
          onLoadedData={handleLoadedData}
          onWaiting={handleWaiting}
          onCanPlay={handleCanPlay}
          onTimeUpdate={handleTimeUpdate}
          onDurationChange={handleDurationChange}
        />
      )}
    </section>
  );
}

export default VideoPlayer;
