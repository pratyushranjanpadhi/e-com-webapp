import * as actionTypes from "../actionTypes";

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

const userDetailsReducer = (state = { user: {} }, action) => {
   switch (action.type) {
      case actionTypes.USER_DETAILS_REQUEST:
         return {
            ...state,
            loading: true,
         };
      case actionTypes.USER_DETAILS_SUCCESS:
         return {
            loading: false,
            user: action.payload,
         };
      case actionTypes.USER_DETAILS_FAIL:
         return {
            loading: false,
            error: action.payload,
         };
      case actionTypes.USER_DETAILS_RESET:
         return { user: {} };
      default:
         return state;
   }
};

const userProfileUpdateReducer = (state = {}, action) => {
   switch (action.type) {
      case actionTypes.USER_PROFILE_UPDATE_REQUEST:
         return {
            loading: true,
         };
      case actionTypes.USER_PROFILE_UPDATE_SUCCESS:
         return {
            loading: false,
            success: true,
            userInfo: action.payload,
         };
      case actionTypes.USER_PROFILE_UPDATE_FAIL:
         return {
            loading: false,
            error: action.payload,
         };
      default:
         return state;
   }
};

export { userLoginReducer, userRegisterReducer, userDetailsReducer, userProfileUpdateReducer };
