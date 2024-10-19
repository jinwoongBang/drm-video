import { atom, selector } from "recoil";
import { isFreeEpisodeSelector } from "../program";

export const isShowModalState = atom({
  key: "isShowModalState",
  default: false,
});

export const modalTitleState = atom({
  key: "modalTitleState",
  default: "",
});

export const modalContentState = atom({
  key: "modalContentState",
  default: "",
});

export const modalTypeState = atom({
  key: "modalTypeState",
  default: "alert",
});

export const modalActionState = atom({
  key: "modalActionState",
  default: () => {},
});

export const buttonTextState = atom({
  key: "buttonTextState",
  default: "",
});
