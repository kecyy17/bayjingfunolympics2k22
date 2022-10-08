import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "./RectCardBox.css"
import { PlayCircleOutlined } from '@mui/icons-material';
export const VideoCardBox = ({thumbnail, vidTitle, newsDesc, vidEvent, category, onEditClick, onDeleteClick, videoID, isLanding, isVideo}) => {
    const trimLongString = (longStr, len) => {
        if (longStr && longStr.length > len) {
            return longStr.substring(0, len) + "..."
        }
        return longStr
    }
    return (
        <div className="video-cardbox-wrapper">
            <div className="video-cardbox">
                <div className="thumbnail-wrapper">
                    <img src={thumbnail}></img>
                    {
                        isVideo ? 
                            <div className='vid-card-overlay'>
                                <PlayCircleOutlined sx={{width: 100, height: 100, color:"#e4dcdce5"}}/>
                            </div>
                            : ""
                    }
                </div>
                <div className="video-highlight-desc">
                    <h3>{trimLongString(vidTitle, 40)}</h3>
                    <p className='vid-event-para'>{`${trimLongString(vidEvent, 30)} | ${category}`}</p>
                    {
                        isLanding == undefined ?
                            <div className='video-edit-wrapper'>
                                <div className="video-edit">
                                    <div onClick={()=>onEditClick(videoID)}>
                                        <EditIcon className='video-icon'/>
                                    </div>
                                    <div onClick={()=> onDeleteClick(videoID)}>
                                        <DeleteIcon className='video-icon'/>
                                    </div>
                                </div>
                            </div>
                            : <p className='landing-section-newsDesc'>{newsDesc ? trimLongString(newsDesc, 55) : ""}</p>
                    }
                </div>
            </div>
        </div>
    )
}