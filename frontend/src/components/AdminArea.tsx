import { useState, useEffect } from 'react';
import type { Order } from '../types';
import { fetchOrders, setOrderStatus, removeOrder } from '../utils/api';

export default function AdminArea() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchOrders();
      setOrders(data);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Failed to load orders. Please check if the backend is running.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleMarkAsReady = async (orderId: number) => {
    try {
      setError(null);
      await setOrderStatus(orderId, 'Ready');
      await loadOrders();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to update order status.';
      setError(message);
    }
  };

  const handleDelete = async (orderId: number) => {
    if (!confirm('Are you sure you want to delete this order?')) return;

    try {
      setError(null);
      await removeOrder(orderId);
      await loadOrders();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to delete order.';
      setError(message);
    }
  };

  const getStatusColour = (status: Order['status']) => {
    return status === 'Pending'
      ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
      : 'bg-green-100 text-green-800 border-green-200';
  };

  return (
    <div className="max-w-7xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-green-100 rounded-full mb-3">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Admin Panel</h2>
        <div className="mt-4 inline-block bg-gradient-to-r from-green-50 to-blue-50 px-6 py-3 rounded-full border border-green-200">
          <span className="text-gray-700 font-medium">
            Total orders:{' '}
            <span className="text-green-600 font-bold text-xl">{orders.length}</span>
          </span>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-800">Error</p>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-400 hover:text-red-600 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
          <p className="text-gray-500">Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16">
          <svg
            className="w-24 h-24 mx-auto text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p className="text-gray-500 text-lg">No orders found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Lanyard Staff
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Beverage
                </th>
                <th className="px-6 py-4 text-centre text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Qty
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Date/Time
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-centre text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {order.registration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {order.beverage}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-bold text-gray-900">
                    {order.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {order.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColour(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center justify-center gap-2">
                      {order.status === 'Pending' && (
                        <button
                          onClick={() => handleMarkAsReady(order.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-xs font-semibold transition duration-200 transform hover:scale-105"
                        >
                          Ready
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-semibold transition duration-200 transform hover:scale-105"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
