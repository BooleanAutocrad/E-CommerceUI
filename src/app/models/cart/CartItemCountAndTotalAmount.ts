import { ProductDTO } from "./ProductDTO";

export interface CartItemCountAndTotalAmount {
  cartItemCount: number;
  cartTotalAmount: number;
  products: ProductDTO[];
}
