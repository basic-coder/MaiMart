import React, { useContext, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import './myOrders.css'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import LaunchIcon  from '@material-ui/icons/Launch'
import { useAlert } from 'react-alert'
import Loader from '../layout/Loader/Loader'
import { clearErrors,myOrders } from '../../actions/orderAction';
import { ThemeContext } from '../../context';


const MyOrders = () => {
    const theme = useContext(ThemeContext)
const darkMode = theme.state.darkMode
    const dispatch = useDispatch()
    const alert = useAlert()
    const {orders ,error,loading} = useSelector(state => state.myOrders)
    const {user} = useSelector(state =>state.user)

    const columns = [
        {field:"id", headerName: "Order ID", minWidth: 300,flex: 1,
        cellClassName: () =>{
            return darkMode
            ? "whiteColor" : "greyColor"
        }},
        {
            field: "status",
            headerName: "status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) =>{
                return params.getValue(params.id,"status") === "Delivered" 
                ? "greenColor" : "redColor"
            }
        },
        {
            field: "itemQty",
            headerName: "Item Qty",
            type: "number",
            minWidth: 150,
            flex: 0.3,
            cellClassName: () =>{
                return darkMode
                ? "whiteColor" : "greyColor"
            }
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 150,
            flex: 0.5,
            cellClassName: () =>{
                return darkMode
                ? "whiteColor" : "greyColor"
            }
        },
        {
            field:"action",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable : false,
            renderCell: (params) =>{
                return (
                    <Link to={`/myorder/${params.getValue(params.id,"id")}`}>
                        <LaunchIcon style={{ color: darkMode && "#fff"}}/>
                    </Link>
                )
            }
        }

    ];
    const rows = [];

    orders && orders.forEach((item,index) =>{
        rows.push({
            itemQty: item.orderItems.length,
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice
        })
    })

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrors());
        }
        dispatch(myOrders())
    },[dispatch,alert,error])
    return (
        <>
        <MetaData title={`${user.name} - Orders`} />
            {loading ? (<Loader /> ) : (
                <div className="myOrdersPage" style={{ backgroundColor: darkMode ? "var(--color-bg)" : "#fff", color: darkMode && "#fff"}}>
                    <DataGrid rows={rows} style={{ backgroundColor: darkMode ? "var(--color-bg)" : "#fff", color: darkMode && "#fff"}} columns={columns} pageSize={18} disabledSelectionOnClick 
                    className="myOrdersTable" autoHeight />
                    <Typography id="myOrdersHeading" style={{ backgroundColor: darkMode ? "var(--color-bg)" : "#fff", color: darkMode && "#fff"}}>{user.name} 's Orders</Typography>

                </div>
            )}
        </>
    )
}

export default MyOrders
