import React, { useContext } from 'react'
import './footer.css'
import { AiFillGithub, AiFillLinkedin, AiOutlineInstagram } from 'react-icons/ai'
import {SiCodechef} from 'react-icons/si'
import { ThemeContext } from '../../../context'
import {Link } from 'react-router-dom'

const Footer = () => {
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode
    return(
        <div className='portfolio__footer section__padding'  style={{backgroundColor: darkMode ? "var(--color-bg)" : "#fff", color: darkMode && "#fff"}}>
            <div className="portfolio__footer-links">
                <div className="portfolio__footer-links_logo">
                    <h1 className='gradient__text'>Mai Mart</h1>
                    <p style={{color: darkMode && "#fff"}}>All Rights Reserved</p>
                </div>
                <div className="portfolio__footer-links_div" >
                    <h4 style={{color: darkMode && "#fff"}}>Social Links</h4>
                    <Link to='https://github.com/basic-coder' style={{color: darkMode && "#fff"}}> <AiFillGithub className='i' style={{color: darkMode && "#fff"}}/> Github</Link>
                    <Link to='https://www.instagram.com/basic_coder/' style={{color: darkMode && "#fff"}}> <AiOutlineInstagram className='i' style={{color: darkMode && "#fff"}}/> Instagram</Link>
                    <Link to='https://www.linkedin.com/in/bhavesh-sakpal-711770189/' style={{color: darkMode && "#fff"}}> <AiFillLinkedin className='i' style={{color: darkMode && "#fff"}}/>Linked In</Link>
                    <Link to='https://www.codechef.com/users/bhavessh' style={{color: darkMode && "#fff"}}> <SiCodechef className='i'style={{color: darkMode && "#fff"}} />CodeChef</Link>
                </div>
                <div className="portfolio__footer-links_div">
                    <h4 style={{color: darkMode && "#fff"}}>Get in touch</h4>
                    <Link to="#" style={{color: darkMode && "#fff"}}>basic-coder</Link>
                    <Link to="#" style={{color: darkMode && "#fff"}}>8108054243</Link>
                    <Link to='mailto:basiccoder01@gmail.com' style={{color: darkMode && "#fff"}}>basiccoder01@gmail.com </Link>
                </div>
            </div>
            <div className="portfolio__footer-copyright">
                <p style={{color: darkMode && "#fff"}}>2021 basic-coder. All Rights Reserved</p>
            </div>
        </div>
    )
}

export default Footer
