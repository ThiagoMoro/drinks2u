export interface Order {
  id: number;
  registro: string;
  bebida: string;
  quantidade: number;
  status: 'Pendente' | 'Em Preparo' | 'Pronto' | 'Entregue';
  timestamp: string;
}

export interface ClientFormData {
  registro: string;
  bebida: string;
  quantidade: number;
}
