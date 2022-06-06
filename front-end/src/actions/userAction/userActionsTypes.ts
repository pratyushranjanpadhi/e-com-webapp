import * as actionTypes from "actionTypes";
import { IUser, IUserResponseDetails } from "types";

export interface UserLoginRequest {
   type: typeof actionTypes.USER_LOGIN_REQUEST;
}

export interface UserLoginSuccess {
   type: typeof actionTypes.USER_LOGIN_SUCCESS;
   payload: IUserResponseDetails;
}

export interface UserLoginFail {
   type: typeof actionTypes.USER_LOGIN_FAIL;
   payload: string;
}

export type UserLoginDispatchType =
   | UserLoginRequest
   | UserLoginSuccess
   | UserLoginFail
   | UserLogout;
export interface UserLogout {
   type: typeof actionTypes.USER_LOGOUT;
}

export interface UserDetailsReset {
   type: typeof actionTypes.USER_DETAILS_RESET;
}

export interface MyOrderListReset {
   type: typeof actionTypes.MY_ORDER_LIST_RESET;
}

export interface UserListReset {
   type: typeof actionTypes.USER_LIST_RESET;
}

export type UserLogoutDispatchType =
   | UserLogout
   | UserDetailsReset
   | MyOrderListReset
   | UserListReset;

export interface UserRegisterRequest {
   type: typeof actionTypes.USER_REGISTER_REQUEST;
}

export interface UserRegisterSuccess {
   type: typeof actionTypes.USER_REGISTER_SUCCESS;
   payload: IUserResponseDetails;
}

export interface UserRegisterFail {
   type: typeof actionTypes.USER_REGISTER_FAIL;
   payload: string;
}

export type UserRegisterDispatchType =
   | UserLoginSuccess
   | UserRegisterRequest
   | UserRegisterSuccess
   | UserRegisterFail;

export interface UserDetailsRequest {
   type: typeof actionTypes.USER_DETAILS_REQUEST;
}

export interface UserDetailsSuccess {
   type: typeof actionTypes.USER_DETAILS_SUCCESS;
   payload: IUser | IUserResponseDetails;
}

export interface UserDetailsFail {
   type: typeof actionTypes.USER_DETAILS_FAIL;
   payload: string;
}

export interface UserDetailsReset {
   type: typeof actionTypes.USER_DETAILS_RESET;
}

export type UserDetailsDispatchType =
   | UserDetailsRequest
   | UserDetailsSuccess
   | UserDetailsFail
   | UserDetailsReset;

export interface UpdateUserProfileRequest {
   type: typeof actionTypes.USER_PROFILE_UPDATE_REQUEST;
}

export interface UpdateUserProfileSuccess {
   type: typeof actionTypes.USER_PROFILE_UPDATE_SUCCESS;
   payload: IUserResponseDetails;
}

export interface UpdateUserProfileFail {
   type: typeof actionTypes.USER_PROFILE_UPDATE_FAIL;
   payload: string;
}

export type UpdateUserProfileDispatchType =
   | UpdateUserProfileRequest
   | UpdateUserProfileSuccess
   | UpdateUserProfileFail;

export interface UsersListRequest {
   type: typeof actionTypes.USER_LIST_REQUEST;
}

export interface UsersListSuccess {
   type: typeof actionTypes.USER_LIST_SUCCESS;
   payload: IUser[];
}

export interface UsersListFail {
   type: typeof actionTypes.USER_LIST_FAIL;
   payload: string;
}

export type UsersListDispatchType =
   | UsersListRequest
   | UsersListSuccess
   | UsersListFail
   | UserDetailsReset;

export interface UserDeleteRequest {
   type: typeof actionTypes.USER_DELETE_REQUEST;
}

export interface UserDeleteSuccess {
   type: typeof actionTypes.USER_DELETE_SUCCESS;
}

export interface UserDeleteFail {
   type: typeof actionTypes.USER_DELETE_FAIL;
   payload: string;
}

export type UserDeleteDispatchType = UserDeleteRequest | UserDeleteSuccess | UserDeleteFail;

export interface UserUpdateRequest {
   type: typeof actionTypes.USER_UPDATE_REQUEST;
}

export interface UserUpdateSuccess {
   type: typeof actionTypes.USER_UPDATE_SUCCESS;
}

export interface UserUpdateFail {
   type: typeof actionTypes.USER_UPDATE_FAIL;
   payload: string;
}

export interface UserUpdateReset {
   type: typeof actionTypes.USER_UPDATE_RESET;
}

export type UserUpdateDispatchType =
   | UserUpdateRequest
   | UserUpdateSuccess
   | UserUpdateFail
   | UserUpdateReset
   | UserDetailsSuccess;
