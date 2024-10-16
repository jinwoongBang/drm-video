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
import {
  isShowVideoCoverState,
  isVideoPlayingState,
  selectedEpisodeIndexState,
  selectedProgramIdState,
} from "@/store/video";

export interface VideoData {
  id: string;
  videoUrl: string;
}

interface ShortsSwiperProps {
  videos: VideoData[];
  programId: string;
}

const ShortsSwiper: React.FC<ShortsSwiperProps> = ({ videos, programId }) => {
  const router = useRouter();

  const setSelectedProgramId = useSetRecoilState(selectedProgramIdState);
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useRecoilState(
    selectedEpisodeIndexState
  );

  const [isShowVideoCover, setIsShowVideoCover] = useRecoilState(
    isShowVideoCoverState
  );
  const [isVideoPlaying, setIsVideoPlaying] =
    useRecoilState(isVideoPlayingState);

  useEffect(() => {
    setSelectedProgramId(programId);
  }, [programId]);

  useEffect(() => {
    router.push(`/video/${programId}?episodeId=${selectedEpisodeIndex}`, {
      scroll: false,
    });
  }, [selectedEpisodeIndex]);

  const handleSlideChange = (swiper: SwiperClass) => {
    setSelectedEpisodeIndex(swiper.activeIndex);
  };

  return (
    <Swiper
      direction="vertical"
      slidesPerView={1}
      spaceBetween={0}
      initialSlide={selectedEpisodeIndex >= 0 ? selectedEpisodeIndex : 0}
      //   navigation
      //   pagination={{ clickable: true }}
      modules={[Virtual]}
      onSlideChange={handleSlideChange}
      className="h-full"
      virtual
      onClick={(event) => {
        setIsShowVideoCover((state: boolean) => !state);
      }}
      onDoubleClick={(event) => {
        setIsShowVideoCover(true);
        setIsVideoPlaying((state) => !state);
      }}
    >
      {videos.map((video, index) => (
        <SwiperSlide key={video.id} virtualIndex={index}>
          <VideoPlayer video={video} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ShortsSwiper;
