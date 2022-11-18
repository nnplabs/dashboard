import { ConnectProviderRequest, CreateEventRequest, EventData } from "../types/api/event";
import { apiClient } from "./api";

export const getAllEvents = async (appName: string) => {
  const response = await apiClient.post<EventData[]>(`events/getAll`, {
    appName,
  });
  return response.data;
};

export const createEvent = async (eventData: CreateEventRequest) => {
  const response = await apiClient.post<EventData>("events/create", {
    ...eventData,
  });
  return response.data;
};

export const updateEvent = async (eventData: CreateEventRequest) => {
  const response = await apiClient.post<EventData>("events/update", {
    ...eventData,
  });
  return response.data;
};

export const connectProvider = async (connectData: ConnectProviderRequest) => {
  const response = await apiClient.post("events/connect", {
    ...connectData,
  });
  return response.data;
}

export const updateConnectedProvider = async (connectData: ConnectProviderRequest) => {
  const response = await apiClient.post("events/updateConnected", {
    ...connectData,
  });
  return response.data;
}

export const disconnectProvider = async (disconnectData: ConnectProviderRequest) => {
  const response = await apiClient.post("events/disconnect", {
    ...disconnectData,
  });
  return response.data;
}

