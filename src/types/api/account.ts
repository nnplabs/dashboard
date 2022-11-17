import { AppData } from "./app";

export interface AccountData {
  id: string;
  name: string;
  apiKey: string;
  ownerAddress: string;
  createdAt: Date;
  updatedAt: Date;
  App: AppData[];
}
