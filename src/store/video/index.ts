import { atom, selector } from "recoil";

import { formatTime } from "@/libs/common";
import { RefObject } from "react";

// 비디오 요소에 대한 참조를 저장하는 atom
export const videoElementState = atom<HTMLVideoElement | null>({
  key: "videoElementState",
  default: null,
});

// 비디오 재생 상태 (재생 중인지 일시정지 상태인지)
export const isVideoPlayingState = atom<boolean>({
  key: "isVideoPlayingState",
  default: false,
});

export const isShowVideoCoverState = atom<boolean>({
  key: "isShowVideoCoverState",
  default: true,
});

// 비디오 로딩 상태
export const isVideoLoadingState = atom<boolean>({
  key: "isVideoLoadingState",
  default: true,
});

// 현재 재생 시간 (초 단위)
export const videoCurrentTimeState = atom({
  key: "videoCurrentTimeState",
  default: 0,
});

// 비디오 전체 재생 시간 (초 단위)
export const videoDurationState = atom({
  key: "videoDurationState",
  default: 0,
});

// 비디오 진행률을 계산하는 selector (0에서 100 사이의 퍼센트)
export const videoProgressSelector = selector({
  key: "videoProgressSelector",
  get: ({ get }) => {
    const currentTime = get(videoCurrentTimeState);
    const duration = get(videoDurationState);
    if (duration === 0) return 0;

    return (currentTime / duration) * 100;
  },
  set: ({ set, get }, newValue) => {
    const duration = get(videoDurationState);
    const newTime = ((newValue as number) / 100) * duration;
    set(videoCurrentTimeState, newTime);
  },
});

// 현재 재생 시간을 mm:ss 형식으로 반환하는 selector
export const formattedCurrentTimeSelector = selector({
  key: "formattedCurrentTimeSelector",
  get: ({ get }) => {
    const currentTime = get(videoCurrentTimeState);
    return formatTime(currentTime);
  },
});

// 전체 재생 시간을 mm:ss 형식으로 반환하는 selector
export const formattedDurationSelector = selector({
  key: "formattedDurationSelector",
  get: ({ get }) => {
    const duration = get(videoDurationState);
    return formatTime(duration);
  },
});
