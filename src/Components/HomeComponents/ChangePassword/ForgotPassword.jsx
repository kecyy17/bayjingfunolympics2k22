

import { EmailAuthProvider, reauthenticateWithCredential, sendPasswordResetEmail } from "firebase/auth"
import { useState } from "react"
import { auth } from "../../../firebase"
import { CustomButtonModified } from "../../General"
import "./ChangePassword.css"
export const ForgotPassword = () => {
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const onChangePost = (e) => {
        e.preventDefault()
        if (email) {
            sendPasswordResetEmail(auth, email).then((res)=>{
                setError("Reset link successfully sent!!!")
            },(err)=>{
                setError(`Firebase Error: ${err.code.split("/")[1]}`)
            });
        }
    }
    
    return (
        <div className="change-pass-wrapper">
            <div className="change-pass">
                <form className="vid-upload-form" onSubmit={onChangePost}>
                    <h3>Reset Password</h3>
                    <p>Please enter your email to get reset password link.</p>
                    <div className="vid-upload-input">
                        <label>Email</label>
                        <input className='vid__uploadTitle' type={`email`} onChange={(e)=>setEmail(e.target.value)}></input>
                    </div>
                    <div className="vid-send-reset">
                        <p>{error ? error : "" }</p>
                        <CustomButtonModified btnLabel={"Reset"} />
                    </div>
                </form>
            </div>
        </div>
    )
}