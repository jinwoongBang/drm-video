import { useQuery, QueryKey, UseQueryOptions } from "@tanstack/react-query";

import { requestGet } from "@/fetcher";

interface FetcherParams {
  url: string;
  params?: object;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function useCommonQuery<TData = unknown>(
  key: QueryKey,
  { url, params }: FetcherParams,
  options?: Omit<UseQueryOptions<TData | null, Error>, "queryKey" | "queryFn">
) {
  return useQuery<TData | null, Error>({
    queryKey: key,
    queryFn: async () => {
      const response = await requestGet<TData>(url, params);
      // await delay(3000);
      return response.payload;
    },
    throwOnError: true,
    ...options,
  });
}
