export interface Order {
  id: number;
  registration: string;
  beverage: string;
  quantity: number;
  status: 'Pending' | 'Ready';
  timestamp: string;
}

export interface ClientFormData {
  registration: string;
  beverage: string;
  quantity: number | null;
}
