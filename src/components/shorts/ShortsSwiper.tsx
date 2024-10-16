"use client";

import React, { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { useRouter, useSearchParams } from "next/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { getProgram } from "@/query";
import VideoPlayer from "@/components/VideoPlayer";
import VideoPlayerCover from "@/components/VideoPlayer/VideoPlayerCover";

export interface VideoData {
  id: string;
  videoUrl: string;
}

interface ShortsSwiperProps {
  videos: VideoData[];
  programId: string;
}

const ShortsSwiper: React.FC<ShortsSwiperProps> = ({ videos, programId }) => {
  const { data } = useQuery({
    queryKey: ["videos", programId],
    queryFn: () => getProgram(programId),
  });

  const searchParams = useSearchParams();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(
    Number(searchParams.get("episodeId"))
  );

  const router = useRouter();

  useEffect(() => {
    router.push(`/video/${programId}?episodeId=${currentVideoIndex}`, {
      scroll: false,
    });
  }, [currentVideoIndex]);

  return (
    <Swiper
      direction="vertical"
      slidesPerView={1}
      spaceBetween={0}
      initialSlide={currentVideoIndex >= 0 ? currentVideoIndex : 0}
      //   navigation
      //   pagination={{ clickable: true }}
      //   modules={[Navigation, Pagination]}
      onSlideChange={(swiper) => setCurrentVideoIndex(swiper.activeIndex)}
      className="h-full"
    >
      {videos.map((video, index) => (
        <SwiperSlide key={video.id} virtualIndex={index}>
          <VideoPlayer video={video} />
          <VideoPlayerCover />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ShortsSwiper;
