import type { Order } from '../types';

const STORAGE_KEY = 'drinks2u_orders';

export const getOrders = (): Order[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveOrders = (orders: Order[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
};

export const addOrder = (order: Omit<Order, 'id' | 'timestamp' | 'status'>): Order => {
  const orders = getOrders();
  const newOrder: Order = {
    ...order,
    id: Date.now(),
    status: 'Pending',
    timestamp: new Date().toLocaleString('pt-BR'),
  };
  orders.push(newOrder);
  saveOrders(orders);
  return newOrder;
};

export const updateOrderStatus = (id: number, status: Order['status']): void => {
  const orders = getOrders();
  const updated = orders.map(order =>
    order.id === id ? { ...order, status } : order
  );
  saveOrders(updated);
};

export const deleteOrder = (id: number): void => {
  const orders = getOrders();
  const filtered = orders.filter(order => order.id !== id);
  saveOrders(filtered);
};
