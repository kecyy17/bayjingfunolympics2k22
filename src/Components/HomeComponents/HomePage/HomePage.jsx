import { collection, getDocs, limitToLast, orderBy, query, where } from "firebase/firestore"
import { useEffect } from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { firestore } from "../../../firebase"
import { CardboxWrapper, CardboxWrapperMini } from "../CardboxWrapper"
import "./HomePage.css"
import { HomeSidebar } from "./HomeSidebar"
export const HomePage = () => {

    const NavigateToPage = useNavigate()
    const [liveVideoData, setLiveVideoData] = useState()
    const [highlightData, setHighlightData] = useState()
    const [newsData, setNewsData] = useState()
 
    const QueryDocs = async (setData, docPath) => {
        const queryRef = query(collection(firestore, docPath), orderBy("uploadedAt", "desc"), limitToLast(4))
        let vData = [];
        await getDocs(queryRef).then((snap)=> {
            snap.docs.forEach((doc)=> {
                vData.push(doc.data())
            })
        })
        setData(vData)
    }

    const HandleCardClick = (videoID, path) => {
        if(path.toLowerCase() === "news") {
            NavigateToPage(`/${path.toLowerCase()}/post/${videoID}`)
        }else {
            NavigateToPage(`/${path.toLowerCase()}/watch/${videoID}`)
        }
    }

    useEffect(()=> {
        QueryDocs(setLiveVideoData, `/lives`)
        QueryDocs(setHighlightData, `/highlights`)
        QueryDocs(setNewsData, `/news`)
    },[])

    return (
        <div className="home-page-wrapper">
            <div className="home-page-sidebar">
                <HomeSidebar />
            </div>
            <div className="home-page-contents">
                <div className="content-wrapper">
                    <div className="content-brief">
                        <p>Live</p>
                        <Link to={`/livegames`}>See More</Link>
                    </div>
                    <div className="home-page-data">
                    {
                        liveVideoData && liveVideoData.map((vDat, idx) => {
                                return <div className="b-cardbox-mini" key={idx}> 
                                            <CardboxWrapperMini 
                                                videoTitle={vDat.videoTitle}
                                                eventType={vDat.eventType}
                                                thumbnail={vDat.thumbnail}
                                                category={vDat.category}
                                                channelName={vDat.channelName}
                                                key={vDat.videoID}
                                                videoID={vDat.videoID}
                                                HandleClick={HandleCardClick}
                                                cardType={`Live`}
                                            />
                                        </div>
                            })
                    }
                    </div>
                </div>
                <div className="content-wrapper">
                    <div className="content-brief">
                        <p>Highlights</p>
                        <Link to={`/highlights`}>See More</Link>
                    </div>
                    <div className="home-page-data">
                    {
                        highlightData && highlightData.map((vDat, idx) => {
                                return <div className="b-cardbox-mini" key={idx}> 
                                            <CardboxWrapperMini 
                                                videoTitle={vDat.videoTitle}
                                                eventType={vDat.eventType}
                                                thumbnail={vDat.thumbnail}
                                                category={vDat.category}
                                                channelName={vDat.channelName}
                                                key={vDat.videoID}
                                                videoID={vDat.videoID}
                                                HandleClick={HandleCardClick}
                                                cardType={`Highlights`}
                                            />
                                        </div>
                            })
                    }
                    </div>
                </div>
                <div className="content-wrapper">
                    <div className="content-brief">
                        <p>News</p>
                        <Link to={`/news`}>See More</Link>
                    </div>
                    <div className="home-page-data">
                    {
                        newsData && newsData.map((vDat, idx) => {
                                return <div className="b-cardbox-mini" key={idx}> 
                                            <CardboxWrapperMini 
                                                videoTitle={vDat.newsTitle}
                                                eventType={vDat.eventType}
                                                thumbnail={vDat.thumbnail}
                                                category={vDat.category}
                                                key={vDat.postID}
                                                videoID={vDat.postID}
                                                HandleClick={HandleCardClick}
                                                cardType={`News`}
                                            />
                                        </div>
                            })
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}