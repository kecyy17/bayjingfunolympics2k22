import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { BackDrop, HeroNavBar, HomeNavBar, NotificationPopup } from "../Components"
import { auth, firestore } from "../firebase";
import { AuthUser } from "../AllContext";

import "./BayjingHomeContainer.css";

export const BayjingHomeContainer = ({component}) => {
    const [userName, setUserName] = useState()
    const {banned} = AuthUser();
    const GetCurrentUser = () => {
        if (auth.currentUser) {
            const userQuery = query(collection(firestore, "users"), where("uuid", "==", auth.currentUser.uid))
            onSnapshot(userQuery,(snap)=>{
                setUserName(snap.docs[0].data().userName)
            })
        }
        
    }

    useEffect(()=>{
        GetCurrentUser()
    },[])

    return (
        <div className="home-container">
            {
                auth.currentUser && auth.currentUser.emailVerified ? 
                    <BackDrop children={<NotificationPopup />} banned={banned}/>
                    : ""
            }
            
            <div className="home-nav">
                {
                    auth.currentUser ? 
                        banned?
                            <HomeNavBar navColor="#132f4c" userName={userName} className={`disable-click`} />
                            :
                            <HomeNavBar navColor="#132f4c" userName={userName}/>:
                        <HeroNavBar />
                }
                
            </div>
            
            <div className="home-body">
                {   
                    component
                }
            </div>
        </div>
    )
}