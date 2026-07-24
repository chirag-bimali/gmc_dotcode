import axios, { AxiosError } from "axios";
import { env } from "@shared/config/env";
import type { ApiResponse } from "@shared/model/ApiResponse";

export type NormalizedApiError = ApiResponse<object>;

export const http = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers["x-app-env"] = env.VITE_ENV;
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiResponse<object>>) => {
    const payload = error.response?.data;

    const normalized: NormalizedApiError =
      payload ?? {
        success: false,
        message: error.message,
        statusCode: error.response?.status ?? 500,
        timestamp: new Date().toISOString(),
      };

    return Promise.reject(normalized);
  },
);
