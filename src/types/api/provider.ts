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
  channel: string;
  providerKey: string;
  statusCallback?: any;
  appId: string;
  createdAt: Date;
  updatedAt: Date;
}
