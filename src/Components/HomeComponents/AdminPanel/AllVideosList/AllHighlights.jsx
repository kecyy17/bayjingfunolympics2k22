import { collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { firestore } from "../../../../firebase"
import { SearchBar, VideoCardBox } from "../../../General"

import "./AllVideos.css"
export const AllHighlights = ({docPath}) => {
    const [videoData, setVideoData] = useState([])
    // const womenGamesRef = collection(firestore, `/highlights`)
    const NavigateToPage = useNavigate()
    const QueryDocs = (setData, category) => {
        const queryRef = category ? query(collection(firestore, `${docPath}`), where("category", "==", category))
                                    : query(collection(firestore, `${docPath}`))
        let vData = [];
        onSnapshot(queryRef, (snap)=> {
            snap.docs.forEach((doc)=> {
                vData.push(doc.data())
            })
            setData(vData)
        })
        
    }
    useEffect(()=>{
        QueryDocs(setVideoData, "")
    },[])

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
            setVideoData(tempData)
        }
    }

    const HandleSearch = async(e) => {
        e.preventDefault();
        // FilterDocs(e.target.value, "/highlights/men/Games", "swimming")
        FilterDocs(e.target.value, `${docPath}`, "")
    }

    const HandleEdit = (videoID) => {
        NavigateToPage(`/admin/${docPath}/update/${videoID}`)
    }

    const HandleDelete = async(videoID) => {
        const deleteVid = query(collection(firestore, "highlights"), where("videoID", "==", videoID))
        await getDocs(deleteVid).then(async(snap)=> {
            if (snap.docs.length > 0) {
                await deleteDoc(doc(firestore, "highlights", snap.docs[0].id)).then((res)=>{
                    QueryDocs(setVideoData, "")
                })
            }
        })
    }

    return (
        <div className="admin-highlight-container">
            <div className="highlight-search">
                {/* <input type={"search"} onChange={HandleSearch}/> */}
                <SearchBar placeholder={"Search Highlight Videos"} handleSearch={HandleSearch}/>
            </div>
            <div className="admin-all-highlights">
                <div className="admin-men-highlights">
                    <p>All Highlights</p>
                    <div className="admin-highlight-videos">
                        {
                            videoData && videoData.map((vDat, idx) => {
                                return <VideoCardBox key={idx}
                                    videoID={vDat.videoID}
                                    thumbnail={vDat.thumbnail}
                                    vidTitle={vDat.videoTitle}
                                    vidEvent={vDat.eventType}
                                    category={vDat.category}
                                    onEditClick={HandleEdit}
                                    onDeleteClick={HandleDelete}
                                    />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}