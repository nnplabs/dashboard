import { Images } from "../images";
import { DynamicFieldData } from "./dynamic-control-types";

export type ChannelType = "MAIL" | "IN_APP" | "OTHER";

export const ChannelName = {
  MAIL: "Email",
  IN_APP: "In App",
  OTHER: "Other",
};

export const ChannelImg = {
  MAIL: Images.Nav.Mail,
  IN_APP: Images.Nav.InApp,
  OTHER: Images.Nav.Other,
}

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
