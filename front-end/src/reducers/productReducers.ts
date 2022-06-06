import {
   CreateProductDispatchType,
   CreateProductReviewDispatchType,
   DeleteProductDispatchType,
   ListProductsDispatchType,
   ListTopRatedProductDispatchType,
   ProductDetailsDispatchType,
   UpdateProductDispatchType,
} from "actions/productAction/productActionsType";
import { IProduct } from "types";
import * as actionTypes from "../actionTypes";
import {
   IProductCreateReviewState,
   IProductCreateState,
   IProductDeleteState,
   IProductDetailsState,
   IProductListState,
   IProductUpdateState,
   ITopRatedProductState,
} from "./types";

const productDefaultState: IProduct = {
   price: 0,
   countInStock: 0,
   rating: 0,
   numReviews: 0,
   name: "",
   image: "",
   description: "",
   brand: "",
   category: "",
   user: "",
   review: [],
};

const prodcutListReducer = (
   state: IProductListState = { products: [] },
   action: ListProductsDispatchType
) => {
   switch (action.type) {
      case actionTypes.PRODUCT_LIST_REQUEST:
         return { loading: true, products: [] };
      case actionTypes.PRODUCT_LIST_SUCCESS:
         return {
            loading: false,
            products: action.payload.products,
            page: action.payload.page,
            totalPages: action.payload.totalPages,
         };
      case actionTypes.PRODUCT_LIST_FAIL:
         return { loading: false, error: action.payload };
      default:
         return state;
   }
};

const productDetailsReducer = (
   state: IProductDetailsState = { product: productDefaultState },
   action: ProductDetailsDispatchType
) => {
   switch (action.type) {
      case actionTypes.PRODUCT_DETAILS_REQUEST:
         return { loading: true, ...state };
      case actionTypes.PRODUCT_DETAILS_SUCCESS:
         return { loading: false, product: action.payload };
      case actionTypes.PRODUCT_DETAILS_FAIL:
         return { loading: false, error: action.payload };
      default:
         return state;
   }
};

const productDeleteReducer = (
   state: IProductDeleteState = {},
   action: DeleteProductDispatchType
) => {
   switch (action.type) {
      case actionTypes.PRODUCT_DELETE_REQUEST:
         return { loading: true };
      case actionTypes.PRODUCT_DELETE_SUCCESS:
         return { loading: false, success: true };
      case actionTypes.PRODUCT_DELETE_FAIL:
         return { loading: false, error: action.payload };
      case actionTypes.PRODUCT_DELETE_RESET:
         return {};
      default:
         return state;
   }
};

const productCreateReducer = (
   state: IProductCreateState = {},
   action: CreateProductDispatchType
) => {
   switch (action.type) {
      case actionTypes.PRODUCT_CREATE_REQUEST:
         return { loading: true };
      case actionTypes.PRODUCT_CREATE_SUCCESS:
         return { loading: false, success: true, product: action.payload };
      case actionTypes.PRODUCT_CREATE_FAIL:
         return { loading: false, error: action.payload };
      case actionTypes.PRODUCT_CREATE_RESET:
         return {};
      default:
         return state;
   }
};

const productUpdateReducer = (
   state: IProductUpdateState = { product: productDefaultState },
   action: UpdateProductDispatchType
) => {
   switch (action.type) {
      case actionTypes.PRODUCT_UPDATE_REQUEST:
         return { loading: true };
      case actionTypes.PRODUCT_UPDATE_SUCCESS:
         return { loading: false, success: true, product: action.payload };
      case actionTypes.PRODUCT_UPDATE_FAIL:
         return { loading: false, error: action.payload };
      case actionTypes.PRODUCT_UPDATE_RESET:
         return { product: {} };
      default:
         return state;
   }
};

const productCreateReviewReducer = (
   state: IProductCreateReviewState = {},
   action: CreateProductReviewDispatchType
) => {
   switch (action.type) {
      case actionTypes.PRODUCT_CREATE_REVIEW_REQUEST:
         return { loading: true };
      case actionTypes.PRODUCT_CREATE_REVIEW_SUCCESS:
         return { loading: false, success: true };
      case actionTypes.PRODUCT_CREATE_REVIEW_FAIL:
         return { loading: false, error: action.payload };
      case actionTypes.PRODUCT_CREATE_REVIEW_RESET:
         return {};
      default:
         return state;
   }
};

const topRatedProductsReducer = (
   state: ITopRatedProductState = { products: [] },
   action: ListTopRatedProductDispatchType
) => {
   switch (action.type) {
      case actionTypes.PRODUCT_TOP_RATED_REQUEST:
         return { loading: true, products: [] };
      case actionTypes.PRODUCT_TOP_RATED_SUCCESS:
         return { loading: false, products: action.payload };
      case actionTypes.PRODUCT_TOP_RATED_FAIL:
         return { loading: false, error: action.payload };
      default:
         return state;
   }
};

export {
   prodcutListReducer,
   productDetailsReducer,
   productDeleteReducer,
   productCreateReducer,
   productUpdateReducer,
   productCreateReviewReducer,
   topRatedProductsReducer,
};
