import { ICartItem, ICreateOrder, IOrder, IPaymentMethod, IProduct, IShippingAddress } from "types";

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

export interface IProductListState {
   loading?: boolean;
   products: IProduct[];
   page?: number;
   totalPages?: number;
   error?: string;
}

export interface IProductDetailsState {
   loading?: boolean;
   product: IProduct;
   error?: string;
}

export interface IProductDeleteState {
   loading?: boolean;
   success?: boolean;
   error?: string;
}

export interface IProductCreateState {
   loading?: boolean;
   success?: boolean;
   error?: string;
}

export interface IProductUpdateState {
   loading?: boolean;
   product: IProduct;
   success?: boolean;
   error?: string;
}

export interface IProductCreateReviewState {
   loading?: boolean;
   success?: boolean;
   error?: string;
}

export interface ITopRatedProductState {
   loading?: boolean;
   products: IProduct[];
   error?: string;
}
