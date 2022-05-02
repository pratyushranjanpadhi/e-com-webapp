import * as actionTypes from "../actionTypes";

const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action: any) => {
   switch (action.type) {
      case actionTypes.CART_ADD_ITEM:
         const item = action.payload;
         const existItem: any = state.cartItems.find((x: any) => x.product === item.product);
         if (existItem) {
            return {
               ...state,
               cartItems: state.cartItems.map((x: any) =>
                  x.product === existItem.product ? item : x
               ),
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
            cartItems: state.cartItems.filter((item: any) => item.product !== action.payload),
         };

      case actionTypes.CART_SAVE_SHIPPING_DETAILS:
         return {
            ...state,
            shippingAddress: action.payload,
         };

      case actionTypes.CART_SAVE_PAYMENT_METHOD:
         return {
            ...state,
            paymentMethod: action.payload,
         };
      default:
         return state;
   }
};

export { cartReducer };
