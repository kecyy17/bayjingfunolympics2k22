
import "./ProgressBar.css"
export const ProgressBar = ({percentage, isUpdated}) => {
    return (
        <div className="progress-bar-wrapper">
            <div className="progress-bar-container">
                <div className="progress-bar" style={{width: `${percentage}%`}}></div>
            </div>
            <div className="">
                {
                    percentage && percentage === 100 ? <p>{isUpdated? 'Updated': 'Completed'}</p> : 
                    percentage ? <p>{`Uploading... ${percentage}%`}</p> : ""
                }
            </div>
        </div>
    )
}