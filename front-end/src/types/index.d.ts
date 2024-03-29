export interface IReview {
   _id?: string;
   name?: string;
   rating: number;
   comment: string;
}

export interface IShippingAddress {
   address: string;
   city: string;
   postalCode: string;
   country: string;
}

export type IPaymentMethod = string;

export interface IPaymentResult {
   id: string;
   status: string;
   update_time: string;
   email_address: string;
}

export interface IOrderItem {
   _id?: string;
   product: IProduct;
   name: string;
   image: string;
   price: number;
   quantity: number;
}

export interface IUser {
   id?: string;
   name: string;
   email: string;
   password: string;
}

export interface IUserResponseDetails {
   _id?: string;
   name: string;
   email: string;
   isAdmin: boolean;
   token?: string;
}

export interface IProduct {
   _id?: string;
   price: number;
   countInStock: number;
   rating: number;
   numReviews: number;
   name: string;
   image: string;
   description: string;
   brand: string;
   category: string;
   user: string;
   review?: IReview[];
}

export interface IUpdateProductRequest {
   _id: string;
   name: string;
   price: number;
   image: string;
   brand: string;
   category: string;
   countInStock: number;
   description: string;
}

export interface IOrder {
   _id?: string;
   taxPrice: string;
   shippingPrice: string;
   totalPrice: string;
   isPaid: boolean;
   isDelivered: boolean;
   orderItems: IOrderItem[];
   user: string;
   paymentMethod: string;
   paidAt?: Date;
   deliveredAt?: Date;
   shippingAddress?: IShippingAddress;
   paymentResult?: IPaymentResult;
}

export interface ICreateOrder {
   orderItems: ICartItem[];
   shippingAddress: IShippingAddress;
   paymentMethod: IPaymentMethod;
   itemsPrice: string;
   shippingPrice: string;
   taxPrice: string;
   totalPrice: string;
   //  orderItems,
   //  shippingAddress,
   //  paymentMethod,
   //  itemsPrice,
   //  taxPrice,
   //  shippingPrice,
   //  totalPrice,
}

export interface ICartItem {
   product: string;
   name: string;
   image: string;
   price: number;
   countInStock: number;
   quantity: number;
}
