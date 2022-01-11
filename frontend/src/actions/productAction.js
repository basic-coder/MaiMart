import axios from 'axios';
import { productConstants } from '../constants/productConstants';

//get all products
export const getProduct = (keyword="",currentPage=1,price=[0,25000],category,ratings=0) =>async (dispatch) =>{
    try{
        dispatch({type:productConstants.ALL_PRODUCT_REQUEST});
        let link = `/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
        if (category) {
            link = `/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
          }
        const {data} = await axios.get(link)

        
    
        dispatch({
            type: productConstants.ALL_PRODUCT_SUCCESS,
            payload: data,
        })
    }catch(error){
        dispatch({
        type: productConstants.ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
    })
    }
}

//get all products
export const getAdminProduct = () =>async (dispatch) =>{
    try{
        dispatch({type:productConstants.ADMIN_PRODUCT_REQUEST});
        const {data} = await axios.get('/api/admin/products')
    
        dispatch({
            type: productConstants.ADMIN_PRODUCT_SUCCESS,
            payload: data.products,
        })
    }catch(error){
        dispatch({
        type: productConstants.ADMIN_PRODUCT_FAIL,
        payload: error.response.data.message,
    })
    }
}

//get product details
export const getProductDetails = (id) => async (dispatch) =>{
    try{
        dispatch({type:productConstants.PRODUCT_DETAILS_REQUEST});
        const {data} = await axios.get(`/api/product/${id}`)
        dispatch({
            type: productConstants.PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        })
    }catch(error){
        dispatch({
        type: productConstants.PRODUCT_DETAILS_FAIL,
        payload: error.response.data.message,
    })
    }
}

export const newReview = (reviewData) => async (dispatch) =>{
    try{
        dispatch({type:productConstants.NEW_REVIEW_REQUEST});
        const config = {headers: {"Content-type":"application/json"}};
        const {data} = await axios.put(`/api/review`,reviewData,config)
        dispatch({
            type: productConstants.NEW_REVIEW_SUCCESS,
            payload: data.success,
        })
    }catch(error){
        dispatch({
        type: productConstants.NEW_REVIEW_FAIL,
        payload: error.response.data.message,
    })
    }
}

//get all products
export const getAllReviews = (id) =>async (dispatch) =>{
    try{
        dispatch({type:productConstants.ALL_REVIEW_REQUEST});

        const {data} = await axios.get(`/api/reviews?id=${id}`)
    
        dispatch({
            type: productConstants.ALL_REVIEW_SUCCESS,
            payload: data.reviews,
        })
    }catch(error){
        dispatch({
        type: productConstants.ALL_REVIEW_FAIL,
        payload: error.response.data.message,
    })
    }
}

export const deleteReviews = (reviewId,productId) =>async (dispatch) =>{
    try{
        dispatch({type:productConstants.DELETE_REVIEW_REQUEST});

        const {data} = await axios.delete(`/api/reviews?id=${reviewId}&productId=${productId}`)
     
    
        dispatch({
            type: productConstants.DELETE_REVIEW_SUCCESS,
            payload: data.success,
        })
    }catch(error){
        dispatch({
        type: productConstants.DELETE_REVIEW_FAIL,
        payload: error.response.data.message,
    })
    }
}

//create product 
export const createProduct = (productData) => async (dispatch) =>{
    try{
        dispatch({type:productConstants.NEW_PRODUCT_REQUEST});
        const config = {headers: {"Content-type":"application/json"}};
        const {data} = await axios.post(`/api/admin/product/new`,productData,config)
        dispatch({
            type: productConstants.NEW_PRODUCT_SUCCESS,
            payload: data,
        })
    }catch(error){
        dispatch({
        type: productConstants.NEW_PRODUCT_FAIL,
        payload: error.response.data.message,
    })
    }
}

export const deleteProduct = (id) => async (dispatch) =>{
    try{
        dispatch({type:productConstants.DELETE_PRODUCT_REQUEST});
    
        const {data} = await axios.delete(`/api/admin/product/${id}`)
        dispatch({
            type: productConstants.DELETE_PRODUCT_SUCCESS,
            payload: data.success,
        })
    }catch(error){
        dispatch({
        type: productConstants.DELETE_PRODUCT_FAIL,
        payload: error.response.data.message,
    })
    }
}

export const updateProduct = (id,productData) => async (dispatch) =>{
    try{
        dispatch({type:productConstants.UPDATE_PRODUCT_REQUEST});
        const config = {headers: {"Content-type":"application/json"}};
        const {data} = await axios.put(`/api/admin/product/${id}`,productData,config)
        dispatch({
            type: productConstants.UPDATE_PRODUCT_SUCCESS,
            payload: data.success,
        })
    }catch(error){
        dispatch({
        type: productConstants.UPDATE_PRODUCT_FAIL,
        payload: error.response.data.message,
    })
    }
}

//Clearing Errors
export const clearErrors = () => async (dispatch) =>{
    dispatch({
        type: productConstants.CLEAR_ERRORS,
    })
}