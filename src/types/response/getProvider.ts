interface EventProvider {
  appId: string;
  eventName: string;
  providerName: string;
}

export interface GetProviderResponse {
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
  EventProviders: EventProvider[];
}
