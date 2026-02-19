export interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  status: string;
  categoryId: { _id: string; name: string };
  shopId: string;
  isLowStock?: boolean;
  imageUrl?: string;
}

