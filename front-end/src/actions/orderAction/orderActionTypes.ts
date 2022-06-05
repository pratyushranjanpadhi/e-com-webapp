import * as actionTypes from "actionTypes";
import { ICreateOrder, IOrder } from "types";

// PayOrder
export interface CreateOrderRequest {
   type: typeof actionTypes.CREATE_ORDER_REQUEST;
}

export interface CreateOrderSuccess {
   type: typeof actionTypes.CREATE_ORDER_SUCCESS;
   payload: ICreateOrder;
}

export interface CreateOrderFail {
   type: typeof actionTypes.CREATE_ORDER_FAIL;
   payload: string;
}

export type CreateOrderDispatchType = CreateOrderRequest | CreateOrderSuccess | CreateOrderFail;

// OrderDetails
export interface OrderDetailsRequest {
   type: typeof actionTypes.ORDER_DETAILS_REQUEST;
}

export interface OrderDetailsSuccess {
   type: typeof actionTypes.ORDER_DETAILS_SUCCESS;
   payload: IOrder;
}

export interface OrderDetailsFail {
   type: typeof actionTypes.ORDER_DETAILS_FAIL;
   payload: string;
}

export type GetOrderDetailsDispatchType =
   | OrderDetailsRequest
   | OrderDetailsSuccess
   | OrderDetailsFail;

// PayOrder
export interface OrderPayRequest {
   type: typeof actionTypes.ORDER_PAY_REQUEST;
}

export interface OrderPaySuccess {
   type: typeof actionTypes.ORDER_PAY_SUCCESS;
   payload: IOrder;
}

export interface OrderPayFail {
   type: typeof actionTypes.ORDER_PAY_FAIL;
   payload: string;
}

export type OrderPayDispatchType = OrderPayRequest | OrderPaySuccess | OrderPayFail;

// DeliverOrder
export interface OrderDeliverRequest {
   type: typeof actionTypes.ORDER_DELIVER_REQUEST;
}

export interface OrderDeliverSuccess {
   type: typeof actionTypes.ORDER_DELIVER_SUCCESS;
   payload: IOrder;
}

export interface OrderDeliverFail {
   type: typeof actionTypes.ORDER_DELIVER_FAIL;
   payload: string;
}

export type OrderDeliverDispatchType = OrderDeliverRequest | OrderDeliverSuccess | OrderDeliverFail;

// MyOrderList
export interface ListMyOrdersRequest {
   type: typeof actionTypes.MY_ORDER_LIST_REQUEST;
}

export interface ListMyOrdersSuccess {
   type: typeof actionTypes.MY_ORDER_LIST_SUCCESS;
   payload: IOrder[];
}

export interface ListMyOrdersFail {
   type: typeof actionTypes.MY_ORDER_LIST_FAIL;
   payload: string;
}

export type ListMyOrdersDispatchType = ListMyOrdersRequest | ListMyOrdersSuccess | ListMyOrdersFail;

// ListAllOrders
export interface ListAllOrdersRequest {
   type: typeof actionTypes.ORDER_LIST_REQUEST;
}

export interface ListAllOrdersSuccess {
   type: typeof actionTypes.ORDER_LIST_SUCCESS;
   payload: IOrder[];
}

export interface ListAllOrdersFail {
   type: typeof actionTypes.ORDER_LIST_FAIL;
   payload: string;
}

export type ListAllOrdersDispatchType =
   | ListAllOrdersRequest
   | ListAllOrdersSuccess
   | ListAllOrdersFail;
