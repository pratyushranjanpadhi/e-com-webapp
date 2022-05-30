export interface IReview {
   _id: string;
   name: string;
   rating: number;
   comment: string;
}

export interface IShippingAddress {
   address: string;
   city: string;
   postalCode: string;
   country: string;
}

export interface IPaymentResult {
   id: string;
   status: string;
   update_time: string;
   email_address: string;
}

export interface IOrderItem {
   _id: string;
   product: IProduct;
   name: string;
   image: string;
   price: number;
   quantity: number;
}

export interface IUser {
   _id: string;
   isAdmin: boolean;
   name: string;
   email: string;
   password: string;
}

export interface IProduct {
   _id: string;
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

export interface IOrder {
   _id: string;
   taxPrice: string;
   shippingPrice: string;
   totalPrice: string;
   isPaid: boolean;
   isDelivered: boolean;
   orderItems: IOrderItem[];
   user: IUser;
   paymentMethod: string;
   paidAt?: Date;
   deliveredAt?: Date;
   shippingAddress?: IShippingAddress;
   paymentResult?: IPaymentResult;
}
