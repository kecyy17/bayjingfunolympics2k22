import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../../../firebase";
import { AuthUser } from "../../../AllContext";


export const LogoutUser = () => {
    const {LogoutUser} = AuthUser();
    // const {funUser, loading, CurrentUserType, banned} = AuthUser();
    const NavigateToPage = useNavigate();
    useEffect(()=>{
        const CleanUpStatus = async() => {
            const userRef = query(collection(firestore, "users"), where("uuid", "==", auth.currentUser.uid))
            await getDocs(userRef).then(async (snap) => {
                await updateDoc(doc(firestore, `users/${snap.docs[0].id}`), {online:false}).then(async(res)=> {
                    
                })
            })
        }
        const Logout = async() => {
            await LogoutUser().then((res)=>{
                NavigateToPage('/')
            })
        }
        CleanUpStatus()
        const logoutInterval = setInterval(()=>{
           Logout()
        },2000)
        return ()=>clearInterval(logoutInterval)
    },[])
    return (
        <div className="change-pass-wrapper">
        {/* <div className="change-pass">
            <form className="vid-upload-form" >
                <p>Logging out...</p>
            </form>
        </div> */}
    </div>
    )
}