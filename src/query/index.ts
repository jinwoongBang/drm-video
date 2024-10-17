import { requestGet } from "@/fetcher";
import { Program } from "@/types/response";
import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

const getQueryClient = cache(() => new QueryClient());
export default getQueryClient;
