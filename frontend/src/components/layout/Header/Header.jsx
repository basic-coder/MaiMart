import React, { useContext } from 'react'
import {ReactNavbar} from 'overlay-navbar'
import logo from "../../../images/logo1.png";
import { ThemeContext } from '../../../context';

const Header = () => {
  const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode
    const options = {
        burgerColor : darkMode ? "#fff" : "var(--color-footer)" ,
        burgerColorHover: "#31aef7",
        logo,
        logoWidth: "20vmax",
        navColor1: darkMode ? "var(--color-footer)" :"white",
        logoHoverSize: "10px",
        logoHoverColor: "#31aef7",
        link1Text: "Home",
        link2Text: "Products",
        link3Text: "Contact",
        link4Text: "About",
        link1Url: "/",
        link2Url: "/products",
        link3Url: "/contact",
        link4Url: "/about",
        link1Size: "1.3vmax",
        link1Color: darkMode ? "white" :"rgba(35, 35, 35,0.8)",
        nav1justifyContent: "flex-end",
        nav2justifyContent: "flex-end",
        nav3justifyContent: "flex-start",
        nav4justifyContent: "flex-start",
        link1ColorHover: "#31aef7",
        link1Margin: "1vmax",
        profileIconUrl: "/login",
        profileIconColor:  darkMode ? "white" :"rgba(35, 35, 35,0.8)",
        cartIconColor: darkMode ? "white" :"rgba(35, 35, 35,0.8)",
        searchIconColor: "transparent",
        profileIconColorHover: "#31aef7",
        cartIconColorHover: "#31aef7",
        cartIconMargin: "1vmax",
      };
    return <ReactNavbar {...options} />
}

export default Header
