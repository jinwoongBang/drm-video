import { useRecoilState, useRecoilValue } from "recoil";

import { isVideoPlayingState } from "@/store/video";
import clsx from "clsx";

interface PlayButtonProps {
  playIcon: () => React.ReactNode;
  pauseIcon: () => React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function PlayButton({
  playIcon,
  pauseIcon,
  className,
  onClick,
}: PlayButtonProps) {
  const [isVideoPlaying, setIsVideoPlaying] =
    useRecoilState(isVideoPlayingState);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick && onClick(event);
    event.stopPropagation();
    setIsVideoPlaying((state) => !state);
  };

  return (
    <button
      className={clsx(className, "flex justify-center items-center")}
      onClick={handleClick}
    >
      {!isVideoPlaying ? playIcon() : pauseIcon()}
    </button>
  );
}

export default PlayButton;
