import { EventProviders } from "./provider";

export interface EventData {
  id: string;
  name: string;
  appId: string;
  template: Record<string, Record<string, string>>;
  metadata?: Record<string, string>;
  connectedProviders: EventProviders[];
  createdAt: Date;
  updatedAt: Date;
}

export type CreateEventRequest = {
  readonly appName: string;
  readonly eventName: string;
  readonly template: Record<string, Record<string, string>>;
  readonly metadata?: Record<string, string>;
}

export type ConnectProviderRequest = {
  readonly appName: string;
  readonly eventName: string;
  readonly providerName: string[];
};

