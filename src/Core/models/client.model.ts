export interface Client {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  isActive?: boolean;
  createdAt?: string;
}