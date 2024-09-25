import { OrderItem } from "./OrderItem";
import { User } from "./User";

export interface userOrder {
    orderId: number;
    totalAmount: number;
    orderDate: string;
    user: User;
    orderItems: OrderItem[];
}