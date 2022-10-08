
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { firestore } from "../../../firebase"
import { SearchBar } from "../../General"

import { v4 as uuid} from "uuid"
import "../LiveGames/LiveGames.css"
import { useNavigate } from "react-router-dom"
import { CardboxWrapper } from "../CardboxWrapper"
export const HighlightHome = () => {
    const NavigateToPage = useNavigate()
    const [liveVideoData, setHighlightVideoData] = useState()
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
            setHighlightVideoData(tempData)
        }
    }

    const HandleSearch = async(e) => {
        e.preventDefault();
        // FilterDocs(e.target.value, "/highlights/men/Games", "swimming")
        FilterDocs(e.target.value, "/highlights", "")
    }

    const HandleCardClick = (videoID) => {
        NavigateToPage(`/highlights/watch/${videoID}`)

    }

    useEffect(()=>{
        QueryDocs(setHighlightVideoData, "none")
    },[])

    return (
        <div className="live-main">
            <div className="live-header">
                <SearchBar placeholder={"Search Highlight"} handleSearch={HandleSearch}/>
            </div>
            <div className="live-main-wrapper">
                {
                    liveVideoData && liveVideoData.map((vDat, idx) => {
                            return <div className="b-cardbox" key={idx}> 
                                        <CardboxWrapper 
                                            videoTitle={vDat.videoTitle}
                                            eventType={vDat.eventType}
                                            thumbnail={vDat.thumbnail}
                                            category={vDat.category}
                                            channelName={vDat.channelName}
                                            key={vDat.videoID}
                                            videoID={vDat.videoID}
                                            HandleClick={HandleCardClick}
                                            cardType={`Highlight`}
                                        />
                                    </div>
                        })
                }
            </div>
        </div>
    )
}