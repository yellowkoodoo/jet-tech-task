import { Order } from "./../../data/Order";

export interface OrderResponse extends Order {}

export interface OrdersResponse {
    data: Order[];
}
