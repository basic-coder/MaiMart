import { Step, StepLabel, Typography } from '@material-ui/core'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import React, { useContext } from 'react'
import { Stepper } from '@material-ui/core'
import './checkout.css'
import { ThemeContext } from '../../context'

const CheckoutSteps = ({activeStep}) => {
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode
    const steps=[
    {
        label: <Typography style={{ color: darkMode && "var(--color-text)"}}>Shipping Details </Typography>,
        icon: <LocalShippingIcon />
    },
    {
        label: <Typography style={{ color: darkMode && "var(--color-text)"}}>Confirm Order</Typography>,
        icon: <LibraryAddCheckIcon />
    },
    {
        label: <Typography style={{ color: darkMode && "var(--color-text)"}}>Payment </Typography>,
        icon: <AccountBalanceIcon />
    },
]


    return (
        <>
            <Stepper alternativeLabel activeStep={activeStep} style={{backgroundColor: darkMode ? "var(--color-bg)" : "#fff", boxSizing : 'border-box'}}>
                {steps.map((item, index) =>(
                    <Step key={index}
                    active={activeStep === index ? true : false}
                    completed={activeStep >= index ? true : false}
                    >
                        <StepLabel style={{
                            color: activeStep >= index ? '#31aef7' : 'rgba(0,0,0,0.649)'
                        }} icon={item.icon}>
                            {item.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </>
    )
}

export default CheckoutSteps
