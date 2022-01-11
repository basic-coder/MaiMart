import React, { useContext, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { userConstants } from "../../constants/userConstants";
import { useNavigate } from "react-router";
import Sidebar from "./Sidebar";
import { ThemeContext } from "../../context";

const UsersList = () => {
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()
    const {error,users} = useSelector(state => state.allUsers)
    const {error:deleteError,isDeleted, message} = useSelector(state => state.profile)

    const deleteUserHandler = (id) =>{
        dispatch(deleteUser(id))
    }
    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        if(deleteError){
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if(isDeleted){
            alert.success(message)
            navigate('/admin/users');
            dispatch({type: userConstants.DELETE_USER_RESET})
        }

        dispatch(getAllUsers())
   }, [dispatch,error,alert,deleteError,navigate,isDeleted,message])
    const columns = [
        {
            field:"id",
            headerName: "USER ID",
            minWidth: 200,
            flex: 0.5,
            cellClassName: () =>{
                return darkMode
                ? "whiteColor" : "greyColor"
            }
        },
        {
            field: "email",
            headerName: "Email",
            minWidth: 300,
            flex: 0.7,
            cellClassName: () =>{
                return darkMode
                ? "whiteColor" : "greyColor"
            }
          },
        {
            field:"name",
            headerName: "Name",
            minWidth: 250,
            flex: 0.5,
            cellClassName: () =>{
                return darkMode
                ? "whiteColor" : "greyColor"
            }
        },
        {
            field:"role",
            headerName: "Role",
            minWidth: 150,
            flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "role") === "admin"
                  ? "greenColor"
                  : "redColor";
              },
        },
        {
            field:"actions",
            headerName: "Actions",
            type: "number",
            minWidth: 150,
            flex: 0.3,
            sortable: false,
            renderCell: (params) =>{
                return (
                    <>
                    <Link to={`/admin/user/${params.getValue(params.id,"id")}`}><EditIcon style={{ color: darkMode && "var(--color-text)"}}/></Link>
        <Button onClick={()=>deleteUserHandler(params.getValue(params.id,"id"))}><DeleteIcon style={{ color: darkMode && "var(--color-text)"}} /></Button>
                    </>
                )
            }
        }
    ]

    const rows = []

    users && users.forEach(item => {
        rows.push({
            id: item._id,
            email: item.email,
            name: item.name,
            role: item.role,
        })
    })
    return (
        <>
            <MetaData title={"ALL USERS - ADMIN"} />
        <div className="dashboard">
            <Sidebar />
            <div className="productListContainer" style={{backgroundColor: darkMode ? "var(--color-bg)" : "#fff"}}>
            <div className="productHeading"  style={{ color: darkMode && "#fff"}}>All Users</div>
            <DataGrid rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick 
            className="productListTable"
            style={{backgroundColor: darkMode ? "var(--color-bg)" : "#fff"}}
            autoHeight/>
          </div>
        </div> 
        </>
    )
}

export default UsersList
