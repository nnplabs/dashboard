import { AccountData } from "../types/api/account";
import { apiClient } from "./api";

export const getAccount = async () => {
  const response = await apiClient.get<AccountData>("/account");
  return response.data;
};

export const setupAccount = async (accountName: string, contractAddress: string) => {
  const response = await apiClient.post<AccountData>(`account/setup`, {
    accountName,
    contractAddress
  });
  return response.data;
};