import { useState } from 'react';
import type { ClientFormData } from '../types';
import { addOrder } from '../utils/storage';

const BEBIDAS = [
  'Água',
  'Refrigerante',
  'Suco de Laranja',
  'Suco de Uva',
  'Cerveja',
  'Café',
  'Chá',
  'Energético',
];

export default function ClientArea() {
  const [formData, setFormData] = useState<ClientFormData>({
    registro: '',
    bebida: '',
    quantidade: 1,
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.registro.trim() || !formData.bebida) {
      setMessage({ type: 'error', text: 'Por favor, preencha todos os campos obrigatórios.' });
      return;
    }

    addOrder(formData);
    setMessage({ type: 'success', text: '✓ Pedido enviado com sucesso!' });
    setFormData({ registro: '', bebida: '', quantidade: 1 });

    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-2xl">
      <div className="text-center mb-6">
        <div className="inline-block p-3 bg-blue-100 rounded-full mb-3">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Solicitar Bebida</h2>
        <p className="text-gray-500 mt-2">Preencha o formulário abaixo</p>
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
            Número de Registro <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.registro}
            onChange={(e) => setFormData({ ...formData, registro: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="Ex: 12345"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Bebida <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.bebida}
            onChange={(e) => setFormData({ ...formData, bebida: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            required
          >
            <option value="">Selecione uma bebida</option>
            {BEBIDAS.map((bebida) => (
              <option key={bebida} value={bebida}>
                {bebida}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Quantidade
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={formData.quantidade}
            onChange={(e) => setFormData({ ...formData, quantidade: parseInt(e.target.value) })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] transition duration-200 shadow-lg"
        >
          Enviar Pedido
        </button>
      </form>
    </div>
  );
}
