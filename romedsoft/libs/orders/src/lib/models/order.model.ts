import { Product } from "@romedsoft/products";
import { User } from "@romedsoft/users";

export class Order {
    id?: string;
    orderItems? : OrderItem[];
    shippingAddress1? : string;
    shippingAddress2? : string;
    zip? : string;
    city? : string;
    country? : string;
    phone? :string;
    status?: string;
    totalPrice?: number;
    user? : User;
    dateOrdered?: Date;
}

export class OrderItem{
    id?: string;
    quantity?: number;
    product?: Product;
}

