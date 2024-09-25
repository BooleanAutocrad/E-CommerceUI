import { Product } from "./Product";

export interface OrderItem {
    orderItemId: number;
    quantity: number;
    product: Product;
}