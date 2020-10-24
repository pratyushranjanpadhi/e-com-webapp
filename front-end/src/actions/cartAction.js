import axios from "axios";
import * as actionTypes from "../actionTypes";

export const addToCart = (id, quantity) => async (dispatch, getState) => {
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

export const removeFromCart = (id) => (dispatch, getState) => {
   dispatch({
      type: actionTypes.CART_REMOVE_ITEM,
      payload: id,
   });
   localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
