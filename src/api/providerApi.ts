import { AllProvidersResponse } from "../types/response/allProviders";
import { GetProviderResponse } from "../types/response/getProvider";
import { apiClient } from "./api";

export const getAllAvailableProviders = async () => {
  const response = await apiClient.get<AllProvidersResponse>(
    "providers/allAvailable"
  );
  return response.data;
};

export const createProvider = async (config: Record<string, string>) => {};

export const getAllProviders = async (appName: string) => {
  const response = await apiClient.post<GetProviderResponse>(
    `providers/getAll`,
    { appName },
  );
  return response.data;
};
