import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { FunVideoPlayer } from '../../General';
import "./CardboxWrapper.css"
export const CardboxWrapperMini = ({watchType, isVideo, videoTitle, eventType, category, thumbnail, videoID, HandleClick, channelName, cardType}) => {
    return (
        <div className="cardbox-wrapper-mini" onClick={()=>HandleClick(videoID, cardType)}>
            <div className="b-cardbox-mini">
                <div className="card-header">
                    <div className='channel-logo-mini'>
                        {
                            cardType === "Highlights" || cardType === "News" ? ""
                            :
                            <img src={`https://firebasestorage.googleapis.com/v0/b/bayjingfunolympics2k22.appspot.com/o/channels%2F${channelName}.svg?alt=media&token=cc6a48b0-e526-42a4-aee5-427c449c9695`}/>
                        }
                        
                    </div>
                    <div className={cardType === "Highlights" || cardType === "News" ? 'card-header-highlight' : 'card-header-live'}>
                        <PlayArrowIcon />
                        <p>{cardType}</p>
                    </div>
                </div>
                <div className="card-mid-mini">
                    {
                        isVideo ? 
                        <video className='card-vid-height' src={`https://firebasestorage.googleapis.com/v0/b/bayjingfunolympics2k22.appspot.com/o/files%2Fjohn_sherchan%20.mp4?alt=media&token=3c7f6f3d-9715-46f9-9bd9-0edb99c0d1a0`} 
                                // width="100%"
                                // height="100%"
                            />
                        :
                        <div className='card-mid-fix-mini'>
                                <img src={thumbnail} ></img>
                                <div className='card-overlay-mini'> </div>
                        </div>
                        
                    }
                </div>
                <div className="card-bottom-mini" >
                    <div className="game-fixture-date">
                        {/* <p>Feb 21</p> */}
                    </div>
                    <div className="live-game-title-mini">
                        <p>{videoTitle}</p>
                    </div>
                    <div className="card-brief-mini">    
                        <p>{eventType}</p>
                        <p>{` | `}</p>
                        <p>{category}</p>
                    </div>
                </div>
                
            </div>
        </div>
    )
}