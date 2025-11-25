import { useState } from 'react';
import type { ClientFormData } from '../types';
import { addOrder } from '../utils/storage';

const BEVERAGES = [
  'Water',
  'Beer',
  'Gin',
  'Pink Gin',
  'Smirnoff Cola',
  'Capitan Morgan',
];

export default function ClientArea() {
  const [formData, setFormData] = useState<ClientFormData>({
    registro: '',
    bebida: '',
    quantidade: null,
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.registro.trim() || !formData.bebida) {
      setMessage({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }

    // Garante que quantidade é número positivo
    if (formData.quantidade === null || formData.quantidade <= 0) {
      setMessage({ type: 'error', text: 'Please enter a valid quantity.' });
      return;
    }

    // Aqui criamos um objeto com quantidade já garantida como number
    const payload = {
      registro: formData.registro,
      bebida: formData.bebida,
      quantidade: formData.quantidade,
    };

    addOrder(payload); // agora o tipo bate com Omit<Order, 'id' | 'timestamp' | 'status'>

    setMessage({ type: 'success', text: '✓ Order submitted successfully!' });
    setFormData({ registro: '', bebida: '', quantidade: null });

    setTimeout(() => setMessage(null), 3000);
  };

  const handleRegistroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Apenas números, máximo 3 dígitos
    if (/^\d{0,3}$/.test(value)) {
      setFormData({ ...formData, registro: value });
    }
  };

  const handleQuantidadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Apenas números, máximo 3 dígitos
    if (/^\d{0,3}$/.test(value)) {
      if (value === '') {
        setFormData({ ...formData, quantidade: null });
        return;
      }
      const num = parseInt(value, 10);
      if (!Number.isNaN(num) && num <= 999) {
        setFormData({ ...formData, quantidade: num });
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
            value={formData.registro}
            onChange={handleRegistroChange}
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
            value={formData.bebida}
            onChange={(e) => setFormData({ ...formData, bebida: e.target.value })}
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
            value={formData.quantidade ?? ''}
            onChange={handleQuantidadeChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="e.g. 1"
            maxLength={3}
            required
          />
          <p className="text-xs text-gray-500 mt-1">Maximum 3 digits</p>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] transition duration-200 shadow-lg"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
}
