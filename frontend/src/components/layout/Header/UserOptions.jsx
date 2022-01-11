import React, { useContext, useState } from 'react'
import './header.css'
import {SpeedDial,SpeedDialAction} from '@material-ui/lab'
import DashBoardIcon from '@material-ui/icons/Dashboard'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ListAltIcon from '@material-ui/icons/ListAlt'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import BrightnessIcon from '@material-ui/icons/Brightness3'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { useNavigate } from 'react-router';
import {useAlert} from 'react-alert'
import {useDispatch, useSelector} from 'react-redux'
import { logout } from '../../../actions/userAction'
import { Backdrop } from '@material-ui/core'
import { ThemeContext } from '../../../context'

const UserOptions = ({user}) => {
    const [open, setOpen] = useState(false)
    const alert = useAlert()
    const {cartItems} = useSelector(state => state.cart)
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode
    const options =[
        {icon: <ListAltIcon />, name:"Orders" , func:orders},
        {icon: <PersonIcon />, name:"Profile" , func:account},
        {icon: <ShoppingCartIcon style={{color:cartItems.length >=0 ? "#31aef7" : "unset"}} />, name:`Cart(${cartItems.length})` , func:cart},
        {icon: <ExitToAppIcon />, name:"Logout" , func:logoutUser},
        {icon: darkMode ? <WbSunnyIcon /> : <BrightnessIcon />,name:"Mode", func:toggleTheme}
    ]

    if(user.role==="admin"){
        options.unshift({icon: <DashBoardIcon />, name:"Dashboard" , func:dashboard},)
    }

    function dashboard(){
        navigate('/admin/dashboard')
    }
    function orders(){
        navigate('/orders')
    }
    function account(){
        navigate('/account')
    }
    function cart(){
        navigate('/cart')
    }
    function logoutUser(){
        dispatch(logout())
        alert.success("logout successful")
    }

    function toggleTheme(){
        theme.dispatch({type: "TOGGLE"})
    }
    return (
        <>
            <Backdrop open={open} style={{zIndex:"10"}} />
            <SpeedDial className="speedDial" ariaLabel="SpeedDial tooltip example" onOpen={()=>setOpen(true)}
            onClose={()=>setOpen(false)} open={open} direction="down" style={{zIndex:"11"}} icon={<img className="speedDialIcon" 
            src={user.avatar.url ? user.avatar.url :'/profile.png'} 
            alt="profile" />}>
                {options.map((item) => (
                    <SpeedDialAction tooltipOpen={window.innerWidth <= 600 ? true : false} key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func} />
                ))}
                

            </SpeedDial>

        </>
    )
}

export default UserOptions
