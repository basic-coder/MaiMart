import { Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import "./confirmOrder.css";
import { useNavigate } from "react-router";
import { ThemeContext } from "../../context";

const ConfirmOrder = () => {
  const theme = useContext(ThemeContext)
const darkMode = theme.state.darkMode
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user);
  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,0
  );
  const shippingCharges = subTotal > 1000 ? 0 : 200;
  const tax = subTotal * 0.18;
  const totalPrice = subTotal + tax + shippingCharges;
  const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pinCode},${shippingInfo.country}`;

  const proceedToPayment = () =>{
    const data={
      subTotal,
      shippingCharges,
      tax,
      totalPrice
    }

    sessionStorage.setItem("orderInfo",JSON.stringify(data));
    navigate('/process/payment');
  }
  return (
    <>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage" style={{backgroundColor: darkMode ? "var(--color-bg)" : "#fff"}} >
        <div>
          <div className="confirmShippingArea">
            <Typography> Shipping Info </Typography>
            <div className="confirmShippingAreaBox" >
              <div>
                <p  style={{ color: darkMode && "var(--color-text)"}}>Name : </p>
                <span  style={{ color: darkMode && "var(--color-text)"}}>{user.name}</span>
              </div>
              <div>
                <p  style={{ color: darkMode && "var(--color-text)"}}>Phone : </p>
                <span style={{ color: darkMode && "var(--color-text)"}}>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p  style={{ color: darkMode && "var(--color-text)"}}>Address : </p>
                <span  style={{ color: darkMode && "var(--color-text)"}}>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product} >
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}style={{ color: darkMode && "var(--color-text)"}}>
                      {item.name}
                    </Link>{" "}
                    <span style={{ color: darkMode && "var(--color-text)"}}>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>
                        ₹{item.price * item.quantity}
                      </b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>SubTotal</p>
                <span  style={{ color: darkMode && "#fff"}} >{subTotal}</span>
              </div>
              <div>
                <p>Shipping Charges</p>
                <span  style={{ color: darkMode && "#fff"}}>{shippingCharges}</span>
              </div>
              <div>
                <p>GST</p>
                <span  style={{ color: darkMode && "#fff"}}>{tax}</span>
              </div>
            </div>
            <div className="orderSummaryTotal">
              <p>
                <b>Total</b>
              </p>
              <span  style={{ color: darkMode && "#fff"}}>₹{totalPrice}</span>
            </div>
            <button onClick={proceedToPayment}>Proceed To payment </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
