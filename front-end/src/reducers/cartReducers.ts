import { CartDispatchType } from "actions/cartAction/cartActionsTypes";
import * as actionTypes from "actionTypes";
import { ICartState } from "reducers/types";

const cartDefaultState: ICartState = {
   cartItems: [],
   shippingAddress: {
      address: "",
      city: "",
      postalCode: "",
      country: "",
   },
};

const cartReducer = (state: ICartState = cartDefaultState, action: CartDispatchType) => {
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
