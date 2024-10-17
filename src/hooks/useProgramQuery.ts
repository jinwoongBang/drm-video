import { useCommonQuery } from "@/hooks/useCommonQuery";
import { selectedProgramIdState } from "@/store/program";
import { Program } from "@/types/response";
import { useRecoilValue } from "recoil";

export function useProgramQuery(programId: number) {
  return useCommonQuery<Program>(
    ["program", programId],
    {
      url: "/api/program",
      params: {
        programId,
      },
    },
    {
      enabled: !!programId,
    }
  );
}
