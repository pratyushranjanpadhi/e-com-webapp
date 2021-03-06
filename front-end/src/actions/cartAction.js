import axios from "axios";
import * as actionTypes from "../actionTypes";

// action to add to the cart
const addToCart = (id, quantity) => async (dispatch, getState) => {
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
const removeFromCart = (id) => (dispatch, getState) => {
   dispatch({
      type: actionTypes.CART_REMOVE_ITEM,
      payload: id,
   });
   localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//action to handle shipping address
const saveShippingAddress = (data) => (dispatch) => {
   dispatch({
      type: actionTypes.CART_SAVE_SHIPPING_DETAILS,
      payload: data,
   });

   localStorage.setItem("shippingAddress", JSON.stringify(data));
};

const savePaymentMethod = (data) => (dispatch) => {
   dispatch({
      type: actionTypes.CART_SAVE_PAYMENT_METHOD,
      payload: data,
   });

   localStorage.setItem("paymentMethod", JSON.stringify(data));
};
export { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod };
