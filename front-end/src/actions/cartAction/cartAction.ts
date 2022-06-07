import axios from "axios";
import { Dispatch } from "redux";
import { IShippingAddress } from "types";
import * as actionTypes from "actionTypes";
import {
   AddToCartDispatchType,
   RemoveFromCartDispatchType,
   SavePaymentMethodDispatchType,
   SaveShippingAddressDispatchType,
} from "./cartActionsTypes";
import { ApplicationState } from "store";

// action to add to the cart
const addToCart =
   (id: string, quantity: number) =>
   async (dispatch: Dispatch<AddToCartDispatchType>, getState: () => ApplicationState) => {
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch({
         type: actionTypes.CART_ADD_ITEM,
         payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            quantity,
         },
      });
      localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
   };

// action to remove from cart
const removeFromCart =
   (id: string) =>
   (dispatch: Dispatch<RemoveFromCartDispatchType>, getState: () => ApplicationState) => {
      dispatch({
         type: actionTypes.CART_REMOVE_ITEM,
         payload: id,
      });
      localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
   };

//action to handle shipping address
const saveShippingAddress =
   (data: IShippingAddress) => (dispatch: Dispatch<SaveShippingAddressDispatchType>) => {
      dispatch({
         type: actionTypes.CART_SAVE_SHIPPING_DETAILS,
         payload: data,
      });

      localStorage.setItem("shippingAddress", JSON.stringify(data));
   };

const savePaymentMethod = (data: string) => (dispatch: Dispatch<SavePaymentMethodDispatchType>) => {
   dispatch({
      type: actionTypes.CART_SAVE_PAYMENT_METHOD,
      payload: data,
   });

   localStorage.setItem("paymentMethod", JSON.stringify(data));
};
export { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod };
