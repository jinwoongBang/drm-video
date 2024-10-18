"use client";

import { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import clsx from "clsx";

import {
  HeartIcon,
  ShareIcon,
  ListBulletIcon,
  BookmarkIcon,
  ArrowLeftIcon,
  PlayIcon,
  PauseIcon,
} from "@heroicons/react/16/solid";

import { useProgramQuery } from "@/hooks/useProgramQuery";

import {
  isShowVideoCoverState,
  isVideoLoadingState,
  isVideoPlayingState,
} from "@/store/video";
import {
  selectedProgramIdState,
  selectedProgramInfoState,
} from "@/store/program";

import IconButton from "@/components/button";
import Loading from "../loading/Loading";

function VideoPlayerCover() {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const programId = useRecoilValue(selectedProgramIdState);
  const { data } = useProgramQuery(programId);

  const { episodeIndex, seasonIndex } = useRecoilValue(
    selectedProgramInfoState
  );

  const [isShowVideoCover, setIsShowVideoCover] = useRecoilState(
    isShowVideoCoverState
  );
  const [isVideoPlaying, setIsVideoPlaying] =
    useRecoilState(isVideoPlayingState);

  const isVideoLoading = useRecoilValue(isVideoLoadingState);

  useEffect(() => {
    if (isShowVideoCover) {
      timerRef.current = setTimeout(() => {
        setIsShowVideoCover(false);
      }, 3000);
    } else {
      timerRef.current && clearTimeout(timerRef.current);
    }

    return () => {
      timerRef.current && clearTimeout(timerRef.current);
    };
  }, [isShowVideoCover]);

  const handlePlay = () => {
    console.log("play");
  };

  const handlePause = () => {
    console.log("pause");
  };

  const togglePlay = () => {};

  return (
    <>
      {isVideoLoading ? (
        <Loading />
      ) : (
        <section
          className={clsx(
            "absolute top-0 left-0 p-4 flex flex-col justify-between w-full h-full",
            isShowVideoCover ? "block" : "hidden"
          )}
        >
          <header className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <IconButton Icon={ArrowLeftIcon} />
              <span>{data?.title}</span>
            </div>
            <div>
              {episodeIndex}/{data?.seasons[seasonIndex].episodeCount}
            </div>
          </header>
          <div className="flex justify-center items-center">
            <span className="rounded-full p-6 inline-flex bg-black/30">
              {isVideoPlaying ? (
                <PlayIcon className="h-20 w-20 text-white drop-shadow-lx ml-3" />
              ) : (
                <PauseIcon className="h-20 w-20 text-white drop-shadow-lx" />
              )}
            </span>
          </div>
          <aside className="absolute right-[10px] bottom-[72px] w-[42px] h-[296px] flex flex-col place-items-center justify-between z-[1100]">
            <IconButton Icon={HeartIcon} text={data?.likeCount?.toString()} />
            <IconButton Icon={BookmarkIcon} text="찜" />
            <IconButton Icon={ListBulletIcon} text="목록" />
            <IconButton Icon={ShareIcon} text="공유" />
          </aside>
          <section className="flex flex-col gap-3">
            <div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "45%" }}
                ></div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <IconButton Icon={PlayIcon} />
              <span className="ml-2 text-sm text-gray-300">00:00 / 10:30</span>
            </div>
          </section>
        </section>
      )}
    </>
  );
}

export default VideoPlayerCover;
