import { Request, Response } from 'express';
import db from '../config/database';
import type { Order, CreateOrderDTO } from '../models/Order';

export const getAllOrders = (req: Request, res: Response) => {
  try {
    const orders = db.prepare('SELECT * FROM orders ORDER BY id DESC').all() as Order[];
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

export const createOrder = (req: Request, res: Response) => {
  try {
    const { registro, bebida, quantidade }: CreateOrderDTO = req.body;

    if (!registro || !bebida || !quantidade) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const timestamp = new Date().toLocaleString('pt-BR');
    
    const stmt = db.prepare(`
      INSERT INTO orders (registro, bebida, quantidade, status, timestamp)
      VALUES (?, ?, ?, 'Pendente', ?)
    `);

    const result = stmt.run(registro, bebida, quantidade, timestamp);
    
    const newOrder = db.prepare('SELECT * FROM orders WHERE id = ?').get(result.lastInsertRowid) as Order;
    
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

export const updateOrderStatus = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Pendente', 'Pronto'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const stmt = db.prepare('UPDATE orders SET status = ? WHERE id = ?');
    stmt.run(status, id);

    const updatedOrder = db.prepare('SELECT * FROM orders WHERE id = ?').get(id) as Order;
    
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
};

export const deleteOrder = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const stmt = db.prepare('DELETE FROM orders WHERE id = ?');
    stmt.run(id);
    
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
};
