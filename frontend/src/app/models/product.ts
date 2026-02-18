export interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  status: string;
  categoryId: { _id: string; name: string };
  lowStockThreshold?: number;
  shopId: string;
  isLowStock?: boolean;
}

