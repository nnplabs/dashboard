import { UserData } from "../types/api/user";
import { apiClient } from "./api";

export const getAllUsers = async (appName: string) => {
  const response = await apiClient.post<UserData[]>(`users/getAll`, {
    appName,
  });
  return response.data;
};


