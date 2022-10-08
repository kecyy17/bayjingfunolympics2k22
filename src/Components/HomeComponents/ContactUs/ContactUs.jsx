import { useState } from "react"
import { CustomButtonModified } from "../../General"



export const ContactUs = () => {
    const [fullName, setFullName] = useState()
    const [email, setEmail] = useState()
    const [error, setError] = useState()
    const [message, setMessage] = useState()
    return (
        <div className="landing-contact-wrapper">
            <div className="contact-width">
                <form className="landing-contact-form">
                    <h3>Contact US</h3>
                    <div className="vid-upload-input">
                        <label>FullName</label>
                        <input className='vid__uploadTitle' type={`text`} onChange={(e)=>setFullName(e.target.value)} value={fullName} required></input>
                    </div>
                    <div className="vid-upload-input">
                        <label>Email</label>
                        <input className='vid__uploadTitle' type={`email`} onChange={(e)=>setEmail(e.target.value)} value={email} required></input>
                    </div>
                    <div className="vid-upload-input">
                        <label>Description</label>
                        <textarea className='vid__uploadDesc'  rows={6} onChange={(e)=>setMessage(e.target.value)} value={message} required></textarea>
                    </div>
                    <div className="vid-send-reset">
                        <p>{error ? error : "" }</p>
                        <CustomButtonModified btnLabel={"Send Message"} />
                    </div>
                </form>
            </div>
        </div>
    )
}