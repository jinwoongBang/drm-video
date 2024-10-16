"use client";

import { useRecoilValue } from "recoil";

import {
  HeartIcon,
  ShareIcon,
  ListBulletIcon,
  BookmarkIcon,
  ArrowLeftIcon,
  PlayIcon,
} from "@heroicons/react/16/solid";

import {
  selectedEpisodeIndexState,
  selectedProgramIdState,
} from "@/store/video";
import IconButton from "@/components/button";
import { useProgramQuery } from "@/hooks/useProgramQuery";

function VideoPlayerCover() {
  const programId = useRecoilValue(selectedProgramIdState);
  const { data } = useProgramQuery(programId);

  const episodeIndex = useRecoilValue(selectedEpisodeIndexState);

  return (
    <section className="absolute top-0 left-0 p-4 flex flex-col justify-between w-full h-full">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <IconButton Icon={ArrowLeftIcon} />
          <span>{data?.title}</span>
        </div>
        <div>
          {episodeIndex}/{data?.seasons[0].episodeCount}
        </div>
      </header>
      <aside className="absolute right-[10px] bottom-[72px] w-[42px] h-[296px] flex flex-col place-items-center justify-between z-[1100]">
        <IconButton Icon={HeartIcon} text={data?.likeCount?.toString()} />
        <IconButton Icon={BookmarkIcon} text="찜" />
        <IconButton Icon={ListBulletIcon} text="목록" />
        <IconButton Icon={ShareIcon} text="공유" />
      </aside>
      <section>
        <h1>비디오 컨트롤러</h1>
      </section>
    </section>
  );
}

export default VideoPlayerCover;
