import { requestGet } from "@/fetcher";
import { Program } from "@/types/response";
import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

export const getProgram = async (programId: string) => {
  const data = await requestGet<Program>("/api/program", {
    programId,
  });
  return data.payload;
};

const getQueryClient = cache(() => new QueryClient());
export default getQueryClient;
