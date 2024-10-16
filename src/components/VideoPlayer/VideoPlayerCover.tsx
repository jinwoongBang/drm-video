"use client";

import {
  HeartIcon,
  ShareIcon,
  ListBulletIcon,
  BookmarkIcon,
  ArrowLeftIcon,
} from "@heroicons/react/16/solid";
import IconButton from "@/components/button";

function VideoPlayerCover() {
  return (
    <section className="absolute top-0 left-0 p-4 flex flex-col justify-between w-full h-full">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <IconButton Icon={ArrowLeftIcon} />
          <span>내 남친은 찐따입니다.</span>
        </div>
        <div>0/60</div>
      </header>
      <aside className="absolute right-[10px] bottom-[72px] w-[42px] h-[296px] flex flex-col place-items-center justify-between z-[1100]">
        <IconButton Icon={HeartIcon} text="22.5K" />
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
