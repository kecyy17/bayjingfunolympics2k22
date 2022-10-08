import { collection, getDocs, query, where } from "firebase/firestore"
import { useRef, useState } from "react"
import { firestore } from "../../../firebase"
import { AuthUser } from "../../../AllContext"
import { MessageLog, CustomButton } from "../../General"
import { NormalNavBar } from "../../General"
import "./Signup.css"
export const Signup = () => {
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const [confirmPass, setConfirmPass] = useState();
    const [userName, setUserName] = useState();
    const [fullName, setFullName] = useState();
    const [phone, setPhone] = useState();
    const [country, setCountry] = useState();
    // const [userExist, setUserExist] = useState(false)
    const isUserExist = useRef(false)
    const [errMsg, setErrMsg] = useState();
    const {RegisterNewUser, error} = AuthUser();
    
   

    const isEmpty = (value) => {
        if(value == "") {
            return true
        } else {
            return false;
        }
    }


    const isUniqueUsername = async(userName) => {
        const userRef = query(collection(firestore, "users"), where("userName", "==", userName))
        await getDocs(userRef).then((snap)=> {
            if (snap.docs.length > 0) {
                isUserExist.current = true
            } else {
                isUserExist.current = false
            } 
        })
        return isUserExist.current
    }
    const isValidUserLength = (userName) => {
        if(userName.length > 12) {
            return false
        } else {
            return true
        }
    }

    // password validation
    function checkPassword(str)
    {
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return re.test(str);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!isEmpty(fullName) && 
                !isEmpty(userName) &&
                !isEmpty(email) &&
                !isEmpty(phone) &&
                !isEmpty(country) &&
                !isEmpty(pass) &&
                !isEmpty(confirmPass))
                {
                    setErrMsg("")
                    // validation
                    if (!isValidUserLength(userName)) {
                        setErrMsg("Maximum username length is 12")
                        return
                    }
                    isUniqueUsername(userName).then((res)=> {
                        if(res) {
                            setErrMsg("Username already taken !! ")
                            return
                        }   
                        if (!checkPassword(pass)) {
                            setErrMsg("Password must be atlest 8 characters and contain: 1 Uppercase & Lowercase, 1 special character and 1 number")
                            return
                        }  
                        if (pass !== confirmPass) {
                            setErrMsg("Confirm Password do not match !!")
                            return
                        }
                        RegisterNewUser(fullName, userName,email, phone, country, pass);
                    })
                    
                    
                    
            } else {
                console.log("please check all the fileds before you register!!")
            }
            
        }catch(e) {
            
        }
        
    }

    return (
        <>
            <NormalNavBar />
            <div className="signup-container">
                <div className="form-signup-wrapper">
                    <div className="signup-label">
                        <h3>SIGN UP</h3>
                    </div>
                    <form className="" onSubmit={handleSubmit}>
                        <div className="form-input">
                            <label>Full Name</label>
                            <input type="text" onChange={(e)=> setFullName(e.target.value)} minLength={3} required></input>
                        </div>
                        <div className="form-input">
                            <label>Username</label>
                            <input type="text" onChange={(e)=> setUserName(e.target.value)} minLength={6} maxLength={12} required></input>
                        </div>
                        <div className="form-input">
                            <label>Email</label>
                            <input type="email" onChange={(e)=> setEmail(e.target.value)} required></input>
                        </div>
                        <div className="form-input">
                            <label>Phone</label>
                            <input type="phone" onChange={(e)=> setPhone(e.target.value)} minLength={7} maxLength={12} required></input>
                        </div>
                        <div className="form-input">
                            <label>Country</label>
                            <input type="text" onChange={(e)=>setCountry(e.target.value)} minLength={4} required></input>
                        </div>
                        <div className="form-input">
                            <label>Password</label>
                            <input type="password" onChange={(e) => setPass(e.target.value)} minLength={8} maxLength={16} required></input>
                        </div>
                        <div className="form-input">
                            <label>Confirm Password</label>
                            <input type="password" onChange={(e) => setConfirmPass(e.target.value)} required></input>
                        </div>
                        <div className="err-message-wrapper">
                            {
                                !errMsg ?
                                <MessageLog err={error}/>
                                :
                                <MessageLog err={errMsg}/>
                            }
                            
                            
                        </div>
                        <div className="signup-btn">
                            <CustomButton text={"Register"} btnType="Submit"/>
                        </div>
                        <div className="login-or">
                            <p>-- OR --</p>
                            <p>Already have an Account ?<span><a href="/login">Login</a></span></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}