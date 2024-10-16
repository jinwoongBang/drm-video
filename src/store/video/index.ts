import { atom } from "recoil";

export const selectedProgramIdState = atom<string>({
  key: "selectedProgramIdState",
  default: "",
});
