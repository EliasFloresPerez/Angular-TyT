export interface Order {
  id: number;
  clientId: number;
  status: number;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}
