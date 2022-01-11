import React, { useContext } from 'react'
import {Rating} from '@material-ui/lab'
import profilePng from '../../images/profile.png'
import { ThemeContext } from '../../context'

const ReviewCard = ({review}) => {
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode
    const options ={
        readOnly: true,
        precision: 0.5, 
        value: review.rating,
    }
    return (
        <div className="reviewCard">
            <img src={profilePng} alt="USER" />
            <p style={{ color: darkMode && "#fff"}}>{review.name}</p>
            <Rating {...options} />
            <span className="reviewCardComment" style={{ color: darkMode && "#fff"}}>{review.comment}</span>
        </div>
    )
}

export default ReviewCard
