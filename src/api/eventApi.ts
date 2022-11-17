import { EventData } from "../types/api/event";
import { apiClient } from "./api";

export const getAllEvents = async (appName: string) => {
  const response = await apiClient.post<EventData[]>(`events/getAll`, {
    appName,
  });
  return response.data;
};
