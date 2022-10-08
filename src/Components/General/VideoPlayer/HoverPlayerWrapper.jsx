
import "./ReactPlayerWrapper.css"
export const HoverPlayerWrapper = ({videoSrc}) => {
    return (
        <div className="hover-vid-wrapper">
            <video
                src={videoSrc} 
                // preload="none"
                />
        </div>
    )
}