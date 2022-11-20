export interface UserData {
  id: string;
  walletAddress: string;
  mobile?: string;
  email?: string;
  metadata?: Record<string, string>;
  appId: string;
  createdAt: Date;
  updatedAt: Date;
  telegramData: TelegramData[];
}

export type TelegramData = {
  appId: string;
  providerName: string;
  chatId: string;
  walletAddress: string;
};
