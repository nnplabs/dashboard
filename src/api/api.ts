import axios, { AxiosError } from "axios";
import { SERVER_URL } from "../constants";

export const apiClient = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});

apiClient.defaults.headers.common["Content-Type"] = "application/json";

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error instanceof AxiosError) {
      // if (error.response?.status === 403) {
      //   document.location.href = "/login";
      // }
    }
    return Promise.reject(error);
  }
);
