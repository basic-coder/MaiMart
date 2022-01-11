import React, { useContext, useEffect } from 'react'
import './orderDetails.css'
import {useSelector, useDispatch} from 'react-redux'
import MetaData from '../layout/MetaData'
import {Link} from 'react-router-dom'
import {useAlert} from 'react-alert'
import {Typography} from '@material-ui/core'
import Loader from '../layout/Loader/Loader'
import { useParams } from 'react-router'
import {getOrderDetails, clearErrors} from '../../actions/orderAction'
import { ThemeContext } from '../../context'


const OrderDetails = () => {
  const theme = useContext(ThemeContext)
  const darkMode = theme.state.darkMode
    const {order, error, loading} = useSelector(state => state.orderDetails)
    const params = useParams()
    const dispatch = useDispatch()
    const alert = useAlert();
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
       
        dispatch(getOrderDetails(params.id))
    },[dispatch,alert,error,params])
    return (
        <>
        {loading ? <Loader /> : (
            <>
            <MetaData title="Order Details" />
            <div className="orderDetailsPage" style={{backgroundColor: darkMode ? "var(--color-bg)" : "#fff"}}>
            <div className="orderDetailsContainer">
              <Typography component="h1"  style={{ color: darkMode && "var(--color-text)"}}>
                Order #{order && order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox" >
                <div>
                  <p  style={{ color: darkMode && "var(--color-text)"}}>Name:</p>
                  <span  style={{ color: darkMode && "var(--color-text)"}}>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p  style={{ color: darkMode && "var(--color-text)"}}>Phone:</p>
                  <span  style={{ color: darkMode && "var(--color-text)"}}>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p  style={{ color: darkMode && "var(--color-text)"}}>Address:</p>
                  <span  style={{ color: darkMode && "var(--color-text)"}}>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p  style={{ color: darkMode && "var(--color-text)"}}>Amount:</p>
                  <span  style={{ color: darkMode && "var(--color-text)"}}>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}  style={{ color: darkMode && "var(--color-text)"}}>
                        {item.name}
                      </Link>{" "}
                      <span  style={{ color: darkMode && "var(--color-text)"}}>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
            </>
        )}

        </>
    )
}

export default OrderDetails
