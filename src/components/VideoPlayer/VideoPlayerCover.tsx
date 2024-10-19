"use client";

import { useEffect, useRef, useState } from "react";
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
  LanguageIcon,
  GlobeAltIcon,
} from "@heroicons/react/16/solid";

import { useProgramQuery } from "@/hooks/useProgramQuery";

import {
  formattedCurrentTimeSelector,
  formattedDurationSelector,
  isShowVideoCoverState,
  isVideoLoadingState,
  isVideoPlayingState,
  videoCurrentTimeState,
  videoDurationState,
  videoProgressSelector,
} from "@/store/video";
import {
  selectedProgramIdState,
  selectedProgramInfoState,
} from "@/store/program";

import IconButton from "@/components/button";
import Loading from "../loading/Loading";
import { parseNumberWithK } from "@/libs/common";
import PlayButton from "@/components/button/play";
import ProgressBar from "@/components/VideoPlayer/ProgressBar";

function VideoPlayerCover({ plaerId }: { plaerId: string }) {
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

  const [videoProgress, setVideoProgress] = useRecoilState(
    videoProgressSelector
  );
  const videoDuration = useRecoilValue(videoDurationState);

  const formattedCurrentTime = useRecoilValue(formattedCurrentTimeSelector);
  const formattedDuration = useRecoilValue(formattedDurationSelector);

  useEffect(() => {
    if (isShowVideoCover) {
      timerRef.current = setTimeout(() => {
        //
      }, 3000);
    } else {
      timerRef.current && clearTimeout(timerRef.current);
    }

    return () => {
      timerRef.current && clearTimeout(timerRef.current);
    };
  }, [isShowVideoCover]);

  return (
    <section
      className={clsx(
        "absolute top-0 left-0 p-4 flex flex-col justify-between w-full h-full",
        "transition-opacity duration-200",
        isShowVideoCover ? "opacity-100" : "opacity-0"
      )}
      onClick={(event) => {
        setIsShowVideoCover((state: boolean) => !state);
      }}
      onDoubleClick={(event) => {
        setIsShowVideoCover(true);
        setIsVideoPlaying((state) => !state);
      }}
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
        {isVideoLoading ? (
          <Loading />
        ) : (
          <PlayButton
            className={clsx(
              "h-20 w-20 text-white drop-shadow-lx ml-3",
              isShowVideoCover ? "block" : "hidden"
            )}
            playIcon={() => <PlayIcon className="h-20 w-20 text-white" />}
            pauseIcon={() => <PauseIcon className="h-20 w-20 text-white" />}
          />
        )}
      </div>
      <aside className="absolute right-[10px] bottom-[72px] w-[42px] h-[296px] flex flex-col place-items-center justify-between z-[1100]">
        <IconButton
          Icon={HeartIcon}
          text={parseNumberWithK(data?.likeCount ?? 0)}
        />
        <IconButton Icon={BookmarkIcon} text="찜" />
        <IconButton Icon={ListBulletIcon} text="목록" />
        <IconButton Icon={ShareIcon} text="공유" />
      </aside>
      <section className="flex flex-col gap-3">
        <div>
          <ProgressBar value={videoProgress} />
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <PlayButton
              // className={clsx(isShowVideoCover ? "block" : "hidden")}
              playIcon={() => <PlayIcon className="h-6 w-6 text-white" />}
              pauseIcon={() => <PauseIcon className="h-6 w-6 text-white" />}
            />
            <span className="ml-2 text-sm text-gray-300">
              {formattedCurrentTime} / {formattedDuration}
            </span>
          </div>
          <div>
            <IconButton Icon={GlobeAltIcon} />
          </div>
        </div>
      </section>
    </section>
  );
}

export default VideoPlayerCover;
