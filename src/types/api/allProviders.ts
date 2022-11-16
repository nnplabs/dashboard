import { ChannelType, ProviderKey } from "../provider";

export type AllProvidersResponse = {
    providers: ProviderData[]
}

type ProviderData = {
  provider_key: ProviderKey;
  display_name: string;
  channel: ChannelType
  config: ProviderConfig[];
};

type ProviderConfig = {
  key: string;
  display_name: string;
  required: boolean;
  type: string;
};
