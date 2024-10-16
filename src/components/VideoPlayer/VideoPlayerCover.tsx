"use client";
function VideoPlayerCover() {
  return (
    <section className="absolute top-0 left-0 flex flex-col justify-between w-full h-full">
      <header className="flex justify-between items-center">
        <div>
          <button>뒤로가기</button>
          <span>내 남친은 찐따입니다.</span>
        </div>
        <div>0/60</div>
      </header>
      <aside className="absolute right-[10px] bottom-[72px] w-[42px] h-[296px] flex flex-col place-items-center justify-between z-[1100]">
        <button>좋아요</button>
        <button>공유</button>
        <button>댓글</button>
        <button>저장</button>
      </aside>
      <section>
        <h1>비디오 컨트롤러</h1>
      </section>
    </section>
  );
}

export default VideoPlayerCover;
