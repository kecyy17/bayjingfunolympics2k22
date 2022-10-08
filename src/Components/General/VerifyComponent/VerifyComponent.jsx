import { sendEmailVerification } from "firebase/auth"
import { collection, doc, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { auth, firestore } from "../../../firebase"
import { CustomButton } from "../../General"
import { HomeNavBar } from "../../General"
import "./VerifyComponent.css"
export const VerifyComponent = () => {
    const NavigateToPage = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            sendEmailVerification(auth.currentUser)
        }catch(e) {
            
        }   
    }

    useEffect(()=> {
        let interval = setInterval(async() => {
            if (auth.currentUser.emailVerified) {
                const userRef = query(collection(firestore, "users"), where("uuid", "==", auth.currentUser.uid))
                onSnapshot(userRef, async(snapshot) => {
                    let docId = '';
                    snapshot.forEach(doc => {
                        docId = doc.id;
                    })
                    if (docId != '') {
                        await updateDoc(doc(firestore, `users/${docId}`), {status: "Verified", online:true}).then((res)=> {
                            clearInterval(interval);
                            NavigateToPage("/home");
                        })
                    } 
                })
            }
            await auth.currentUser.reload();
            }, 2000);
        return () => {
            clearInterval(interval)
        }
    },[NavigateToPage])

    return (
        <>
            <HomeNavBar btnText="Logout" toPage="/"/>
            <div className="verify-container">
                <div className="form-wrapper ">
                    <form className="banned-wrapper" onSubmit={handleSubmit}>
                        <h2>Verify Your Email</h2>
                        <p>Email verification link has been sent to you email.If you haven't got any mail, please click on Resend button.</p>
                        <CustomButton text={"Resend"} btnType="Submit"/>
                    </form>
                </div>
            </div>
        </>
    )
}