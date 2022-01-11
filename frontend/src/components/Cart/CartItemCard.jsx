import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../context'
import './cartItemCard.css'

const CartItemCard = ({item, deleteCartItems}) => {
    const theme = useContext(ThemeContext)
const darkMode = theme.state.darkMode
    return (
        <div className="CartItemCard">
            <img src={item.image} alt="aaa" />
            <div>
                <Link style={{ color: darkMode && "var(--color-text)"}} to={`/product/${item.product}`}>{item.name}</Link>
                <span style={{ color: darkMode && "var(--color-text)"}}>{`Price: ₹${item.price}`}</span>
                <p onClick={()=>deleteCartItems(item.product)}>Remove</p>
            </div>
        </div>  
    )
}

export default CartItemCard
