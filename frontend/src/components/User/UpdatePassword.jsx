import React, {  useState,useEffect, useContext } from "react";
import Loader from "../layout/Loader/Loader";
import { useNavigate } from 'react-router';
import {useDispatch, useSelector} from 'react-redux'
import { clearErrors,updatePassword} from "../../actions/userAction";
import {useAlert} from 'react-alert'
import { userConstants } from "../../constants/userConstants";
import MetaData from '../layout/MetaData'
import './UpdatePassword.css'
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey"
import { ThemeContext } from "../../context";

const UpdatePassword = () => {
  const theme = useContext(ThemeContext)
const darkMode = theme.state.darkMode
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate  = useNavigate()
    const {loading,error,isUpdated} = useSelector(state => state.profile)
   const [oldPassword, setOldPassword] = useState("")
   const [newPassword, setNewPassword] = useState("")
   const [confirmPassword, setConfirmPassword] = useState("")
    const updatePasswordSubmit = (e) =>{
        e.preventDefault();
        const myForm = new FormData();
    
        myForm.set("oldPassword",oldPassword);
        myForm.set("newPassword",newPassword);
        myForm.set("confirmPassword",confirmPassword);
        dispatch(updatePassword(myForm))
      }

    useEffect(() => {
        if(error){
          alert.error()
          dispatch(clearErrors)
        }
        if(isUpdated){
          alert.success("Profile updated sucessfully")
          navigate('/account')
          dispatch({
            type: userConstants.UPDATE_PASSWORD_RESET
          });
        }
    
      }, [error,dispatch,navigate,alert,isUpdated])
    
    return (
        <>
             <>
      {loading ? <Loader /> : (
        <>
      <MetaData title="Change Password" />
      <div className="updatePasswordContainer" style={{backgroundColor: darkMode ? "var(--color-bg)" : "#fff"}}>
        <div className="updatePasswordBox">
          <h2 className="updatePasswordHeading">Change Password</h2>
        <form className="updatePasswordForm" onSubmit={updatePasswordSubmit}>
        <div className="signupPassword">
              <VpnKeyIcon />
              <input
                type="password"
                placeholder="Old Password"
                required
                name="oldPassword"
                value={oldPassword}
                onChange={(e)=>setOldPassword(e.target.value)}
              />
            </div>
            <div className="signupPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="New Password"
                required
                name="newPassword"
                value={newPassword}
                onChange={(e)=>setNewPassword(e.target.value)}
              />
            </div>
            <div className="signupPassword">
              <LockIcon />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
              />
            </div>
  
            
            <input type="submit" value="Change" className="updatePasswordBtn" />
          </form>
          </div>
          </div>
            </>
            )}
        </>
        </>
    )
}

export default UpdatePassword
