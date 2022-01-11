import { productConstants } from "../constants/productConstants";

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    //get all product
    case productConstants.ADMIN_PRODUCT_REQUEST:
    case productConstants.ALL_PRODUCT_REQUEST:
      return { loading: true, products: [] };
    case productConstants.ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resultPerPage: action.payload.resultPerPage,
      };
    case productConstants.ADMIN_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case productConstants.ADMIN_PRODUCT_FAIL:
    case productConstants.ALL_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case productConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    //get all product details
    case productConstants.PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case productConstants.PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case productConstants.PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case productConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    //get all product
    case productConstants.NEW_REVIEW_REQUEST:
      return { ...state, loading: true };
    case productConstants.NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case productConstants.NEW_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case productConstants.NEW_REVIEW_RESET:
      return {
        ...state,
        loading: false,
        success: false,
      };
    case productConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    //get all product details
    case productConstants.NEW_PRODUCT_REQUEST:
      return { loading: true, ...state };
    case productConstants.NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };
    case productConstants.NEW_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case productConstants.NEW_PRODUCT_RESET:
      return {
        ...state,
        loading: false,
        success: false,
      };
    case productConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const productReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    //get all product details
    case productConstants.UPDATE_PRODUCT_REQUEST:
    case productConstants.DELETE_PRODUCT_REQUEST:
      return { loading: true, ...state };

    case productConstants.DELETE_PRODUCT_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };
    case productConstants.UPDATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
      };
    case productConstants.UPDATE_PRODUCT_FAIL:
    case productConstants.DELETE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case productConstants.DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case productConstants.UPDATE_PRODUCT_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case productConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const productReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    //get all product details
    case productConstants.ALL_REVIEW_REQUEST:
      return { loading: true, ...state };
    case productConstants.ALL_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };
    case productConstants.ALL_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case productConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case productConstants.DELETE_REVIEW_REQUEST:
      return {  ...state,loading: true, };

    case productConstants.DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case productConstants.DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case productConstants.DELETE_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case productConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
