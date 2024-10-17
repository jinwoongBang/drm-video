import { atom, atomFamily } from "recoil";

interface SelectedProgramInfoState {
  isInit: boolean;
  programId: number;
  episodeIndex: number;
  seasonIndex: number;
}

export const selectedProgramIdState = atom<number>({
  key: "selectedProgramIdState",
  default: 0,
});

export const selectedProgramInfoState = atom<SelectedProgramInfoState>({
  key: "SelectedProgramInfoState",
  default: {
    isInit: false,
    programId: 0,
    episodeIndex: 0,
    seasonIndex: 0,
  },
});
