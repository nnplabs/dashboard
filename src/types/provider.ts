import { DynamicFieldData } from "./dynamic-control-types";

export type ChannelType = "MAIL" | "IN_APP" | "OTHER";

export type ProviderMetadata = {
  providerType: ProviderKey;
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
