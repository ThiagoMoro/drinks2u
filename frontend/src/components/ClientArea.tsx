import { useState } from 'react';
import type { ClientFormData } from '../types';
import { createOrder } from '../utils/api';

const BEVERAGES = [
  'Water',
  'Beer',
  'Gin',
  'Pink Gin',
  'Smirnoff Cola',
  'Captain Morgan',
];

export default function ClientArea() {
  const [formData, setFormData] = useState<ClientFormData>({
    registration: '',
    beverage: '',
    quantity: null,
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.registration.trim() || !formData.beverage) {
      setMessage({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }

    if (formData.quantity === null || formData.quantity <= 0) {
      setMessage({ type: 'error', text: 'Please enter a valid quantity.' });
      return;
    }

    try {
      setSubmitting(true);
      setMessage(null);

      await createOrder({
        registration: formData.registration,
        beverage: formData.beverage,
        quantity: formData.quantity,
      });

      setMessage({ type: 'success', text: '✓ Order submitted successfully!' });
      setFormData({ registration: '', beverage: '', quantity: null });

      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit order.';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegistrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,3}$/.test(value)) {
      setFormData({ ...formData, registration: value });
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d{0,3}$/.test(value)) {
      if (value === '') {
        setFormData({ ...formData, quantity: null });
        return;
      }
      const num = parseInt(value, 10);
      if (!Number.isNaN(num) && num <= 999) {
        setFormData({ ...formData, quantity: num });
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-2xl">
      <div className="text-center mb-6">
        <div className="inline-block p-3 bg-blue-100 rounded-full mb-3">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Request Beverage</h2>
        <p className="text-gray-500 mt-2">Please fill in the form below</p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg mb-6 text-center font-medium ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Lanyard Staff <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.registration}
            onChange={handleRegistrationChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="e.g. 123"
            maxLength={3}
            required
          />
          <p className="text-xs text-gray-500 mt-1">Maximum 3 digits</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Beverage <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.beverage}
            onChange={(e) => setFormData({ ...formData, beverage: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            required
          >
            <option value="">Select a beverage</option>
            {BEVERAGES.map((beverage) => (
              <option key={beverage} value={beverage}>
                {beverage}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Quantity (UNI)
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={formData.quantity ?? ''}
            onChange={handleQuantityChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="e.g. 1"
            maxLength={3}
            required
          />
          <p className="text-xs text-gray-500 mt-1">Maximum 3 digits</p>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-[1.02] transition duration-200 shadow-lg"
        >
          {submitting ? 'Submitting...' : 'Submit Order'}
        </button>
      </form>
    </div>
  );
}
