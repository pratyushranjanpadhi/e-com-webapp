import * as actionTypes from "../actionTypes";

export const cartReducer = (state = { cartItems: [] }, action) => {
   switch (action.type) {
      case actionTypes.CART_ADD_ITEM:
         const item = action.payload;
         const existItem = state.cartItems.find((x) => x.product === item.product);
         if (existItem) {
            return {
               ...state,
               cartItems: state.cartItems.map((x) => (x.product === existItem.product ? item : x)),
            };
         } else {
            return {
               ...state,
               cartItems: [...state.cartItems, item],
            };
         }

      case actionTypes.CART_REMOVE_ITEM:
         return {
            ...state,
            cartItems: state.cartItems.filter((item) => item.product !== action.payload),
         };
      default:
         return state;
   }
};
