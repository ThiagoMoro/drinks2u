export interface Order {
  id: number;
  registration: string;
  beverage: string;
  quantity: number;
  status: 'Pending' | 'Ready';
  timestamp: string;
}

export interface CreateOrderDTO {
  registration: string;
  beverage: string;
  quantity: number;
}
