import './App.css';
import Header from './components/layout/Header/Header';
import {BrowserRouter as Router, Route, Routes,Navigate} from 'react-router-dom'
import WebFont from 'webfontloader'
import React, { useContext, useEffect, useState } from 'react'
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Products from './components/Product/Products';
import Search from './components/Product/Search';
import LoginSignup from './components/LoginSignup/LoginSignup';
import UserOptions from './components/layout/Header/UserOptions';
import { useSelector } from 'react-redux';
import store from "./store"
import { loadUser } from './actions/userAction';
import Profile from './components/User/Profile';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import axios from 'axios';
import Payment from './components/Cart/Payment';
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrders from './components/Order/MyOrders';
import OrderDetails from './components/Order/OrderDetails';
import Dashboard from './components/Admin/Dashboard';
//import ProtectedRoute from './components/Route/ProtectedRoute'
import ProductList from './components/Admin/ProductList';
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct';
import OrderList from './components/Admin/OrderList';
import ProcessOrder from './components/Admin/ProcessOrder';
import UsersList from './components/Admin/UsersList';
import UpdateUser from './components/Admin/UpdateUser';
import ProductReviews from './components/Admin/ProductReviews';
import NotFound from './components/layout/NotFound/NotFound';
import SearchBox from './components/layout/SearchBox/SearchBox';
import Contact from './components/Contact/Contact'
import { ThemeContext } from './context';
import About from './components/About/About';

function App() {
  const {isAuthenticated,user,loading} = useSelector((state) => state.user)
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey(){
    const {data} = await axios.get('/api/stripeapikey');
    setStripeApiKey(data.stripeApiKey)
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  const theme = useContext(ThemeContext)
const darkMode = theme.state.darkMode




  window.addEventListener("contextmenu", (e) => e.preventDefault());


  return (
    <div className ="dark" style={{ backgroundColor: darkMode ? "var(--color-bg)" : "#fff", color: darkMode && "#fff"}}>
    <Router>
      <Header  />
      <SearchBox style={{zIndex: 30}} />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} exact/>
        <Route path="/product/:id" element={<ProductDetails />} exact/>
        <Route path="/products" element={<Products />} exact/>
        <Route path="/products/:keyword" element={<Products />} exact/>
        <Route path="/search" element={<Search />} exact/>
        <Route exact path="/contact" element={<Contact/>}/>
        <Route exact path="/about" element={<About/>} />
        <Route path="/login" element={<LoginSignup />} exact/>
        <Route path="/password/forgot" element={<ForgotPassword />} exact/>
        <Route path="/password/reset/:token" element={<ResetPassword />} exact/>
        <Route path="/cart" element={<Cart />} exact/>
        {/* important */}
        {stripeApiKey && (
          <Route path="/process/payment" element={
          <Elements stripe={loadStripe(stripeApiKey)}>
          <Payment />
         </Elements> 
          } exact/>
          )}

        {loading===false && isAuthenticated === true ? (
          <>
          <Route path="/account" element={<Profile />} exact/>
          <Route path="/me/update" element={<UpdateProfile />} exact/>
          <Route path="/password/update" element={<UpdatePassword />} exact/>
          <Route path="/shipping" element={<Shipping />} exact/>
          <Route path="/order/confirm" element={<ConfirmOrder />} exact/>
          <Route path="/success" element={<OrderSuccess />} exact/>
          <Route path="/orders" element={<MyOrders />} exact/>
          <Route path="/myorder/:id" element={<OrderDetails />} exact/>
        

          {user.role === "admin" ? (
            <>
            <Route path="/admin/dashboard" element={<Dashboard />} exact/>
            <Route path="/admin/products" element={<ProductList />} exact/>
            <Route path="/admin/product" element={<NewProduct />} exact/>
            <Route path="/admin/product/:id" element={<UpdateProduct />} exact/>
            <Route path="/admin/orders" element={<OrderList />} exact/>
            <Route path="/admin/order/:id" element={<ProcessOrder />} exact/>
            <Route path="/admin/users" element={<UsersList />} exact/>
            <Route path="/admin/user/:id" element={<UpdateUser />} exact/>
            <Route path="/admin/reviews" element={<ProductReviews />} exact/>
            </>
          ):(
            <>
            <Route path="/admin/dashboard" element={<Navigate replace to="/login" />}   />
            <Route path="/admin/products" element={<Navigate to="/login" />} exact/>
            <Route path="/admin/product" element={<Navigate to="/login" />} exact/>
            <Route path="/admin/product/:id" element={<Navigate to="/login" />} exact/>
            <Route path="/admin/orders" element={<Navigate to="/login" />} exact/>
            <Route path="/admin/order/:id" element={<Navigate to="/login" />} exact/>
            <Route path="/admin/users" element={<Navigate to="/login" />} exact/>
            <Route path="/admin/user/:id" element={<Navigate to="/login" />} exact/>
            <Route path="/admin/reviews" element={<Navigate to="/login" />} exact/>
            </>
          )}
          </>
           ):(
             <>
            <Route path="/account" element={<Navigate replace to="/login" />} exact/>
          <Route path="/me/update" element={<Navigate replace to="/login" />} exact/>
          <Route path="/password/update" element={<Navigate replace to="/login" />} exact/>
          <Route path="/shipping" element={<Navigate replace to="/login" />} exact/>
          <Route path="/order/confirm" element={<Navigate replace to="/login" />} exact/>
          <Route path="/success" element={<Navigate replace to="/login" />} exact/>
          <Route path="/orders" element={<Navigate replace to="/login" />} exact/>
          <Route path="/myorder/:id" element={<Navigate replace to="/login" />} exact/>
          </>
           )}
          <Route element={<NotFound />} /> 
      </Routes>
      <Footer />
    </Router>
    </div>
  );
}

export default App;
