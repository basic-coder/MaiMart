import React, { useEffect, useState,useContext } from 'react'
import {clearErrors, getProduct} from '../../actions/productAction';
import {useSelector,useDispatch} from 'react-redux'
import './product.css'
import Loader from '../layout/Loader/Loader'
import { useAlert } from 'react-alert'
import ProductCard from '../Home/ProductCard';
import { useParams } from 'react-router';
import Pagination from 'react-js-pagination'
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography' 
import MetaData from '../layout/MetaData'
import {ThemeContext} from '../../context'
const categories =[
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
    "Watches"
] 

const Products = () => {
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode
    const dispatch = useDispatch()
    const params = useParams()
    const alert = useAlert()
    const keyword = params.keyword
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0,25000])
    const [category, setCategory] = useState()
    const [ratings, setRatings] = useState(0)


    const {products, loading,error,productsCount,resultPerPage} = useSelector(state => state.products)
    const setCurrentPageNo = (e) =>{
        setCurrentPage(e)
    }
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
        dispatch(getProduct(keyword,currentPage,price,category,ratings));
    },[dispatch,keyword,currentPage,price,category,ratings,error,alert])

    const priceHandler = (event, newPrice) =>{
        setPrice(newPrice)
    }
    
    
    return (
        <>
          {loading ? <Loader /> : 
          <>
          <MetaData title="PRODUCTS--MAIMART" />
          <div className="product">
          <h2 className="productHeading" style={{color: darkMode && "var(--color-text)" ,borderBottom: darkMode && "1px solid #fff"}}>Products</h2>
          <div className="products">
          {products && products.map(product => <ProductCard key={product._id} product={product} />)}
          </div>

            <div className="filterBox">
                
                <Typography>Price</Typography>
                <Slider 
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0} max={25000} />
                <Typography>Categories</Typography>
                <ul className="categoryBox">
                    {categories.map((category)=>(
                        <li className="category-link"  key={category} onClick ={()=> setCategory(category)} >
                            <p style={{color: darkMode && "var(--color-text)"}}>{category}</p>
                        </li>
                    ))}
                </ul>
                <fieldset>
                <Typography component="legend"> Ratings above</Typography>
                <Slider value={ratings} onChange={(e,newRatings)=>{
                    setRatings(newRatings)
                }} aria-labelledby="continuous-slider" valueLabelDisplay="auto" min={0} max={5}>

                </Slider>
            </fieldset>
            </div>

            

          { resultPerPage < productsCount && (
          <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="first"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
          </div>
          
    )} </div>

          </>}  
        </>
    )
}

export default Products
