import * as actionTypes from "actionTypes";
import { IProduct } from "types";

export interface ListProductsRequest {
   type: typeof actionTypes.PRODUCT_LIST_REQUEST;
}

export interface ListProductsSuccess {
   type: typeof actionTypes.PRODUCT_LIST_SUCCESS;
   payload: {
      products: IProduct[];
      page: number;
      pageSize: number;
   };
}

export interface ListProductsFail {
   type: typeof actionTypes.PRODUCT_LIST_FAIL;
   payload: string;
}

export type ListProductsDispatchType = ListProductsRequest | ListProductsSuccess | ListProductsFail;

export interface ListProductDetailsRequest {
   type: typeof actionTypes.PRODUCT_DETAILS_REQUEST;
}

export interface ListProductDetailsSuccess {
   type: typeof actionTypes.PRODUCT_DETAILS_SUCCESS;
   payload: IProduct;
}

export interface ListProductDetailsFail {
   type: typeof actionTypes.PRODUCT_DETAILS_FAIL;
   payload: string;
}

export type ListProductDetailsDispatchType =
   | ListProductDetailsRequest
   | ListProductDetailsSuccess
   | ListProductDetailsFail;

export interface DeleteProductRequest {
   type: typeof actionTypes.PRODUCT_DELETE_REQUEST;
}

export interface DeleteProductSuccess {
   type: typeof actionTypes.PRODUCT_DELETE_SUCCESS;
}

export interface DeleteProductFail {
   type: typeof actionTypes.PRODUCT_DELETE_FAIL;
   payload: string;
}

export type DeleteProductDispatchType =
   | DeleteProductRequest
   | DeleteProductSuccess
   | DeleteProductFail;

export interface CreateProductRequest {
   type: typeof actionTypes.PRODUCT_CREATE_REQUEST;
}

export interface CreateProductSuccess {
   type: typeof actionTypes.PRODUCT_CREATE_SUCCESS;
   payload: IProduct;
}

export interface CreateProductFail {
   type: typeof actionTypes.PRODUCT_CREATE_FAIL;
   payload: string;
}

export type CreateProductDispatchType =
   | CreateProductRequest
   | CreateProductSuccess
   | CreateProductFail;

export interface UpdateProductRequest {
   type: typeof actionTypes.PRODUCT_UPDATE_REQUEST;
}

export interface UpdateProductSuccess {
   type: typeof actionTypes.PRODUCT_UPDATE_SUCCESS;
   payload: IProduct;
}

export interface UpdateProductFail {
   type: typeof actionTypes.PRODUCT_UPDATE_FAIL;
   payload: string;
}

export type UpdateProductDispatchType =
   | UpdateProductRequest
   | UpdateProductSuccess
   | UpdateProductFail;

export interface CreateProductReviewRequest {
   type: typeof actionTypes.PRODUCT_CREATE_REVIEW_REQUEST;
}

export interface CreateProductReviewSuccess {
   type: typeof actionTypes.PRODUCT_CREATE_REVIEW_SUCCESS;
}

export interface CreateProductReviewFail {
   type: typeof actionTypes.PRODUCT_CREATE_REVIEW_FAIL;
   payload: string;
}

export type CreateProductReviewDispatchType =
   | CreateProductReviewRequest
   | CreateProductReviewSuccess
   | CreateProductReviewFail;

export interface ListTopRatedProductRequest {
   type: typeof actionTypes.PRODUCT_TOP_RATED_REQUEST;
}

export interface ListTopRatedProductSuccess {
   type: typeof actionTypes.PRODUCT_TOP_RATED_SUCCESS;
   payload: IProduct[];
}

export interface ListTopRatedProductFail {
   type: typeof actionTypes.PRODUCT_TOP_RATED_FAIL;
   payload: string;
}

export type ListTopRatedProductDispatchType =
   | ListTopRatedProductRequest
   | ListTopRatedProductSuccess
   | ListTopRatedProductFail;
