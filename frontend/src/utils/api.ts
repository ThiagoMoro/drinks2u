import type { Order } from '../types';

const API_URL = 'http://localhost:3001/api';

export interface CreateOrderPayload {
  registration: string;
  beverage: string;
  quantity: number;
}

export async function fetchOrders(): Promise<Order[]> {
  const res = await fetch(`${API_URL}/orders`);
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
}

export async function createOrder(payload: CreateOrderPayload): Promise<Order> {
  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to create order');
  }

  return res.json();
}

export async function setOrderStatus(
  id: number,
  status: 'Pending' | 'Ready'
): Promise<Order> {
  const res = await fetch(`${API_URL}/orders/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to update status');
  }

  return res.json();
}

export async function removeOrder(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/orders/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to delete order');
  }
}
