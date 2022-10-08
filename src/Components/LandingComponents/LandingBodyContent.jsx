import './LandingBodyContent.css';
import { CardboxWrapper, LandingScore } from '../HomeComponents';
import { collection, getDocs, limitToLast, orderBy, query } from 'firebase/firestore';
import { useEffect } from 'react';
import { firestore } from '../../firebase';
import { useState } from 'react';
import { CustomButton, CustomButtonModified, EventsMini, ReactPlayerWrapper, StandingsMini, VideoCardBox } from '../General';
import {Carousel} from '3d-react-carousal';
import { useNavigate } from 'react-router-dom';
export function LandingBodyContent() {
    const [newsData, setNewsData] = useState([])
    const [videoData, setVideoData] = useState([])
    const [liveData, setLiveData] = useState([])

    const NavigateToPage = useNavigate()
    // Query Latest News
    const QueryLatestRecord = async(setData, docPath) => {
        const queryRef = query(collection(firestore, docPath), orderBy("uploadedAt","asc"), limitToLast(4))
        let vData = [];
        await getDocs(queryRef).then((snap)=>{
            snap.docs.forEach((doc)=> {
                vData.push(doc.data())
            })
            setData(vData)
        })
    }

    useEffect(()=>{
        QueryLatestRecord(setNewsData, "news")
        QueryLatestRecord(setVideoData, "highlights")
        QueryLatestRecord(setLiveData, "lives")
    },[])

    let slides = [
        <img  src="https://api.time.com/wp-content/uploads/2021/07/time_olympics_digital_final.jpg?quality=85&w=2400" alt="" />,
        <img  src="https://www.heyalma.com/wp-content/uploads/2021/07/jewish-olympians-2021.jpg" alt="" />,
        <img  src="https://www.mensjournal.com/wp-content/uploads/2021/06/OlympicsMain.jpg?quality=40&strip=all" alt="" />,
        <img  src="https://assets.teenvogue.com/photos/60ca10f7d7f9c31f252c98d0/16:9/w_2560%2Cc_limit/GettyImages-1232776994.jpg" alt="" />  ,
        <img  src="https://i.pinimg.com/originals/c2/7d/e0/c27de021952dadd85c623e8d40996a87.jpg" alt="" />,
        <img  src="https://venngage-wordpress.s3.amazonaws.com/uploads/2016/07/blog-header.png" alt="" />,
        <img  src="https://images2.alphacoders.com/285/thumb-1920-285872.jpg" alt="" /> ,
        <img  src="https://stillmed.olympics.com/media/Images/B2B/Olympic-Games/BANNER/Olympic-Games-page-banner.jpg" alt="" /> ,
        <img  src="https://images.teamusa.org/-/media/TeamUSA/Beijing-2022/TeamUSA_Opening_020422_1440x810_Updated.png" alt="" />  ,
        <img  src="http://images.thepostgame.com/assets/public/styles/story_main/public/main-Best-Olympics-Ever-Sydney-Barcelona-LA-London-ThePostGame.jpg" alt="" />,
        <img  src="https://www.reuters.com/resizer/7FMRF_E7P7kx59l3klc4sxXSoVA=/960x0/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/ZAEZ4TBIUJN65HX3PJ76N4337A.jpg" alt="" />   ];


    const HandleNewsClick = (postID) => {
        NavigateToPage(`/news/post/${postID}`)
    }

    const HandleHighClick = (videoID) => {
        NavigateToPage(`/login`)
    }

    const HandleLiveClick = (videoID) => {
        NavigateToPage(`/login`)
    }

    return (
        <div className="body-sections">
            <section className="lan-body-home" id="home">
                <div className="body-home-container">
                    <div className="desc-body-home">
                        <div style={{height:"500px", width: "1200px"}}>
                            <Carousel slides={slides} autoplay={true} interval={2000}/>
                        </div>
                        
                        <div className="desc-text">
                            <h1>Bayjing FunOlympic Games 2K22</h1>
                            
                        </div>
                        
                        <div className="desc-btn">
                            <CustomButton text={"Login"} toPage="/login"/>
                            <CustomButton text={"Register"} toPage="/signup"/>
                        </div>
                    </div>
                </div>
            </section>

            <section className="landing-body-news" id="lives">
                <div className='landing-section-newsWrapper'>
                    <div className='landing-section-newsBrief'>
                        <h3>Live | FunOlympic Games 2K22</h3>
                        <p>Watch all the latest Live events of Bayjing FunOlympic Games 2K22</p>
                    </div>
                    <div className='landing-section-news'>
                        {
                            liveData && liveData.map((vDat, idx) => {
                                return <CardboxWrapper 
                                    videoTitle={vDat.videoTitle}
                                    eventType={vDat.eventType}
                                    thumbnail={vDat.thumbnail}
                                    category={vDat.category}
                                    channelName={vDat.channelName}
                                    key={vDat.videoID}
                                    videoID={vDat.videoID}
                                    HandleClick={HandleLiveClick}
                                    cardType={`Live`}
                                    />
                            })
                        }
                    </div>
                </div>
                <h3>For More Live Video Streaming Events</h3>
                <p className='landing-see-more'>See more</p>
            </section>


            <section className="landing-highlights" id="highlights">
            <div className=''>
                    <div className='landing-section-newsBrief'>
                        <h3>Highlights | FunOlympic Games 2K22</h3>
                        <p>Watch all the latest highlights of Bayjing FunOlympic Games 2K22</p>
                    </div>
                    <div className='landing-section-news'>
                        {
                            videoData && videoData.map((vDat, idx) => {
                                return <CardboxWrapper 
                                videoTitle={vDat.videoTitle}
                                eventType={vDat.eventType}
                                thumbnail={vDat.thumbnail}
                                category={vDat.category}
                                channelName={vDat.channelName}
                                key={vDat.videoID}
                                videoID={vDat.videoID}
                                HandleClick={HandleHighClick}
                                cardType={`Highlight`}
                                    />
                            })
                        }
                    </div>
                </div>
                <h3>To Watch More Highlight Videos </h3>
                <p className='landing-see-more'>See more</p>
            </section>



            <section className="landing-body-news" id="news">
                <div className='landing-section-newsWrapper'>
                    <div className='landing-section-newsBrief'>
                        <h3>News | FunOlympic Games 2K22</h3>
                        <p>Read all the news of Bayjing FunOlympic Games 2K22</p>
                    </div>
                    <div className='landing-section-news'>
                        {
                            newsData && newsData.map((nDat, idx) => {
                                return <CardboxWrapper 
                                    videoTitle={nDat.newsTitle}
                                    eventType={nDat.eventType}
                                    thumbnail={nDat.thumbnail}
                                    category={nDat.category}
                                    channelName={nDat.channelName}
                                    key={nDat.postID}
                                    videoID={nDat.postID}
                                    HandleClick={HandleNewsClick}
                                    cardType={`News`}
                                    />
                            })
                        }
                    </div>
                </div>
                <h3>For More News Information regarding to FunOlympic</h3>
                <p className='landing-see-more'>See more</p>
            </section>
        </div>
    )
}