import React,{useContext} from 'react'
import './about.css'
import {ThemeContext} from '../../context'

const About = () => {
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode
    return (
    <div className="about" style={{ backgroundColor: darkMode ? "var(--color-bg)" : "#fff", color: darkMode && "#fff"}}>
        <div className='aboutSection' style={{ backgroundColor: darkMode ? "var(--color-footer)" : "#fff", color: darkMode && "#fff"}}>
            <div className="innerContainer" style={{ backgroundColor: darkMode ? "var(--color-bg)" : "#fff", color: darkMode && "#fff"}}>
                <h1>About Us</h1>
                <p className='text'>
                Trade, be it barter exchange or buying and selling of goods and services has been prevalent for centuries. No one can be self-sufficient. And this brings out the need for demand and supply of goods and services.
Transactions have been going on all over the world for centuries, locally, and across locations. Keeping the same concept in mind, now think electronic.
                </p>
                <div className="skills">
                    <p>Efficient</p>
                    <p>Quality</p>
                    <p>Quantity</p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default About
