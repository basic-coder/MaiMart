import React, { useContext, useEffect, useRef } from 'react'
import {CardNumberElement ,CardExpiryElement, useStripe,CardCvcElement} from '@stripe/react-stripe-js'
import CheckoutSteps from './CheckoutSteps'
import { useAlert } from 'react-alert'
import { Typography } from '@material-ui/core'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import './payment.css'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import EventIcon from '@material-ui/icons/Event'
import {useNavigate} from 'react-router'
import {useElements} from '@stripe/react-stripe-js'
import { clearErrors, createOrder } from '../../actions/orderAction'
import { ThemeContext } from '../../context'

const Payment = () => {
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
     const {shippingInfo,cartItems} = useSelector(state => state.cart);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert()
    const stripe = useStripe()
    const elements = useElements()
    const payBtn = useRef(null);
    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
      };
   
    const {user} = useSelector(state => state.user)
    const {error} = useSelector(state => state.newOrder)
    
    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    }

    const submitHandler= async (e) =>{
        e.preventDefault()
        
        payBtn.current.disabled = true

        try {
            const config = {headers: {"Content-type":"application/json"}};
            
            const {data} = await axios.post('/api/payment/process',paymentData,config)
            const client_secret = data.client_secret;

            if(!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details:{
                        name: user.name,
                        email: user.email,
                        address:{
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country
                        }
                    }
                }
            })
            if(result.error){
                payBtn.current.disabled = false;
                alert.error(result.error.message)
            }else{
                if(result.paymentIntent.status === "succeeded"){
                    order.paymentInfo={
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }
                    dispatch(createOrder(order))
                    navigate('/success')
                }else{
                    alert.error("There is an error in processing")
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            alert.error(error.response.data.message)
        }
    }

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrors());
        }
    },[dispatch,alert,error])
    return (
        <>
        <MetaData title="Payment" />
        <CheckoutSteps activeStep={2} />
        <div className="paymentContainer" style={{backgroundColor: darkMode ? "var(--color-bg)" : "#fff"}}>
            <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                <Typography style={{ color: darkMode && "var(--color-text)"}}>Card Info</Typography>
            <div>
                <CreditCardIcon  style={{ color: darkMode && "var(--color-text)"}}/>
                <CardNumberElement className="paymentInput"  style={{ color: darkMode && "#fff !important"}} />
            </div>
            <div>
                <EventIcon  style={{ color: darkMode && "var(--color-text)"}}/>
                <CardExpiryElement className="paymentInput"  style={{ color: darkMode && "#fff !important"}} />
            </div>
            <div style={{ color: darkMode && "#fff !important"}}>
                <VpnKeyIcon  style={{ color: darkMode && "#fff"}}/>
                <CardCvcElement className="paymentInput"  />
            </div>

            <input type="submit" value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`} ref={payBtn} className="paymentFormBtn" />

            </form>
        </div>
            
        </>
    )
}

export default Payment
