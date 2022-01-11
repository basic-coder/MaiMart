import React, { useContext, useEffect, useState } from 'react'
import './productDetails.css'
import Carousel from 'react-material-ui-carousel'
import { useSelector,useDispatch } from 'react-redux'
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction'
import { useParams } from 'react-router'
import Loader from '../layout/Loader/Loader'
import ReviewCard from './ReviewCard'
import {useAlert} from "react-alert";
import MetaData from '../layout/MetaData'
import { addItemsToCart } from '../../actions/cartActions'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from '@material-ui/core'
import {Rating} from '@material-ui/lab'
import { productConstants } from '../../constants/productConstants'
import { ThemeContext } from '../../context'

const ProductDetails = () => {
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode

    const dispatch = useDispatch()
    const alert = useAlert();
    
    let params = useParams()
  
    const { product, loading, error} = useSelector(
        (state) => state.productDetails
      );

    const {error: reviewError, success} = useSelector(state => state.newReview)

    const options = {
        readOnly: true,
        size: "large", 
        value: product.ratings,
        precision: 0.5,
      };

      const [quantity, setquantity] = useState(1);
      const [rating, setRating] = useState(0);
      const [open, setOpen] = useState(false)
      const [comment, setComment] = useState("")

      const increasedQuantity = () =>{

        if(product.Stock <= quantity) return
          const qty = quantity + 1;
          setquantity(qty);
      }

      const decreasedQuantity = () =>{
        if(1 >= quantity) return
        const qty = quantity - 1;
        setquantity(qty);
      }

      const addToCartHandler = () =>{
        dispatch(addItemsToCart(params.id,quantity));
        alert.success("Items added to Cart")
    }

    const submitReviewToggle = () =>{
        open ? setOpen(false) : setOpen(true)
    }

    const reviewSubmitHandler = () => {
        
        const myForm = new FormData();

        myForm.set('rating',rating);
        myForm.set('comment',comment);
        myForm.set('productId',params.id);
        dispatch(newReview(myForm))

        setOpen(false);
    }

      useEffect(()=>{
        if(error){
             alert.error(error)
             dispatch(clearErrors())
        }
        if(reviewError){
            alert.error(reviewError)
            dispatch(clearErrors())
       }
       if(success){
           alert.success("Review submitted successfully");
           dispatch({type: productConstants.NEW_REVIEW_RESET})
       }
        dispatch(getProductDetails(params.id))
    },[dispatch,params.id,error,alert,reviewError,success])

    return (
        <>
         {loading ? (
        <Loader />
      ) : (
          <>
          
          <MetaData title={`${product.name}--MaiMart`}  />
          <div className="productDetails" style={{ backgroundColor: darkMode ? "var(--color-bg)" : "#fff", color: darkMode && "var(--color-text)"}}>
            <div>
                <Carousel>
                     {product.images && product.images.map((item, i) =>(
                        <img className="carouselImage" key={item.url} src={item.url} alt={`${i} Slide`}/>
                    ))} 
                </Carousel>
            </div>
            <div style={{ backgroundColor: darkMode ? "var(--color-bg)" : "#fff", color: darkMode && "var(--color-text)"}}>
                <div className="detailsBlock-1" >
                    <h2 style={{ color:  darkMode && "var(--color-text)"}}>{product.name}</h2>
                    <p style={{ color: darkMode && "var(--color-text)"}}>Product #{product._id}</p>
                </div>
                <div className="detailsBlock-2" style={{ borderTop: darkMode && "1px solid var(--color-text)", borderBottom: darkMode && "1px solid var(--color-text)"}}>
                    <Rating className="detailsBlock-2-span " {...options} />
                    <span>({product.numOfReviews} Reviews)</span>
                </div>
                <div className="detailsBlock-3">
                    <h1 style={{ color: darkMode && "var(--color-text)"}}>₹{product.price}</h1>
                    <div className="detailsBlock-3-1">
                        <div className="detailsBlock-3-1-1">
                            <button onClick={decreasedQuantity}>-</button>
                            <input value={quantity} readOnly type="number"></input>
                            <button onClick={increasedQuantity}>+</button>
                        </div>{""}
                        <button disabled={product.Stock < 1 ? true : false} onClick={addToCartHandler}>Add to Cart</button>
                    </div>

                    <p style={{ color: darkMode && "var(--color-text)", borderTop: darkMode && "1px solid var(--color-text)", borderBottom: darkMode && "1px solid var(--color-text)"}} >
                        Status:{""} 
                        <b className={product.Stock < 1 ? "redColor": "greenColor"}>
                            {product.Stock < 1 ? "OutOfStock" : "InStock"}
                        </b>
                    </p>
                </div>
                <div className="detailsBlock-4" style={{ color: darkMode && "var(--color-text)"}}>
                    Description : <p style={{ color: darkMode && "var(--color-text)"}}>{product.description}</p>
                </div>
                <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>
            </div>
            </div> 

            <h3 className="reviewHeading" style={{ color: darkMode && "var(--color-text)"}}>Reviews</h3>
            <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={submitReviewToggle}>
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent className="submitDialog">
                        <Rating onChange={(e)=>setRating(e.target.value)} value={rating} size="large" />
                        <textarea className="submitDialogTextArea" cols="30" rows="5" value={comment} onChange={(e)=> setComment(e.target.value)}></textarea>
                </DialogContent>
                <DialogActions>
                    <Button onClick={submitReviewToggle} color="secondary">Cancel</Button>
                    <Button onClick={reviewSubmitHandler} color="primary">Submit</Button>
                </DialogActions>
            </Dialog>
            {product.reviews && product.reviews[0] ? (
                <div className="reviews" style={{ color: darkMode && "var(--color-text)"}}>
                    {product.reviews && product.reviews.map((review) => <ReviewCard key={review._id} review={review} /> )}
                </div>
            ) : (
                <p style={{ color: darkMode && "var(--color-text)"}}className="noReviews">No Reviews yet</p>
            )}
            </> 
      )}
        </>
    )
}

export default ProductDetails
