import { apiClient } from "./api";

export const login = async (ownerAddress: string) => {
  const response = await apiClient.post(`auth/login`, { ownerAddress }, { withCredentials: true });
  return response.data;
};
