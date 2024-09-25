import { Product } from "./Product";

export interface CartItem {
    cartItemId: number;
    quantity: number;
    product: Product;
  }
  