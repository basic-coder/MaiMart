import React, { useContext, useEffect } from "react";
import "./dashboard.css";
import Sidebar from "./Sidebar";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getAdminProduct } from "../../actions/productAction";
import {getAllOrders} from '../../actions/orderAction'
import { getAllUsers } from "../../actions/userAction";
import {ThemeContext} from '../../context'

Chart.register(
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip,
  Filler,
);

const Dashboard = () => {
  const theme = useContext(ThemeContext)
const darkMode = theme.state.darkMode
  const {error,products} = useSelector(state => state.products)
  const {orders} = useSelector(state => state.allOrders)
  const {users} = useSelector(state => state.allUsers)
  const dispatch = useDispatch()
  let outOfStock = 0;
  products &&
  products.forEach((item)=>{
    if(item.Stock===0){
      outOfStock +=1
    }
  })

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });
  useEffect(() => {
    if(error){
        alert.error(error)
        dispatch(clearErrors())
    }
    
    dispatch(getAdminProduct())
    dispatch(getAllOrders())
    dispatch(getAllUsers())
}, [dispatch,error])
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
        color : ["white"]
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [ outOfStock, products.length - outOfStock],
      },
    ],
  };
  return (
    <>
      <div className="dashboard" >
        <Sidebar />
        <div className="dashboardContainer" style={{backgroundColor: darkMode ? "var(--color-bg)" : "#fff"}}>
          <Typography component="h1" style={{ color: darkMode && "var(--color-text)"}}>Dashboard</Typography>
          <div className="dashboardSummary" >
            <div style={{backgroundColor: darkMode ? "var(--color-bg)" : "#fff"}}>
              <p style={{ color: darkMode && "#fff"}}>
                Total Amount <br /> ₹{totalAmount}
              </p>
            </div>
            <div className="dashboardSummaryBox2" style={{backgroundColor: darkMode ? "var(--color-bg)" : "#fff"}}>
              <Link to="/admin/products">
                <p>Products</p>
                <p>{products && products.length}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>{orders && orders.length}</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>{users && users.length}</p>
              </Link>
            </div>
          </div>

          <div className="linechart">
            <Line data={lineState} />
          </div>
          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
