import { LoginResponse } from "../types/response/appDetails";
import { apiClient } from "./api";

export const login = async (ownerAddress: string) => {
  const response = await apiClient.post<LoginResponse>(`auth/login`, { ownerAddress }, { withCredentials: true });
  return response.data;
};
