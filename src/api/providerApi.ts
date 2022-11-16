import { AllProvidersResponse } from "../types/api/allProviders";
import { CreateProviderRequest, ProviderData } from "../types/api/provider";
import { apiClient } from "./api";

export const getAllAvailableProviders = async () => {
  const response = await apiClient.get<AllProvidersResponse>(
    "providers/allAvailable"
  );
  return response.data;
};

export const createProvider = async (providerData: CreateProviderRequest) => {
  const response = await apiClient.post<ProviderData>("providers/create", {
    ...providerData,
  });
  return response.data;
};

export const getProvider = async (appName: string, providerName: string) => {
  const response = await apiClient.post<ProviderData>(`providers/get`, {
    appName,
    providerName,
  });
  return response.data;
};

export const getAllProviders = async (appName: string) => {
  const response = await apiClient.post<ProviderData[]>(`providers/getAll`, {
    appName,
  });
  return response.data;
};

export const deleteProvider = async (appName: string, providerName: string) => {
  const response = await apiClient.post("providers/delete", {
    appName,
    providerName,
  });
  return response.data;
};
