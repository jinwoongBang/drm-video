import { Program } from "@/types/response";
import { atom, atomFamily, selector } from "recoil";
import {
  modalActionState,
  modalContentState,
  modalState,
  modalTitleState,
} from "../modal";

interface SelectedProgramInfoState {
  isInit: boolean;
  programId: number;
  episodeIndex: number;
  seasonIndex: number;
  programInfo: Program | null;
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
    programInfo: null,
  },
});

export const isFreeEpisodeSelector = selector({
  key: "isFreeEpisodeSelector",
  get: ({ get }) => {
    const { programInfo, episodeIndex, seasonIndex } = get(
      selectedProgramInfoState
    );

    const webFreeEpCount = programInfo?.seasons[seasonIndex].webFreeEpCount;

    return webFreeEpCount ? webFreeEpCount >= episodeIndex : true;
  },
});
