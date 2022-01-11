import React,{useContext, useState} from 'react'
import './shipping.css'
import { useSelector, useDispatch } from 'react-redux'
import { saveShippingInfo } from '../../actions/cartActions'
import MetaData from '../layout/MetaData'
import HomeIcon from '@material-ui/icons/Home'
import LocationCityIcon from '@material-ui/icons/LocationCity'
import PublicIcon from '@material-ui/icons/Public'
import PhoneIcon from '@material-ui/icons/Phone'
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation'
import {Country ,State} from 'country-state-city'
import { useAlert } from 'react-alert'
import CheckoutSteps from './CheckoutSteps'
import {useNavigate} from 'react-router'
import { ThemeContext } from '../../context'

const Shipping = () => {
    const dispatch = useDispatch()
    const alert = useAlert();
    const {shippingInfo} = useSelector((state) => state.cart)
    const navigate = useNavigate()
    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [state, setState] = useState(shippingInfo.state)
    const [country, setCountry] = useState(shippingInfo.country)
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode
    const shippingSubmit = (e) =>{
      e.preventDefault();
      if(phoneNo.length < 10 || phoneNo.length > 10){
        alert.error("Please Number should be 10 digit");
        return;
      }
      dispatch(
        saveShippingInfo({address,city,state,country,pinCode, phoneNo})
      )
      navigate('/order/confirm');
    }
    
    return (
        <>
          <MetaData title="Shipping Details" />  
          <CheckoutSteps activeStep={0} />
          <div className="shippingContainer">
              <div className="shipppingBox">
                  <h2 className="shippingHeading"  style={{ color: darkMode && "var(--color-text)"}} >Shipping Details</h2>
                <form className="shippingForm" encType="multipart/form-data" onSubmit={shippingSubmit}>
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <PublicIcon />
              <input
                type="text"
                placeholder="Pin Code"
                required
                name="pinCode"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                name="phoneNumber"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div>
              <PublicIcon />
              <select required value={country} onChange={(e)=> setCountry(e.target.value)}>
              <option value="">Country</option>
              {
                Country && Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))
              }
              </select>
            </div>

            {country && (
              <div>
                <TransferWithinAStationIcon />
                <select required value={state} onChange={(e)=> setState(e.target.value)}>
                <option value="">State</option>
                {State && State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
                ))}
                </select>
                </div>
            )}

            <input type="submit" value="Continue" className="shippingBtn" disabled={state ? false : true} />


                </form>
              </div>
          </div>
        </>
    )
}

export default Shipping
