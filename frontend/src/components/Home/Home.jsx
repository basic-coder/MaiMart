import React, {useContext, useEffect} from 'react'
import './home.css'
import {CgMouse} from 'react-icons/all'
import MetaData from '../layout/MetaData'
import {clearErrors, getProduct} from '../../actions/productAction';
import {useSelector,useDispatch} from 'react-redux'
import Loader from '../layout/Loader/Loader'
import { useAlert } from 'react-alert'
import ProductCard from './ProductCard'
import SearchBox from '../layout/SearchBox/SearchBox';
import { ThemeContext } from '../../context';

// const product ={
//     name: "Blue",
//     images: [{ url: "https://cdn.pixabay.com/photo/2013/07/13/12/34/handbag-159884_960_720.png"}],
//     price: "3000",
//     _id: "hello",
// }

const Home = () => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const allproducts = useSelector(state=>state.products)
    const {loading,error,products} = allproducts
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode
    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
       }
        dispatch(getProduct())
    }, [dispatch,error,alert])
    return (
        <>
        {loading ? <Loader />:(
            <>
        <MetaData title="MaiMart"/>
        
        <div className="banner" style={{backgroundColor: darkMode ? "var(--color-footer)" : "#fff" , color: darkMode && "#fff"}}>
        <SearchBox style={{zIndex: 30}} />
            <p>Welcome to Mai Mart</p>
            <h1>Everthing is here</h1>
            <a href="#container" >
                <button>
                    Scroll <CgMouse />
                </button>
            </a>
        </div>
        <h2 className="homeHeading" style={{backgroundColor: darkMode ? "var(--color-footer)" : "#fff" , color: darkMode && "#fff"}}>Featured Products</h2>

        <div className="container" id="container" style={{backgroundColor: darkMode ? "var(--color-bg)" : "#fff" }}>
        {products && products.map(product => <ProductCard key={product._id} product={product} />)}
        </div> 
        </> 
        )}      
        </>
    )
}

export default Home
