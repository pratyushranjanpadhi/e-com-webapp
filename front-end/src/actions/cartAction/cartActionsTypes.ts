import * as actionTypes from "actionTypes";
import { IShippingAddress } from "types";

export interface AddToCartDispatchType {
   type: typeof actionTypes.CART_ADD_ITEM;
   payload: {
      product: string;
      name: string;
      image: string;
      price: number;
      countInStock: number;
      quantity: number;
   };
}

export interface RemoveFromCartDispatchType {
   type: typeof actionTypes.CART_REMOVE_ITEM;
   payload: string;
}

export interface SaveShippingAddressDispatchType {
   type: typeof actionTypes.CART_SAVE_SHIPPING_DETAILS;
   payload: IShippingAddress;
}

export interface SavePaymentMethodDispatchType {
   type: typeof actionTypes.CART_SAVE_PAYMENT_METHOD;
   payload: string;
}
