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

export { createOrderReducer };
