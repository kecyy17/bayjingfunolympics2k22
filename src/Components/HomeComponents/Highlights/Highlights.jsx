
import { IconButton } from "@mui/material"
import { ReactPlayerWrapper, RectCardBox, SearchBar, SharePopup } from "../../General"
import { ChatBox, FunChatBox } from "../ChatBox"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import "./Highlights.css"
import ShareIcon from '@mui/icons-material/Share';
import { ThumbDown, ThumbDownAlt, ThumbDownOffAlt, ThumbUpOffAlt } from "@mui/icons-material";
import { useEffect } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, limitToLast, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import { useState } from "react";
import { auth, firestore } from "../../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from "react-share";
import { async } from "@firebase/util";
export const Highlights = () => {
    const [highlightData, setHighlightData] = useState()
    const [singleHighlightData, setSingleHighlightData] = useState()
    const [showShare, setShowShare] = useState(false)
    const [totalLike, setTotalLike] = useState(0)
    const [hasLiked, setHasLiked] = useState(false)
    const [totalDisLike, setTotalDislike] = useState(0)
    const [hasDisliked, setHasDisliked] = useState(false)
    const NavigateToPage = useNavigate()
    const {postID} = useParams()

    // query all highlight video
    const QueryDocs = (setData, category) => {
        const queryRef = category == "none" ? query(collection(firestore, `/highlights`)) : query(collection(firestore, `/highlights`), where("category", "==", category))
        let vData = [];
        onSnapshot(queryRef, (snap)=> {
            snap.docs.forEach((doc)=> {
                vData.push(doc.data())
            })
            setData(vData)
        })
        
    }

    // Query Latest video
    const QueryLatestVideo = async(setData, category) => {
        const queryRef = category == "none" ? query(collection(firestore, `/highlights`), orderBy("uploadedAt","asc"), limitToLast(1)) : query(collection(firestore, `/highlights`), where("category", "==", category))
        await getDocs(queryRef).then((snap)=>{
            setData(snap.docs[0].data())
        })
    }

    // query video by id
    const QueryByPostID = (setData, postID) => {
        const queryRef =  query(collection(firestore, `/highlights`), where("videoID", "==", postID))
        onSnapshot(queryRef, (snap)=> {
            setData(snap.docs[0].data())
        })
    }


        
    const UserHasLiked = async(vidID) => {
        const likerRef = query(collection(firestore, "likers"), where("uid", "==", auth.currentUser.uid),where("vidID", "==", vidID))
        await getDocs(likerRef).then(async(snap)=> {
            if (snap.docs.length <= 0) {
                setHasLiked(false)
            }else {
                setHasLiked(true)
            }
        })
    }

    const UserHasDisliked = async(vidID) => {
        const likerRef = query(collection(firestore, "dislikers"), where("uid", "==", auth.currentUser.uid),where("vidID", "==", vidID))
        await getDocs(likerRef).then(async(snap)=> {
            if (snap.docs.length <= 0) {
                setHasDisliked(false)
            }else {
                setHasDisliked(true)
            }
        })
    }

    const CalcTotalLike = async(vidID) => {
        const likeRef = query(collection(firestore, "highlights"), where("videoID", "==", vidID));
        await getDocs(likeRef).then(async(snap)=> {
            setTotalLike(snap.docs[0].data().likeCount)
        })
    }

    const CalcTotalDisLike = async(vidID) => {
        const likeRef = query(collection(firestore, "highlights"), where("videoID", "==", vidID));
        await getDocs(likeRef).then(async(snap)=> {
            setTotalDislike(snap.docs[0].data().dislikeCount)
        })
    }

    const FunUpdateLikes = async(vidID) => {
        const likeRef = query(collection(firestore, "highlights"), where("videoID", "==", vidID));
        const likerRef = query(collection(firestore, "likers"), where("uid", "==", auth.currentUser.uid),where("vidID", "==", vidID))
        const dislikerRef = query(collection(firestore, "dislikers"), where("uid", "==", auth.currentUser.uid),where("vidID", "==", vidID))
        if (!hasLiked) {
            setHasLiked(true)
            await getDocs(likeRef).then(async(snap)=> {
                if (snap.docs.length <= 0) {
                    return
                }
                let tempLikeCount = snap.docs[0].data().likeCount + 1;
                let tempDislikeCount = snap.docs[0].data().dislikeCount;
                if (tempDislikeCount <= 0) {
                    tempDislikeCount = 0
                }else {
                    if (hasDisliked) {
                        tempDislikeCount -= 1;
                        await getDocs(dislikerRef).then(async(snap)=> {
                            await deleteDoc(doc(firestore, `dislikers`, snap.docs[0].id)).then(async(res)=>{
                                await getDocs(likeRef).then(async(snap)=>{
                                    setTotalDislike(snap.docs[0].data().dislikeCount)
                                    setHasDisliked(false)
                                })
                            })
                        })
                    }
                }
                await updateDoc(doc(firestore, "highlights", snap.docs[0].id), {"likeCount": tempLikeCount, "dislikeCount": tempDislikeCount}).then(async(res)=>{
                    await getDocs(likerRef).then(async(snap)=> {
                        if (snap.docs.length <= 0) {
                            await addDoc(collection(firestore, `likers`), {
                                "vidID": vidID,
                                "uid": auth.currentUser.uid
                            }).then(async(res)=>{
                                await getDocs(likeRef).then(async(snap)=>{
                                    setTotalLike(snap.docs[0].data().likeCount)
                                    setTotalDislike(snap.docs[0].data().dislikeCount)
                                    setHasDisliked(false)
                                    setHasLiked(true)
                                })
                            })
                        }else {
                            await getDocs(likeRef).then(async(snap)=>{
                                setTotalLike(snap.docs[0].data().likeCount)
                            })
                        }
                    })
                })
            })
        } 
    }

    const FunUpdateDislikes = async(vidID) => {
        const likeRef = query(collection(firestore, "highlights"), where("videoID", "==", vidID));
        const likerRef = query(collection(firestore, "likers"), where("uid", "==", auth.currentUser.uid),where("vidID", "==", vidID))
        const dislikerRef = query(collection(firestore, "dislikers"), where("uid", "==", auth.currentUser.uid),where("vidID", "==", vidID))
        if (!hasDisliked) {
            await getDocs(likeRef).then(async(snap)=> {
                if (snap.docs.length <= 0) {
                    return
                }
                let tempLikeCount = snap.docs[0].data().likeCount;
                let tempDislikeCount = snap.docs[0].data().dislikeCount + 1;
                if (tempLikeCount <= 0) {
                    tempLikeCount = 0
                }else {
                    if (hasLiked) {
                        tempLikeCount -= 1;
                        await getDocs(likerRef).then(async(snap)=> {
                            await deleteDoc(doc(firestore, `likers`, snap.docs[0].id)).then(async(res)=>{
                                await getDocs(likeRef).then(async(snap)=>{
                                    setTotalLike(snap.docs[0].data().likeCount)
                                    setHasLiked(false)
                                })
                            })
                        })
                    }
                }
                await updateDoc(doc(firestore, "highlights", snap.docs[0].id), {"likeCount": tempLikeCount, "dislikeCount": tempDislikeCount}).then(async(res)=>{
                    await getDocs(dislikerRef).then(async(snap)=> {
                        if (snap.docs.length <= 0) {
                            await addDoc(collection(firestore, `dislikers`), {
                                "vidID": vidID,
                                "uid": auth.currentUser.uid
                            }).then(async(res)=>{
                                await getDocs(likeRef).then(async(snap)=>{
                                    setTotalLike(snap.docs[0].data().likeCount)
                                    setTotalDislike(snap.docs[0].data().dislikeCount)
                                    setHasLiked(false)
                                    setHasDisliked(true)
                                })
                            })
                        }else {
                            await getDocs(likeRef).then(async(snap)=>{
                                setTotalLike(snap.docs[0].data().likeCount)
                            })
                        }
                    })
                })
            })
        } 
    }


    useEffect(()=>{
        if(postID) {
            QueryByPostID(setSingleHighlightData, postID)
            UserHasLiked(postID)
            CalcTotalLike(postID)
            UserHasDisliked(postID)
            CalcTotalDisLike(postID)
        } else {
            QueryLatestVideo(setSingleHighlightData, "none")
        }
        QueryDocs(setHighlightData, "none")
    },[postID])

    const FilterDocs = async(keywords, documentPath, eventType) => {
        const q = eventType ? query(collection(firestore, documentPath), where("eventType", "==", eventType)) : query(collection(firestore, documentPath))
        // const q = query(collection(firestore, documentPath))
        const snapQuery = await getDocs(q);
        let fireDocuments = []
        let tempData = []
        snapQuery.forEach((doc) => {
            fireDocuments.push(doc.data())
        })
        if(fireDocuments.length > 0) {
            tempData = fireDocuments.filter((doc)=>{
                if (keywords === "") {
                    return []
                } else {
                    return doc.videoTitle.toLowerCase().includes(keywords)
                }
            })
            setHighlightData(tempData)
        }
    }

    const HandleSearch = async(e) => {
        e.preventDefault();
        // FilterDocs(e.target.value, "/highlights/men/Games", "swimming")
        FilterDocs(e.target.value, "/highlights", "")
    }

    const HandlePostClick = (postID) => {
        NavigateToPage(`/highlights/watch/${postID}`)
    }


    return (
        <div className="highlight-main">
            <div className="highlight-main-wrapper">
                <div className="highlight-live-watch">
                    <ReactPlayerWrapper width="100%" height="100%" url={singleHighlightData && singleHighlightData.videoURL? singleHighlightData.videoURL: ``} control={true} isPlayable={true}/>
                    <div className="video-desc">
                        <div className="video-desc-head">
                            <h2> {singleHighlightData && singleHighlightData.videoTitle ? singleHighlightData.videoTitle: ""} </h2>
                            <div className="video-status">
                                <div className="video-views">

                                </div>
                                <div className="video-buttons">
                                    <div className="mini-buttons">
                                        {
                                            hasLiked ? 
                                                <IconButton color="primary" onClick={()=> FunUpdateLikes(postID)}>
                                                    <ThumbUpIcon />
                                                </IconButton>
                                                :
                                                <IconButton color="primary" onClick={()=> FunUpdateLikes(postID)}>
                                                    <ThumbUpOffAlt />
                                                </IconButton>
                                        }
                                        <p>{totalLike}</p>
                                    </div>
                                    <div className="mini-buttons">
                                        {
                                            hasDisliked ? 
                                                <IconButton color="primary">
                                                    <ThumbDown />
                                                </IconButton>
                                                :
                                                <IconButton color="primary" onClick={()=> FunUpdateDislikes(postID)}>
                                                    <ThumbDownOffAlt />
                                                </IconButton>
                                        }
                                        <p>{totalDisLike}</p>
                                    </div>
                                    <div className="mini-buttons">
                                        
                                        <div className="share-buttons" onClick={()=> setShowShare(!showShare)}>
                                            {
                                                showShare ? 
                                                    <SharePopup /> : ""
                                            }
                                            
                                            <ShareIcon />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="highlight-video-details">
                        {
                            singleHighlightData && singleHighlightData.videoDesc ? <p>{singleHighlightData.videoDesc}</p>: 
                                <p></p>
                        }
                        
                    </div>
                </div>
                <div className="live-chatbox">
                    <ChatBox isHighlight={true} game={singleHighlightData && singleHighlightData.eventType ? singleHighlightData.eventType: "football"}/>
                </div>
            </div>
        </div>
    )
}