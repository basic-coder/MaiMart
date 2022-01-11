import React, {useContext, useEffect} from 'react'
import { useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import {Link} from 'react-router-dom'
import Loader from '../layout/Loader/Loader'
import { useNavigate } from 'react-router';
import './profile.css'
import { ThemeContext } from '../../context'

const Profile = () => {
    const theme = useContext(ThemeContext)
const darkMode = theme.state.darkMode
    const {user,loading,isAuthenticated} = useSelector(state => state.user);
    const navigate =useNavigate()
    useEffect(()=>{
        if(isAuthenticated===false){
            navigate('/login')
        }
    },[isAuthenticated,navigate])
    
    return (
        <>
        {loading ? (<Loader /> ): (<> 
            <MetaData title={`${user.name}'s Profile`} /> 
            <div className="profileContainer" style={{backgroundColor: darkMode ? "var(--color-bg)" : "#fff"}}>
                <div style={{backgroundColor: darkMode ? "var(--color-bg)" : "#fff"}}>
                    <h1>My Profile</h1>
                    <img src={user.avatar.url} alt={user.name} />
                    <Link to="/me/update"> Edit Profile </Link>
                </div>
                <div>
                <div>
                    <h4  style={{ color: darkMode && "var(--color-text)"}} >Full name</h4>
                    <p>{user.name}</p>
                </div>
                <div>
                    <h4  style={{ color: darkMode && "var(--color-text)"}} >Email</h4>
                    <p>{user.email}</p>
                </div>
                <div>
                    <h4  style={{ color: darkMode && "var(--color-text)"}} >Joined On</h4>
                    <p>{String(user.createdAt).substr(0,10)}</p>
                </div>
                <div>
                    <Link to="/orders">My Orders</Link>
                    <Link to="/password/update">Change Password</Link>
                </div>
                </div>
            </div>
            </>)}
        </>
    )
}

export default Profile
