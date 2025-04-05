import api from './axiosConfig';
import { Sale, SaleFormData } from '../../types/sale';

export interface PaginatedResponse<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
}

export const getSales = async (page = 1, pageSize = 10): Promise<PaginatedResponse<Sale>> => {
  try {
    console.log('Buscando vendas:', { page, pageSize });
    const response = await api.get<PaginatedResponse<Sale>>('/api/v1/sales', {
      params: { page, pageSize }
    });
    console.log('Resposta das vendas:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar vendas:', error);
    throw error;
  }
};

export const createSale = async (saleData: SaleFormData): Promise<Sale> => {
  const response = await api.post<Sale>('/api/v1/sales/create', saleData);
  return response.data;
};

export const cancelSale = async (id: string): Promise<void> => {
  await api.patch(`/api/v1/sales/${id}/cancel`);
}; 