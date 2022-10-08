
import { addDoc, collection, orderBy, query, limit, serverTimestamp, onSnapshot, where, limitToLast } from "firebase/firestore"
import { useRef, useState } from "react"
import { firestore } from "../../../firebase"
import { auth } from "../../../firebase"
import { IconButton } from '@mui/material';
import {useCollectionData} from "react-firebase-hooks/firestore"
import SendIcon from '@mui/icons-material/Send';
import "./ChatBox.css";
import { ChatMessage } from "./ChatMessage";
import { useEffect } from "react";
import Filter from 'bad-words'
export const ChatBox = ({game, isHighlight}) => {
    const [rmessage, setMessage] = useState("")
    const queryRef = collection(firestore, "livechat","Ju6NdmCCF23yOq8xSqbJ",game)
    const chatQuery = query(queryRef, orderBy("createdAt"), limitToLast(15))
    const [chatMessages, loading] = useCollectionData(chatQuery);
    const [userName, setUserName] = useState("")
    const fixScroll = useRef();
    const filter = new Filter();
    const sendMessage = async(e) => {
        e.preventDefault();
        filter.addWords('shit', 'stupid')
        
        
        if(rmessage && userName) {
            if (filter.isProfane(rmessage)) {
                const colRef = collection(firestore, "BadActivity")
                await addDoc(colRef, {
                    badTitle: "User Report",
                    badMessage: `@${userName} dropped inappropriate comment. "${rmessage}"`
                },(err)=>console.log("badmsg",err))
            }
            let tempMessage ={uid: auth.currentUser.uid, 
                userName: userName,
                message: filter.clean(rmessage),
                createdAt: serverTimestamp()}
            const messageRef = collection(firestore, "livechat","Ju6NdmCCF23yOq8xSqbJ", game);
            setMessage("");
            await addDoc(messageRef,tempMessage).then(res => {
            })
        }
        fixScroll.current.scrollIntoView({block:"center", behavior: 'smooth'})
    }

    const GetCurrentUser = () => {
        const userQuery = query(collection(firestore, "users"), where("uuid", "==", auth.currentUser.uid))
        onSnapshot(userQuery, (snap) => {
            setUserName(snap.docs[0].data().userName)
        })
    }


    useEffect(()=> {
        GetCurrentUser()
    },[])

    return (
        <div className="chatbox-container">
            <form onSubmit={sendMessage} className="chat-form">
                <div className="chat-header">
                    <h3>{isHighlight ? 'All Comments': 'Live Comments'}</h3>
                </div>
                <div className="chat-body">
                    <div className="chat-body-top">
                        {!loading && chatMessages && chatMessages.map((cmt,idx) => {
                            return <ChatMessage key={idx} comment={cmt.message} userName={cmt.userName} className={auth.currentUser.uid === cmt.uid ? "current-user" : ""}/>
                        })}
                    </div>
                    
                    {/* <div ref={fixScroll}></div> */}
                    <div style={{ float:"left", clear: "both" }}
                        ref={fixScroll}>
                    </div>
                </div>
                <div className="chat-input">
                    <input onChange={(e)=>{setMessage(e.target.value)}} value={rmessage}/>
                    <div onClick={sendMessage}>
                        {/* <input hidden accept="image/*" type="file" /> */}
                        <SendIcon />
                    </div>
                </div>
            </form>
        </div>
    )
}