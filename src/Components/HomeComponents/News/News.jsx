
import { IconButton } from "@mui/material"
import { FunLandscapeCardBox, RectCardBox, SearchBar, SharePopup } from "../../General"
import { FunChatBox } from "../ChatBox"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import "./News.css"
import ShareIcon from '@mui/icons-material/Share';
import { ThumbDownAlt, ThumbDownOffAlt, ThumbUpOffAlt } from "@mui/icons-material";
import { useEffect } from "react";
import { collection, getDocs, limitToLast, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useState } from "react";
import { firestore } from "../../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from "react-share";
export const News = () => {
    const [newsData, setNewsData] = useState()
    const [singleNewsData, setSingleNewsData] = useState()
    const [showShare, setShowShare] = useState(false)
    const NavigateToPage = useNavigate()
    const {postID} = useParams()
    const QueryDocs = (setData, category) => {
        const queryRef = category == "none" ? query(collection(firestore, `/news`)) : query(collection(firestore, `/highlights`), where("category", "==", category))
        let nData = [];
        onSnapshot(queryRef, (snap)=> {
            snap.docs.forEach((doc)=> {
                nData.push(doc.data())
            })
            setData(nData)
        })
        
    }

    // Query news by news post id
    const QueryByPostID = (setData, postID) => {
        const queryRef =  query(collection(firestore, `/news`), where("postID", "==", postID))
        onSnapshot(queryRef, (snap)=> {
            setData(snap.docs[0].data())
        })
    }

     // Query Latest News
    const QueryLatestNews = async(setData, category) => {
        const queryRef = category == "none" ? query(collection(firestore, `/news`), orderBy("uploadedAt","asc"), limitToLast(1)) : query(collection(firestore, `/news`), where("category", "==", category))
        await getDocs(queryRef).then((snap)=>{
            setData(snap.docs[0].data())
            // console.log("snap", snap)
        })
    }

    useEffect(()=>{
        if(postID) {
            QueryByPostID(setSingleNewsData, postID)
        }else {
            QueryLatestNews(setSingleNewsData, "none")
        }
        QueryDocs(setNewsData, "none")
    },[postID])

    // filter news by keyword typed in search bar
    const FilterDocs = async(keywords, documentPath, eventType) => {
        const q = eventType ? query(collection(firestore, documentPath), where("eventType", "==", eventType)) : query(collection(firestore, documentPath))
        // const q = query(collection(firestore, documentPath))
        const snapQuery = await getDocs(q);
        let fireDocuments = []
        let tempData = []
        snapQuery.forEach((doc) => {
            console.log("docs", doc.data())
            fireDocuments.push(doc.data())
        })
        if(fireDocuments.length > 0) {
            tempData = fireDocuments.filter((doc)=>{
                if (keywords === "") {
                    return []
                } else {
                    return doc.newsTitle.toLowerCase().includes(keywords)
                }
            })
            setNewsData(tempData)
        }
    }

    // handle search
    const HandleSearch = async(e) => {
        e.preventDefault();
        // FilterDocs(e.target.value, "/highlights/men/Games", "swimming")
        FilterDocs(e.target.value, "/news", "")
    }

    const HandlePostClick = (postID) => {
        NavigateToPage(`/news/post/${postID}`)
    }


    return (
        <div className="highlight-main">
            <div className="highlight-main-wrapper">
                <div className="highlight-live-watch">
                    {/* <FunVideoPlayer width="100%" height="100%" url={singleNewsData && singleNewsData.videoURL? singleNewsData.videoURL: `https://www.youtube.com/watch?v=jzJW0gTYB9k`}/> */}
                    
                    <div className="video-desc">
                        <div className="video-desc-head">
                            <h2> {singleNewsData && singleNewsData.newsTitle ? singleNewsData.newsTitle: ""} </h2>
                            <div className="news-promo">
                               <img src={
                                    singleNewsData && singleNewsData.thumbnail ? singleNewsData.thumbnail:
                                        ""
                                }></img>
                            </div>
                            
                            <div className="video-status">
                                <div className="video-views">
                                    <p>{`Author: ${singleNewsData && singleNewsData.authorName ? singleNewsData.authorName: ""}`}</p>
                                </div>
                                <div className="video-buttons">
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
                    <div className="highlight-news-details">
                        {
                            singleNewsData && singleNewsData.newsDesc ? singleNewsData.newsDesc: 
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu non odio. Eu nisl nunc mi ipsum faucibus vitae aliquet. Dui id ornare arcu odio ut sem nulla pharetra diam. Donec ac odio tempor orci. Neque convallis a cras semper auctor neque vitae tempus. Urna molestie at elementum eu facilisis sed. Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Amet justo donec enim diam. Interdum posuere lorem ipsum dolor sit amet consectetur. Maecenas volutpat blandit aliquam etiam erat velit. Id porta nibh venenatis cras sed felis eget velit aliquet. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Luctus accumsan tortor posuere ac ut consequat semper.</p>
                        }
                        <p> The history of the Olympic Games is full of dramatic, emotional and beautiful moments that took place in finals. Every week, relive the most incredible finals you can remember on video. This week, the men's 100m won by the Jamaican legend. 
                            It was decided that Bolt would focus on the 100m however, the Beijing 2008 Games were fast approaching. He started to put in some serious gym work and filled out his huge frame with hard graft and a special diet regime. The results were extraordinary.
                            In 2008 in Jamaica, Bolt went under the 10 second mark for the first time - a giant leap which put him right up with the best in the world.
                            Later that month in New York, Bolt raced against the world record holder, Tyson Gay. Bolt won in a new world record time of 9.72 seconds. It was only Bolt’s fifth competitive 100m race.
                            From nowhere, he burst onto the scene and become the most exciting sprinter in the world.
                            As the new 100m world record holder, he was the favourite to win the 100m at Beijing 2008.
                            On the day of the final there was a lot of expectation. His performance didn't disappoint; in fact, it left everyone speechless.
                            In an incredible race, in which the Jamaican devastated his rivals, he also broke new ground, winning in 9.69s, a new world record, well ahead of silver medalist Richard Thompson (9.89).
                            Not only was the record set without a favorable wind but the big Jamaican toyed with the camera at the finishing line, ran with an untied shoelace and celebrated before he had actually won.
                        </p>
                    </div>
                </div>
                <div className="highlight-video-box">
                    <SearchBar placeholder={"Search News"} handleSearch={HandleSearch}/>
                    <div className="highlight-list">
                        {
                        newsData && newsData.map((nDat, idx) => {
                                return <RectCardBox key={idx}
                                    imageURL={nDat.thumbnail}
                                    title={nDat.newsTitle}
                                    category={nDat.category}
                                    description={nDat.newsDesc}
                                    HandleClick={HandlePostClick}
                                    postID = {nDat.postID}
                                    />
                            })
                        }
                    </div>
                    
                </div>
            </div>
        </div>
    )
}