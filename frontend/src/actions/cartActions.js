import axios from 'axios';
import { cartConstants } from '../constants/cartConstants';

//add to cart
export const addItemsToCart = (id,quantity) =>async (dispatch,getState) =>{

    const {data} = await axios.get(`/api/product/${id}`)
    //console.log(data);
    dispatch({
        type: cartConstants.ADD_TO_CART,
        payload : {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
        }
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

//remove from cart
export const removeItemsFromCart = (id) =>async (dispatch,getState) =>{
    dispatch({
        type: cartConstants.REMOVE_CART_ITEM,
        payload: id,
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

//remove from cart
export const saveShippingInfo = (data) =>async (dispatch) =>{
    dispatch({
        type: cartConstants.SAVE_SHOPPING_INFO,
        payload: data,
    })

    localStorage.setItem("shippingInfo", JSON.stringify(data));
}