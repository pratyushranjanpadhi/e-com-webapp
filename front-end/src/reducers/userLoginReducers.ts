import * as actionTypes from "../actionTypes";

const userLoginReducer = (state = {}, action: any) => {
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

const userRegisterReducer = (state = {}, action: any) => {
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

const userDetailsReducer = (state = { user: {} }, action: any) => {
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

const userProfileUpdateReducer = (state = {}, action: any) => {
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

const userListReducer = (state = { users: [] }, action: any) => {
   switch (action.type) {
      case actionTypes.USER_LIST_REQUEST:
         return { loading: true };
      case actionTypes.USER_LIST_SUCCESS:
         return { loading: false, users: action.payload };
      case actionTypes.USER_LIST_FAIL:
         return { loading: false, error: action.payload };
      case actionTypes.USER_DETAILS_RESET:
         return { users: [] };
      default:
         return state;
   }
};

const userDeleteReducer = (state = {}, action: any) => {
   switch (action.type) {
      case actionTypes.USER_DELETE_REQUEST:
         return { loading: true };
      case actionTypes.USER_DELETE_SUCCESS:
         return { loading: false, success: true };
      case actionTypes.USER_DELETE_FAIL:
         return { loading: false, error: action.payload };
      default:
         return state;
   }
};

const userUpdateReducer = (state = { user: {} }, action: any) => {
   switch (action.type) {
      case actionTypes.USER_UPDATE_REQUEST:
         return { loading: true };
      case actionTypes.USER_UPDATE_SUCCESS:
         return { loading: false, success: true };
      case actionTypes.USER_UPDATE_FAIL:
         return { loading: false, error: action.payload };
      case actionTypes.USER_UPDATE_RESET:
         return { user: {} };
      default:
         return state;
   }
};

export {
   userLoginReducer,
   userRegisterReducer,
   userDetailsReducer,
   userProfileUpdateReducer,
   userListReducer,
   userDeleteReducer,
   userUpdateReducer,
};
