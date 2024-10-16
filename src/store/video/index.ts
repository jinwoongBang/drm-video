import { atom } from "recoil";

export const selectedProgramIdState = atom<string>({
  key: "selectedProgramIdState",
  default: "",
});

export const selectedEpisodeIndexState = atom<number>({
  key: "selectedEpisodeIndexState",
  default: 0,
});

export const isVideoPlayingState = atom<boolean>({
  key: "isVideoPlayingState",
  default: false,
});

export const isShowVideoCoverState = atom<boolean>({
  key: "isShowVideoCoverState",
  default: true,
});
