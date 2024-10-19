"use client";

import React, { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useRecoilState, useSetRecoilState } from "recoil";

import { useRouter, useSearchParams } from "next/navigation";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Virtual } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import VideoPlayer from "@/components/VideoPlayer";
import VideoPlayerCover from "@/components/VideoPlayer/VideoPlayerCover";
import { isShowVideoCoverState, isVideoPlayingState } from "@/store/video";
import {
  selectedProgramIdState,
  selectedProgramInfoState,
} from "@/store/program";
import { useVideoListQuery } from "@/hooks/useVideoQuery";

export interface VideoData {
  id: string;
  programId: number;
  seasonId: number;
  episodeNumber: number;
}

interface ShortsSwiperProps {
  programId: number;
}

const ShortsSwiper: React.FC<ShortsSwiperProps> = ({ programId }) => {
  const router = useRouter();

  const [{ episodeIndex, seasonIndex }, setSelectedProgramInfo] =
    useRecoilState(selectedProgramInfoState);

  const [isShowVideoCover, setIsShowVideoCover] = useRecoilState(
    isShowVideoCoverState
  );
  const [isVideoPlaying, setIsVideoPlaying] =
    useRecoilState(isVideoPlayingState);

  const { data: videoList } = useVideoListQuery(programId);

  useEffect(() => {
    router.push(`/video/${programId}?episodeId=${episodeIndex}`, {
      scroll: false,
    });
  }, [programId, episodeIndex]);

  const handleSlideChange = (swiper: SwiperClass) => {
    setIsShowVideoCover(true);
    setSelectedProgramInfo((state) => ({
      ...state,
      episodeIndex: swiper.activeIndex,
    }));
  };

  return (
    <Swiper
      direction="vertical"
      slidesPerView={1}
      spaceBetween={0}
      initialSlide={episodeIndex >= 0 ? episodeIndex : 0}
      //   navigation
      //   pagination={{ clickable: true }}
      modules={[Virtual]}
      onSlideChange={handleSlideChange}
      className="h-full"
      virtual
    >
      {videoList?.videos
        .filter((video) => video.format === "HLS")
        .map((video, index) => (
          <SwiperSlide key={video.episodeNumber} virtualIndex={index}>
            <VideoPlayer
              programId={programId}
              seasonId={video.seasonId}
              episodeNumber={video.episodeNumber}
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default ShortsSwiper;
