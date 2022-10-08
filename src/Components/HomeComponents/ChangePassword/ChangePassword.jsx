

import { EmailAuthProvider, reauthenticateWithCredential, sendPasswordResetEmail } from "firebase/auth"
import { useState } from "react"
import { auth } from "../../../firebase"
import { CustomButtonModified } from "../../General"
import "./ChangePassword.css"
export const ChangePassword = () => {
    const [error, setError] = useState("")
    const [password, setPassword] = useState("")
    const onChangePost = (e) => {
        e.preventDefault()
        if (password) {
            const credential = EmailAuthProvider.credential(
                auth.currentUser.email,
                password
            )
            reauthenticateWithCredential(auth.currentUser, credential).then((cred)=>{
                sendPasswordResetEmail(auth, auth.currentUser.email).then((res)=>{
                    setError("Reset Email Sent!!")
                }, (err)=> console.log(err))
            },(err)=>setError("Wrong Password"))
        }
    }
    
    return (
        <div className="change-pass-wrapper">
            <div className="change-pass">
                <form className="vid-upload-form" onSubmit={onChangePost}>
                    <h3>Change Password</h3>
                    <p>Please enter your current password to change the password.</p>
                    <div className="vid-upload-input">
                        <label hidden>Current Email</label>
                        <input className='vid__uploadTitle' value={auth.currentUser.email} hidden disabled></input>
                    </div>
                    <div className="vid-upload-input">
                        <label>Current Password</label>
                        <input className='vid__uploadTitle' onChange={(e)=>setPassword(e.target.value)} type={`password`} required></input>
                    </div>
                    <div className="vid-send-reset">
                        <p>{error ? error : "" }</p>
                        <CustomButtonModified btnLabel={"Confirm"} />
                    </div>
                </form>
            </div>
        </div>
    )
}