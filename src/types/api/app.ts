export interface AppResponse {
  id: string;
  name: string;
  description?: any;
  metadata?: any;
  ownerAddress: string;
  createdAt: Date;
  updatedAt: Date;
}
