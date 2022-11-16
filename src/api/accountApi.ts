import { AccountData } from "../types/api/account";
import { apiClient } from "./api";

export const getAccount = async () => {
  const response = await apiClient.get<AccountData>("/account");
  return response.data;
};
