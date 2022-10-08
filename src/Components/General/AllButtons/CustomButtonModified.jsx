
import "./CustomButton.css"
export const CustomButtonModified = ({btnLabel, onBtnClick, btnType, className, delID}) => {
    return(
        <div className={`custom-modified-buttonContainer`}>
            <button className={`custom-modified-button ${className}`} onClick={()=> 
                    onBtnClick && delID ? 
                        onBtnClick(delID): 
                        onBtnClick ? onBtnClick():""} 
                    
                    type={btnType}>{btnLabel}</button>
        </div>
    )
}