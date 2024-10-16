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

// cache() is scoped per request, so we don't leak data between requests
const getQueryClient = cache(() => new QueryClient());
export default getQueryClient;
