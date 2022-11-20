import { apiClient } from "./api";

export type SendEventRequest = {
  appName: string;
  eventName: string;
  userWalletAddress: string;
  data?: Record<string, string>;
};

export const sendEvent = async (args: SendEventRequest) => {
  const response = await apiClient.post("send", {
    ...args,
  });
  return response.data;
};
