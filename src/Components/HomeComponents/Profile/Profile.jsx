

import { EmailAuthProvider, reauthenticateWithCredential, sendPasswordResetEmail } from "firebase/auth"
import { collection, doc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore"
import { useRef } from "react"
import { useEffect, useState } from "react"
import { auth, firestore } from "../../../firebase"
import { CustomButtonModified } from "../../General"
import "./Profile.css"
export const Profile = ({userType, isDashBoard}) => {
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [fullName, setFullName] = useState("")
    const [country, setCountry] = useState("")
    const [phone, setPhone] = useState("")
    const [docID, setDocID] = useState("")
    const [currentUser, setCurrentUser] = useState("")
    const isUserExist = useRef(false)
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

    const onChangePost = (e) => {
        e.preventDefault()
        setError("")
        if (email && userName && fullName && country) {
            isUniqueUsername(userName).then(async(res)=> {
                if(res) {
                    setError("Username already taken")
                    return
                }   
                if (docID) {
                    const docRef = doc(firestore, "users", docID)
                    await updateDoc(docRef, {
                        email: email,
                        userName: userName,
                        fullName: fullName,
                        country: country,
                        phone: phone
                    }).then((res)=>{
                        setError("Profile Successfully Updated")
                    }, (err) => {setError("Failed to update Profile :/")})
                } else {
                    setError("Error connecting firebase")
                }
            })
        } else {
            setError("Please check all the fields")
        }
        
    }


    const GetCurrentUser = async() => {
        const userQuery = query(collection(firestore, "users"), where("uuid", "==", auth.currentUser.uid))
        // onSnapshot(userQuery, (snap) => {
        //     setCurrentUser(snap.docs[0].data())
        // })
        await getDocs(userQuery).then((snap)=>{
            setCurrentUser(snap.docs[0].data())
            setEmail(snap.docs[0].data().email)
            setUserName(snap.docs[0].data().userName)
            setFullName(snap.docs[0].data().fullName)
            setCountry(snap.docs[0].data().country)
            setPhone(snap.docs[0].data().phone)
            setDocID(snap.docs[0].id)
        })
    }


    useEffect(()=> {
        GetCurrentUser()
    },[])
    
    return (
        <div className="change-pass-wrapper">
            <div className="change-pass">
                <form className="vid-upload-form" onSubmit={onChangePost}>
                    <h3>{`${userType} Profile`}</h3>
                    <p>{`${userType} Details`}</p>
                    <div className="vid-upload-input">
                        <label>Full Name</label>
                        <input className='vid__uploadTitle' type={`text`} onChange={(e)=>setFullName(e.target.value)} value={fullName} minLength={3} required></input>
                    </div>
                    <div className="vid-upload-input">
                        <label>Username</label>
                        <input className='vid__uploadTitle' type={`text`} onChange={(e)=>setUserName(e.target.value)} value={userName} minLength={6} maxLength={12} required></input>
                    </div>
                    <div className="vid-upload-input">
                        <label>Phone Number</label>
                        <input className='vid__uploadTitle' type={`phone`} onChange={(e)=>setPhone(e.target.value)} value={phone}  minLength={7} maxLength={12} required></input>
                    </div>
                    <div className="vid-upload-input">
                        <label>Email</label>
                        <input className='vid__uploadTitle' type={`email`} onChange={(e)=>setEmail(e.target.value)} value={email} disabled></input>
                    </div>
                    <div className="vid-upload-input">
                        <label>Country</label>
                        <input className='vid__uploadTitle' type={`text`} onChange={(e)=>setCountry(e.target.value)} value={country} minLength={4} required></input>
                    </div>
                    <div className="vid-upload-input">
                        <label>Account Status</label>
                        <input className='vid__uploadTitle' type={`text`} value={currentUser.status} disabled></input>
                    </div>     
                    <div className="vid-send-reset">
                        <p>{error ? error : "" }</p>
                        <CustomButtonModified btnLabel={"Update"} />
                    </div>
                </form>
            </div>
        </div>
    )
}