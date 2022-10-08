import { useState } from "react"
import { AuthUser } from "../../../AllContext"
import { MessageLog, CustomButton, NormalNavBar } from "../../General"

import "./Login.css"
export const Login = () => {
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const {LoginUser, error} = AuthUser();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await LoginUser(email, pass);
        }catch(e) {
            
        }
        
    }

    return (
        <>
            <NormalNavBar btnText="Signup" toPage="/signup"/>
            <div className="login-container">
                <div className="form-wrapper">
                    <div className="form-header">
                        <h3>LOGIN</h3>
                    </div>
                    <form className="" onSubmit={handleSubmit}>
                        <div className="form-input">
                            <label>Email</label>
                            <input type="email" onChange={(e)=> setEmail(e.target.value)} required></input>
                        </div>
                        <div className="form-input">
                            <label>Password</label>
                            <input type="password" onChange={(e) => setPass(e.target.value)} required></input>
                        </div>
                        <div className="forgot-password">
                            <a href="/forgot">Forgot Password?</a>
                        </div>
                        <div className="err-message-wrapper">
                            {
                                error ? <MessageLog err={error}/>: ""
                            }
                        </div>
                        <div className="login-button">
                            <CustomButton text={"Login"} btnType="Submit"/>
                        </div>
                        <div className="login-or">
                            <p>-- OR --</p>
                            <p>Dont have an Account ?<span><a href="/signup">Register</a></span></p>
                        </div>
                    </form>
                    
                </div>
            </div>
        </>
    )
}