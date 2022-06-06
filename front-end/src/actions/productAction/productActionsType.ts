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
      totalPages: number;
   };
}

export interface ListProductsFail {
   type: typeof actionTypes.PRODUCT_LIST_FAIL;
   payload: string;
}

export type ListProductsDispatchType = ListProductsRequest | ListProductsSuccess | ListProductsFail;

export interface ProductDetailsRequest {
   type: typeof actionTypes.PRODUCT_DETAILS_REQUEST;
}

export interface ProductDetailsSuccess {
   type: typeof actionTypes.PRODUCT_DETAILS_SUCCESS;
   payload: IProduct;
}

export interface ProductDetailsFail {
   type: typeof actionTypes.PRODUCT_DETAILS_FAIL;
   payload: string;
}

export type ProductDetailsDispatchType =
   | ProductDetailsRequest
   | ProductDetailsSuccess
   | ProductDetailsFail;

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

export interface DeleteProductReset {
   type: typeof actionTypes.PRODUCT_DELETE_RESET;
}

export type DeleteProductDispatchType =
   | DeleteProductRequest
   | DeleteProductSuccess
   | DeleteProductFail
   | DeleteProductReset;

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

export interface CreateProductReset {
   type: typeof actionTypes.PRODUCT_CREATE_RESET;
}

export type CreateProductDispatchType =
   | CreateProductRequest
   | CreateProductSuccess
   | CreateProductFail
   | CreateProductReset;

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

export interface UpdateProductReset {
   type: typeof actionTypes.PRODUCT_UPDATE_RESET;
}

export type UpdateProductDispatchType =
   | UpdateProductRequest
   | UpdateProductSuccess
   | UpdateProductFail
   | UpdateProductReset;

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

export interface CreateProductReviewReset {
   type: typeof actionTypes.PRODUCT_CREATE_REVIEW_RESET;
}

export type CreateProductReviewDispatchType =
   | CreateProductReviewRequest
   | CreateProductReviewSuccess
   | CreateProductReviewFail
   | CreateProductReviewReset;

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
