import "./RectCardBox.css"
export const RectCardBox = ({title, description, category, videoURL, imageURL,isVideo, postID,  HandleClick}) => {
    const trimLongString = (longStr, len) => {
        if (longStr.length > len) {
            return longStr.substring(0, len) + "..."
        }
        return longStr
    }

    return (
        <div className="rect-cardbox-wrapper">
            <div className="react-cardbox" onClick={()=> HandleClick(postID)}>
                <div className="left-image-wrapper">
                    <img src={imageURL}/>
                    {
                        // videoURL ? <HoverVideoPlayer videoSrc={videoURL} /> : <img src={imageURL}/>
                    }
                </div>
                <div className="left-brief">
                    <div className="left-title-wrapper">
                        <h3> {trimLongString(title, 20)} </h3>
                        <p> {category} </p>
                    </div>
                    <p> {trimLongString(description, 95)}</p>
                </div>
            </div>
        </div>
    )
}