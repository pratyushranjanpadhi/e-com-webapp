import { ICartItem, ICreateOrder, IOrder, IPaymentMethod, IShippingAddress } from "types";

export interface ICartState {
   cartItems: ICartItem[];
   shippingAddress: IShippingAddress;
   paymentMethod?: IPaymentMethod;
}

export interface ICreateOrderState {
   loading?: boolean;
   success?: boolean;
   order?: ICreateOrder;
   error?: string;
}

export interface IOrderDetailsState {
   loading: boolean;
   order?: IOrder[];
   error?: string;
}

export interface IOrderPayState {
   loading?: boolean;
   success?: boolean;
   error?: string;
}

export interface IOrderDeliverState {
   loading?: boolean;
   success?: boolean;
   error?: string;
}

export interface IMyOrderListState {
   loading?: boolean;
   orders: IOrder[];
   error?: string;
}

export interface IOrderListState {
   loading?: boolean;
   orders: IOrder[];
   error?: string;
}
