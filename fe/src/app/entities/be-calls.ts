export interface CartItem {
  id?: string;
  purchaseid?: number;
  date?: Date;
  product: string | Product;
  quantity: number;
  pricePerUnit: number;
}

export interface Product {
  id?: string;
  itemid?: number;
  title: string;
  description: string;
  netPrice: number;
  stock: number;
}
