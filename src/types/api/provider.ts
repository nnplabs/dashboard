import { ChannelType as Channel, ProviderKey } from "../provider";

export type CreateProviderRequest = {
  readonly appName: string;
  readonly providerName: string;
  readonly channel: Channel;
  readonly providerType: ProviderKey;
  readonly config?: Record<string, string>;
  readonly description?: string;
};

export type ProviderData = {
  id: string;
  name: string;
  description?: any;
  config: Record<string, string>;
  channel: Channel;
  providerKey: ProviderKey;
  statusCallback?: any;
  appId: string;
  EventProviders: EventProviders[];
  createdAt: Date;
  updatedAt: Date;
};

export type EventProviders = {
  appId: string;
  eventName: string;
  providerName: string;
};
