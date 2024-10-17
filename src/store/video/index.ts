import { atom } from "recoil";

export const isVideoPlayingState = atom<boolean>({
  key: "isVideoPlayingState",
  default: false,
});

export const isShowVideoCoverState = atom<boolean>({
  key: "isShowVideoCoverState",
  default: true,
});
