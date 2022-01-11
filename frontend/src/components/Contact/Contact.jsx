import React, { useContext, useState } from 'react'
import './contact.css'
import {AiOutlinePhone,AiOutlineMail} from "react-icons/ai";
import {IoLocationOutline} from 'react-icons/io5'
import { useRef } from 'react';
import emailjs from 'emailjs-com';
import { ThemeContext } from '../../context';

const Contact = () => {
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode
   const formRef =  useRef()
   const [done, setDone] = useState(false)
   const handleSubmit = (e) =>{
       e.preventDefault()

       emailjs.sendForm('service_pwxtyon', 'template_232i2kv', formRef.current, 'user_gfZyqBaSrcJOLE25y0LE5')
       .then((result) => {
           console.log(result.text);
           setDone(true)
       }, (error) => {
           console.log(error.text);
       });
   }
    return (
        <div className='c' id="contact" style={{ backgroundColor: darkMode ? "var(--color-bg)" : "#fff"}}>
            <div className="c-bg"> </div>
                <div className="c-wrapper" style={{ color: darkMode && "var(--color-text)"}}>
                    <div className="c-left">
                        <h1 className="c-title gradient__text">Let 's discuss your project</h1>
                        <div className="c-info">
                            <div className="c-info-item">
                                <AiOutlinePhone className="c-icon" /> 8108054243
                            </div>
                            <div className="c-info-item">
                                <AiOutlineMail className="c-icon" /> basiccoder01@gmail.cpm
                            </div>
                            <div className="c-info-item">
                                <IoLocationOutline className="c-icon" /> 401 Janee Kunj Bld, Mumbai - 410 005 
                            </div>
                        </div>
                </div>
                <div className="c-right">
                    <div className="c-desc">
                        <b>Get in touch.</b><br />
                         Always available for freelancing if the right project comes along to me.
                    </div>
                    <form ref={formRef} onSubmit={handleSubmit}>
                        <input type="text" style={{ color: darkMode && "var(--color-text)"}} required placeholder='Name' name='user_name' />
                        <input type="text" style={{ color: darkMode && "var(--color-text)"}} required placeholder='Subject' name='user_subject' />
                        <input type="email" style={{ color: darkMode && "var(--color-text)"}} required placeholder='Email' name='user_email' />
                        <textarea rows="5" style={{ color: darkMode && "var(--color-text)"}} required placeholder='Message' name="message" />
                        <button >Submit</button>
                        {
                            done && "Thank you..."
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact
