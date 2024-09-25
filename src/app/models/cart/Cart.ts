import { CartItem } from "./CartItems";
import { User } from "./User";

export interface Cart {
    cartId: number;
    totalAmount: number;
    user: User;
    cartItems: CartItem[];
  }
  