import {
  isVideoPlayingState,
  videoProgressSelector,
  videoElementState,
  isShowVideoCoverState,
} from "@/store/video";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

function ProgressBar({ value }: { value: number }) {
  const [progress, setProgress] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] =
    useRecoilState(isVideoPlayingState);
  const [isShowVideoCover, setIsShowVideoCover] = useRecoilState(
    isShowVideoCoverState
  );

  const videoElement = useRecoilValue(videoElementState);

  useEffect(() => {
    setProgress(value);
  }, [value]);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsVideoPlaying(false);
  };

  const handleMouseUp = () => {
    setIsVideoPlaying(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setProgress(value);
    setIsShowVideoCover(true);
    if (videoElement) {
      videoElement.currentTime = (value / 100) * videoElement.duration;
    }
  };

  return (
    <div
      className="relative p-1 w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700"
      style={{
        background: `linear-gradient(to right, rgb(255, 255, 255) 0.0912308%, rgb(255, 255, 255) 0.0912308%, rgb(255, 255, 255) ${progress}%, rgba(255, 255, 255, 0.54) ${progress}%, rgba(255, 255, 255, 0.54) 15.3758%, rgba(255, 255, 255, 0.3) 15.3758%)`,
      }}
    >
      <input
        className="absolute top-0 left-0 w-full appearance-none h-1 p-0 opacity-0"
        type="range"
        max={100}
        min={0}
        value={progress}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onChange={handleChange}
      />
    </div>
  );
}

export default ProgressBar;
