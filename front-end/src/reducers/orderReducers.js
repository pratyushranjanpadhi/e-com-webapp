import * as actionTypes from "../actionTypes";

const createOrderReducer = (state = {}, action) => {
   switch (action.type) {
      case actionTypes.CREATE_ORDER_REQUEST:
         return {
            loading: true,
         };
      case actionTypes.CREATE_ORDER_SUCCESS:
         return {
            loading: false,
            success: true,
            order: action.payload,
         };
      case actionTypes.CREATE_ORDER_FAIL:
         return {
            loading: false,
            error: action.payload,
         };
      default:
         return state;
   }
};

const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
   switch (action.type) {
      case actionTypes.ORDER_DETAILS_REQUEST:
         return {
            ...state,
            loading: true,
         };
      case actionTypes.ORDER_DETAILS_SUCCESS:
         return {
            loading: false,
            order: action.payload,
         };
      case actionTypes.ORDER_DETAILS_FAIL:
         return {
            loading: false,
            error: action.payload,
         };
      default:
         return state;
   }
};

const orderPayReducer = (state = {}, action) => {
   switch (action.type) {
      case actionTypes.ORDER_PAY_REQUEST:
         return {
            loading: true,
         };
      case actionTypes.ORDER_PAY_SUCCESS:
         return {
            loading: false,
            success: true,
         };
      case actionTypes.ORDER_PAY_FAIL:
         return {
            loading: false,
            error: action.payload,
         };
      case actionTypes.ORDER_PAY_RESET:
         return {};
      default:
         return state;
   }
};

const myOrderListReducer = (state = { orders: [] }, action) => {
   switch (action.type) {
      case actionTypes.MY_ORDER_LIST_REQUEST:
         return {
            loading: true,
         };
      case actionTypes.MY_ORDER_LIST_SUCCESS:
         return {
            loading: false,
            orders: action.payload,
         };
      case actionTypes.MY_ORDER_LIST_FAIL:
         return {
            loading: false,
            error: action.payload,
         };
      case actionTypes.MY_ORDER_LIST_RESET:
         return { orders: [] };
      default:
         return state;
   }
};

export { createOrderReducer, orderDetailsReducer, orderPayReducer, myOrderListReducer };
