export interface Order {
  id: number;
  registro: string;
  bebida: string;
  quantidade: number;
  status: 'Pendente' | 'Pronto';
  timestamp: string;
}

export interface CreateOrderDTO {
  registro: string;
  bebida: string;
  quantidade: number;
}
