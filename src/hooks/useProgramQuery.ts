import { useCommonQuery } from "@/hooks/useCommonQuery";
import { Program } from "@/types/response";

export function useProgramQuery(programId: string) {
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
