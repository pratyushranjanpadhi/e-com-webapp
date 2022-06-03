import * as actionTypes from "actionTypes";
import { IShippingAddress, ICartItem, IPaymentMethod } from "types";

export interface AddToCartDispatchType {
   type: typeof actionTypes.CART_ADD_ITEM;
   payload: ICartItem;
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
   payload: IPaymentMethod;
}
