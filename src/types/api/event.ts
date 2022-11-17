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
