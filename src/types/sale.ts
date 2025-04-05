export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Sale {
  id: string;
  saleNumber: string;
  saleDate: string;
  customerId: string;
  customerName: string;
  branchId: string;
  branchName: string;
  totalAmount: number;
  isCancelled: boolean;
  items: SaleItem[];
}

export interface SaleFormData {
  saleNumber: string;
  saleDate: string;
  customerId: string;
  customerName: string;
  branchId: string;
  branchName: string;
  items: SaleItem[];
} 