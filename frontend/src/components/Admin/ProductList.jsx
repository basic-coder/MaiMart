import React, { useContext, useEffect } from 'react'
import {DataGrid} from '@material-ui/data-grid'
import './productList.css'
import {useSelector,useDispatch} from 'react-redux'
import {getAdminProduct,clearErrors,deleteProduct} from '../../actions/productAction' 
import {Link} from 'react-router-dom'
import {useAlert} from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../layout/MetaData'
import EditIcon from '@material-ui/icons/Edit'
import Sidebar from './Sidebar'
import DeleteIcon from '@material-ui/icons/Delete'
import {useNavigate} from 'react-router'
import {productConstants} from '../../constants/productConstants'
import { ThemeContext } from '../../context'

const ProductList = () => {
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()
    const {error,products} = useSelector(state => state.products)
    const {error:deleteError,isDeleted} = useSelector(state => state.product)

    const deleteProductHandler = (id) =>{
        dispatch(deleteProduct(id))
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
            alert.success("Product deleted sucessfully")
            navigate('/admin/products');
            dispatch({type: productConstants.DELETE_PRODUCT_RESET})
        }

        dispatch(getAdminProduct())
   }, [dispatch,error,alert,deleteError,navigate,isDeleted])
    const columns = [
        {
            field:"id",
            headerName: "Product ID",
            minWidth: 200,
            flex: 0.5,
            cellClassName: () =>{
                return darkMode
                ? "whiteColor" : "greyColor"
            }
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 300,
            flex: 0.7,
            cellClassName: () =>{
                return darkMode
                ? "whiteColor" : "greyColor"
            }
          },
        {
            field:"stock",
            headerName: "Stock",
            type: "number",
            minWidth: 150,
            flex: 0.3,
            cellClassName: () =>{
                return darkMode
                ? "whiteColor" : "greyColor"
            }
        },
        {
            field:"price",
            headerName: "Price",
            type: "number",
            minWidth: 240,
            flex: 0.5,
            cellClassName: () =>{
                return darkMode
                ? "whiteColor" : "greyColor"
            }
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
                    <Link to={`/admin/product/${params.getValue(params.id,"id")}`}><EditIcon style={{ color: darkMode && "#fff"}} /></Link>
        <Button onClick={()=>deleteProductHandler(params.getValue(params.id,"id"))}><DeleteIcon style={{ color: darkMode && "#fff"}}/></Button>
                    </>
                )
            }
        }
    ]

    const rows = []

    products && products.forEach(item => {
        rows.push({
            id: item._id,
            stock: item.Stock,
            price: item.price,
            name: item.name,
        })
    })
    return (
        <>
        <MetaData title={"ALL PRODUCTS - ADMIN"} />
        <div className="dashboard" style={{backgroundColor: darkMode ? "var(--color-bg)" : "#fff"}}>
            <Sidebar />
            <div className="productListContainer" style={{backgroundColor: darkMode ? "var(--color-bg)" : "#fff"}}>
            <div className="productHeading" style={{ color: darkMode && "#fff"}}>All Products</div>
            <DataGrid rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick 
            className="productListTable"
            autoHeight style={{backgroundColor: darkMode ? "var(--color-bg)" : "#fff" }}/>
            </div>
        </div>
        
        </>
    )
}

export default ProductList
