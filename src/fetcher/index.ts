import axios, { AxiosError, AxiosResponse } from "axios";

export interface ApiResponse<T> {
  payload: T | null;
  error: string | null;
  status: number;
}

const axiosInstance = axios.create({
  timeout: 3_000,
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<any>>) => {
    // console.log(response);
    return response;
  },
  (error) => {
    const isAxiosError = axios.isAxiosError(error);
    const errorResponse: ApiResponse<any> = isAxiosError
      ? {
          payload: null,
          error: error.message || "Unknown error (isAxiosError)",
          status: error.response?.status || 500,
        }
      : {
          payload: null,
          error: "Unknown error",
          status: 500,
        };

    return Promise.reject(errorResponse);
  }
);

export async function requestGet<T>(
  url: string,
  params?: Record<string, any>
): Promise<ApiResponse<T>> {
  return request<T>(url, "GET", { params });
}

export async function requestPost<T>(
  url: string,
  data?: any
): Promise<ApiResponse<T>> {
  return request<T>(url, "POST", { data });
}

export async function request<T>(
  url: string,
  method: "GET" | "POST" = "GET",
  config: { params?: Record<string, any>; data?: any } = {}
): Promise<ApiResponse<T>> {
  const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.request({
    method,
    url,
    ...config,
  });

  return response.data;
}

export default request;
