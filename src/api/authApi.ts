
import { AppData } from "../types/api/app";
import { apiClient } from "./api";

export const login = async (ownerAddress: string) => {
  const response = await apiClient.post<AppData>(`auth/login`, { ownerAddress }, { withCredentials: true });
  return response.data;
};
