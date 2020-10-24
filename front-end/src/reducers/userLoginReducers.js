import * as actionTypes from "../actionTypes";

// User Login and Logout Reducer
const userLoginReducer = (state = {}, action) => {
   switch (action.type) {
      case actionTypes.USER_LOGIN_REQUEST:
         return { loading: true };
      case actionTypes.USER_LOGIN_SUCCESS:
         return { loading: false, userInfo: action.payload };
      case actionTypes.USER_LOGIN_FAIL:
         return { loading: false, error: action.payload };
      case actionTypes.USER_LOGOUT:
         return {};
      default:
         return state;
   }
};

// User Register Reducer
const userRegisterReducer = (state = {}, action) => {
   switch (action.type) {
      case actionTypes.USER_REGISTER_REQUEST:
         return {
            loading: true,
         };
      case actionTypes.USER_REGISTER_SUCCESS:
         return {
            loading: false,
            userInfo: action.payload,
         };
      case actionTypes.USER_REGISTER_FAIL:
         return {
            loading: false,
            error: action.payload,
         };
      default:
         return state;
   }
};

export { userLoginReducer, userRegisterReducer };
