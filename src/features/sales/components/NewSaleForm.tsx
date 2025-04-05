import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SaleFormData } from '../../../types/sale';
import { createSale } from '../../../services/api/saleService';
import { mockCustomer, mockBranch, mockProducts, generateSaleNumber } from '../../../services/mockData';

const NewSaleForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SaleFormData>({
    saleNumber: generateSaleNumber(),
    saleDate: new Date().toISOString(),
    customerId: mockCustomer.id,
    customerName: mockCustomer.name,
    branchId: mockBranch.id,
    branchName: mockBranch.name,
    items: []
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleProductSelect = (index: number, productId: string) => {
    const product = mockProducts.find(p => p.id === productId);
    if (product) {
      const newItems = [...formData.items];
      newItems[index] = {
        ...newItems[index],
        productId: product.id,
        productName: product.name,
        quantity: 1,
        unitPrice: product.price
      };
      setFormData({ ...formData, items: newItems });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Formatar a data para o formato UTC
      const saleData = {
        ...formData,
        saleDate: new Date(formData.saleDate).toISOString()
      };

      console.log('Enviando venda:', saleData);
      await createSale(saleData);
      navigate('/sales');
    } catch (err: any) {
      console.error('Erro ao criar venda:', err);
      setError(err.response?.data?.message || 'Erro ao criar venda');
    } finally {
      setLoading(false);
    }
  };

  const handleItemChange = (index: number, field: keyof typeof formData.items[0], value: string | number) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { productId: '', productName: '', quantity: 1, unitPrice: 0 }
      ]
    });
  };

  const removeItem = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const calculateTotal = () => {
    return formData.items.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Nova Venda</h1>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Número da Venda</label>
                <input
                  type="text"
                  value={formData.saleNumber}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Data da Venda</label>
                <input
                  type="datetime-local"
                  value={formData.saleDate.slice(0, 16)}
                  onChange={(e) => setFormData({ ...formData, saleDate: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Cliente</label>
                <input
                  type="text"
                  value={formData.customerName}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Filial</label>
                <input
                  type="text"
                  value={formData.branchName}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Itens</label>
              <div className="space-y-4">
                {formData.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-4 items-end bg-gray-50 p-4 rounded-lg">
                    <div className="col-span-5">
                      <label className="block text-xs font-medium text-gray-500">Produto</label>
                      <select
                        value={item.productId}
                        onChange={(e) => handleProductSelect(index, e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                        required
                      >
                        <option value="">Selecione um produto</option>
                        {mockProducts.map(product => (
                          <option key={product.id} value={product.id}>
                            {product.name} - R$ {product.price.toFixed(2)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-2">
                      <label className="block text-xs font-medium text-gray-500">Quantidade</label>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                        required
                        min="1"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-xs font-medium text-gray-500">Preço Unit.</label>
                      <input
                        type="text"
                        value={`R$ ${item.unitPrice.toFixed(2)}`}
                        readOnly
                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-xs font-medium text-gray-500">Subtotal</label>
                      <input
                        type="text"
                        value={`R$ ${(item.quantity * item.unitPrice).toFixed(2)}`}
                        readOnly
                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
                      />
                    </div>

                    <div className="col-span-1">
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="text-red-600 hover:text-red-900"
                        disabled={formData.items.length === 1}
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={addItem}
                  className="text-sm text-amber-600 hover:text-amber-700"
                >
                  + Adicionar Item
                </button>
                <div className="text-xl font-bold">
                  Total: R$ {calculateTotal().toFixed(2)}
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
                {error}
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/sales')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 disabled:opacity-50"
                disabled={loading || formData.items.length === 0}
              >
                {loading ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewSaleForm; 