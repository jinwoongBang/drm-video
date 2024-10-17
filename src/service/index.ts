import { requestGet } from "@/fetcher";
import { Program, VideoList } from "@/types/response";

export const getProgram = async (programId: number) => {
  const data = await requestGet<Program>("/api/program", {
    programId,
  });
  return data.payload;
};

export const getVideoList = async (programId: number) => {
  const data = await requestGet<VideoList>("/api/videos", {
    programId,
  });

  return data.payload;
};
