/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { TResponse } from "@/types/common";
import config from "./config";

const axiosInstance = axios.create({
  baseURL: config.apiUrl,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("taskPilotToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const response: TResponse<any> = {
      success: false,
      message: "Something went wrong",
      code: 500,
      data: null,
    };

    if (error.response?.data) {
      const data = error.response.data as Partial<TResponse<any>>;

      response.message = data.message ?? error.message;
      response.code = data.code ?? 500;

      if (Array.isArray(data.errors) && data.errors.length > 0) {
        response.message = data.errors[0].msg;
        response.errors = data.errors;
      }
    } else {
      response.message = error.message;
    }

    return Promise.reject(response);
  }
);

export default axiosInstance;