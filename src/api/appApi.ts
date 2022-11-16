import { AppData } from "../types/api/app";
import { apiClient } from "./api";

export const getAllApps = async () => {
  const response = await apiClient.get<AppData[]>("apps/getAll");
  return response.data;
};

export const createApp = async (appName: string, description?: string) => {
  const response = await apiClient.post<AppData>("apps/create", {
    appName,
    description,
  });
  return response.data;
};

export const getApp = async (appName: string) => {
  const response = await apiClient.post<AppData>("apps/get", {
    appName,
  });
  return response.data;
};

export const deleteApp = async (appName: string) => {
  const response = await apiClient.post<AppData>("apps/delete", {
    appName,
  });
  return response.data;
};
