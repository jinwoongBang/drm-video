import { atom } from "recoil";

export const selectedProgramIdState = atom<string>({
  key: "selectedProgramIdState",
  default: "",
});

export const selectedEpisodeIndexState = atom<number>({
  key: "selectedEpisodeIndexState",
  default: 0,
});
