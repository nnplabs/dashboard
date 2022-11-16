import { DynamicFieldData } from "./dynamic-control-types";

export type ChannelType = "EMAIL" | "IN_APP" | "OTHER";

export type ProviderMetadata = {
  key: string;
  name: string;
  logo: string;
  integrationsKeys: DynamicFieldData[];
  channel: ChannelType;
};

export type ProviderKey =
  | "SENDGRID_MAIL"
  | "FIREBASE"
  | "PIGEON"
  | "TELEGRAM"
  | "SLACK";
