import React, { useContext } from 'react'
import {Rating} from '@material-ui/lab'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../context'

const ProductCard = ({product}) => {
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode

    const options ={
        readOnly: true,
        precision: 0.5, 
        value: product.ratings,
    }
    return (
        <Link className="productCard" to={`/product/${product._id}`} style={{ backgroundColor: darkMode ? "var(--color-bg)" : "#fff", color: darkMode && "var(--color-text)"}}>
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <div>
            <Rating {...options} />
            <span className="productCardSpan">({product.numOfReviews} reviews)</span>
        </div>
        <span>₹{product.price}</span> 

        </Link>
    )
}

export default ProductCard
