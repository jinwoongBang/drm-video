import { atom } from "recoil";

import { SpoonError } from "@/constants/error";

export const errorState = atom<SpoonError | null>({
  key: "errorState",
  default: null,
});
