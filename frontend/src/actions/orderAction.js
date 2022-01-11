import axios from "axios";
import { orderConstants } from "../constants/orderConstants"

export const createOrder = (order) => async(dispatch, getState) =>{
    try {
        dispatch({type:orderConstants.CREATE_ORDER_REQUEST});
        const config = {headers: {"Content-type":"application/json"}};
        const {data} = await axios.post('/api/order/new',order,config)
        //console.log(data);
        dispatch({
            type: orderConstants.CREATE_ORDER_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
        type: orderConstants.CREATE_ORDER_FAIL,
        payload: error.response.data.message
    })
    }
}

export const myOrders = () => async(dispatch) =>{
    try {
        dispatch({type:orderConstants.MY_ORDERS_REQUEST});
        const {data} = await axios.get('/api/orders/me')
        //console.log(data);
        dispatch({
            type: orderConstants.MY_ORDERS_SUCCESS,
            payload: data.orders,
        })
    } catch (error) {
        dispatch({
        type: orderConstants.MY_ORDERS_FAIL,
        payload: error.response.data.message
    })
    }
}

export const getAllOrders = () => async(dispatch) =>{
    try {
        dispatch({type:orderConstants.ALL_ORDERS_REQUEST});
        const {data} = await axios.get('/api/admin/orders')
        //console.log(data);
        dispatch({
            type: orderConstants.ALL_ORDERS_SUCCESS,
            payload: data.orders,
        })
    } catch (error) {
        dispatch({
        type: orderConstants.ALL_ORDERS_FAIL,
        payload: error.response.data.message
    })
    }
}
export const updateOrder = (id,order) => async(dispatch) =>{
    try {
        dispatch({type:orderConstants.UPDATE_ORDER_REQUEST});
        console.log(order);
        const config = {headers: {"Content-type":"application/json"}};
        const {data} = await axios.put(`/api/admin/order/${id}`,order,config)
        
        dispatch({
            type: orderConstants.UPDATE_ORDER_SUCCESS,
            payload: data.success,
        })
    } catch (error) {
        dispatch({
        type: orderConstants.UPDATE_ORDER_FAIL,
        payload: error.response.data.message
    })
    }
}
export const deleteOrder = (id) => async(dispatch) =>{
    try {
        dispatch({type:orderConstants.DELETE_ORDER_REQUEST});
        
        const {data} = await axios.delete(`/api/admin/order/${id}`)
        
        dispatch({
            type: orderConstants.DELETE_ORDER_SUCCESS,
            payload: data.success,
        })
    } catch (error) {
        dispatch({
        type: orderConstants.DELETE_ORDER_FAIL,
        payload: error.response.data.message
    })
    }
}
export const getOrderDetails = (id) => async(dispatch) =>{
    try {
        dispatch({type:orderConstants.ORDER_DETAILS_REQUEST});
        const {data} = await axios.get(`/api/myorder/${id}`)
        dispatch({
            type: orderConstants.ORDER_DETAILS_SUCCESS,
            payload: data.order,
        })
    } catch (error) {
        dispatch({
        type: orderConstants.ORDER_DETAILS_FAIL,
        payload: error.response.data.message
    })
    }
}

//Clearing Errors
export const clearErrors = () => async (dispatch) =>{
    dispatch({
        type: orderConstants.CLEAR_ERRORS,
    })
}