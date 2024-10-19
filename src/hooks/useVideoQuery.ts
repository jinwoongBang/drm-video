import { useCommonQuery } from "@/hooks/useCommonQuery";
import { selectedProgramIdState } from "@/store/program";
import { Program, VideoList, VideoPlayInfo } from "@/types/response";
import { useRecoilValue } from "recoil";

export function useVideoListQuery(programId: number) {
  return useCommonQuery<VideoList>(
    ["videoList", programId],
    {
      url: "/api/videos",
      params: {
        programId,
      },
    },
    {
      enabled: !!programId,
    }
  );
}
export function useVideoQuery(
  seasonId: number,
  episodeNumber: number,
  format: "HLS" | "DASH"
) {
  return useCommonQuery<VideoPlayInfo>(
    ["video", seasonId, episodeNumber, format],
    {
      url: "/api/play",
      params: {
        seasonId,
        episodeNumber,
        format,
      },
    },
    {
      enabled: !!seasonId && !!format,
    }
  );
}
