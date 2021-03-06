import axios  from "axios";
import { userConstants } from "../constants/userConstants";

//login 
export const login = (email,password) =>async (dispatch) =>{
    try{
        dispatch({type:userConstants.LOGIN_REQUEST});
        const config = {headers: {"Content-type":"application/json"}};
        const {data} = await axios.post('/api/login',{email,password},config)
        //console.log(data);
        dispatch({
            type: userConstants.LOGIN_SUCCESS,
            payload: data.user,
        })
    }catch(error){
        dispatch({
        type: userConstants.LOGIN_FAIL,
        payload: error.response.data.message,
    })
    }
}

export const register = (userData) =>async (dispatch) =>{
    try{
        dispatch({type:userConstants.REGISTER_USER_REQUEST});
        const config = {headers: {"Content-type":"multipart/form-data"}};
        const {data} = await axios.post('/api/register',userData,config)
        //console.log(data);
        dispatch({
            type: userConstants.REGISTER_USER_SUCCESS,
            payload: data.user,
        })
    }catch(error){
        dispatch({
        type: userConstants.REGISTER_USER_FAIL,
        payload: error.response.data.message,
    })
    }
}

//load user
export const loadUser = () =>async (dispatch) =>{
    try{
        dispatch({type:userConstants.LOAD_USER_REQUEST})
        const {data} = await axios.get('/api/me')
        //console.log(data);
        dispatch({
            type: userConstants.LOAD_USER_SUCCESS,
            payload: data.user,
        })
    }catch(error){
        dispatch({
        type: userConstants.LOAD_USER_FAIL,
        payload: error.response.data.message,
    })
    }
}

//logout 
export const logout = () => async(dispatch) =>{
    try {
        await axios.get('/api/logout')
        localStorage.clear();
        dispatch({type: userConstants.LOGOUT_SUCCESS})
    } catch (error) {
        dispatch({type: userConstants.LOGOUT_FAIL,payload: error.response.data.message})
    }  
}

export const getAllUsers = () => async(dispatch) =>{
    try {
        dispatch({
            type: userConstants.ALL_USER_REQUEST
        })
        const {data} = await axios.get('/api/admin/users')
        dispatch({
            type: userConstants.ALL_USER_SUCCESS,
            payload: data.users
        })
    } catch (error) {
        dispatch({type: userConstants.ALL_USER_FAIL,payload: error.response.data.message})
    }
}

export const getUserDetails = (id) => async(dispatch) =>{
    try {
        dispatch({
            type: userConstants.USER_DETAILS_REQUEST
        })
        const {data} = await axios.get(`/api/admin/user/${id}`)
        dispatch({
            type: userConstants.USER_DETAILS_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: userConstants.USER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

//profile update
export const updateProfile = (userData) =>async (dispatch) =>{
    try{
        dispatch({type:userConstants.UPDATE_PROFILE_REQUEST});
        const config = {headers: {"Content-type":"multipart/form-data"}};
        const {data} = await axios.put('/api/me/update',userData,config)
        //console.log(data);
        dispatch({
            type: userConstants.UPDATE_PROFILE_SUCCESS,
            payload: data.success,
        })
    }catch(error){
        dispatch({
        type: userConstants.UPDATE_PROFILE_FAIL,
        payload: error.response.data.message,
    })
    }
}

export const updateUser = (id,userData) =>async (dispatch) =>{
    try{
        dispatch({type:userConstants.UPDATE_USER_REQUEST});
        const config = {headers: {"Content-type":"application/json"}};
        const {data} = await axios.put(`/api/admin/user/${id}`,userData,config)
        //console.log(data);
        dispatch({
            type: userConstants.UPDATE_USER_SUCCESS,
            payload: data.success,
        })
    }catch(error){
        dispatch({
        type: userConstants.UPDATE_USER_FAIL,
        payload: error.response.data.message,
    })
    }
}

export const deleteUser = (id) =>async (dispatch) =>{
    try{
        dispatch({type:userConstants.DELETE_USER_REQUEST});
        const {data} = await axios.delete(`/api/admin/user/${id}`)
        //console.log(data);
        dispatch({
            type: userConstants.DELETE_USER_SUCCESS,
            payload: data,
        })
    }catch(error){
        dispatch({
        type: userConstants.DELETE_USER_FAIL,
        payload: error.response.data.message,
    })
    }
}

//password update
export const updatePassword = (passwords) =>async (dispatch) =>{
    try{
        dispatch({type:userConstants.UPDATE_PASSWORD_REQUEST});
        const config = {headers: {"Content-type":"application/json"}};
        const {data} = await axios.put('/api/password/update',passwords,config)
        //console.log(data);
        dispatch({
            type: userConstants.UPDATE_PASSWORD_SUCCESS,
            payload: data.success,
        })
    }catch(error){
        dispatch({
        type: userConstants.UPDATE_PASSWORD_FAIL,
        payload: error.response.data.message,
    })
    }
}

//forgot password 
export const forgotPassword = (email) =>async (dispatch) =>{
    try{
        dispatch({type:userConstants.FORGOT_PASSWORD_REQUEST});
        const config = {headers: {"Content-type":"application/json"}};
        const {data} = await axios.post('/api/password/forgot',email,config)
        //console.log(data);
        dispatch({
            type: userConstants.FORGOT_PASSWORD_SUCCESS,
            payload: data.message,
        })
    }catch(error){
        dispatch({
        type: userConstants.FORGOT_PASSWORD_FAIL,
        payload: error.response.data.message,
    })
    }
}

//reset password 
export const resetPassword = (token,passwords) =>async (dispatch) =>{
    try{
        dispatch({type:userConstants.RESET_PASSWORD_REQUEST});
        const config = {headers: {"Content-type":"application/json"}};
        const {data} = await axios.put(`/api/password/reset/${token}`,passwords,config)
        //console.log(data);
        dispatch({
            type: userConstants.RESET_PASSWORD_SUCCESS,
            payload: data.success,
        })
    }catch(error){
        dispatch({
        type: userConstants.RESET_PASSWORD_FAIL,
        payload: error.response.data.message,
    })
    }
}

//Clearing Errors
export const clearErrors = () => async (dispatch) =>{
    dispatch({
        type: userConstants.CLEAR_ERRORS,
    })
}