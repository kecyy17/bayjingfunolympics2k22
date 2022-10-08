
import { CustomButtonModified } from "../../../General";
import "./DeleteContent.css"
export const DeleteContent = ({cancelBtnClick, deleteBtnClick, deleteID}) => {

    const disableBubbling = (e) => {
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();  
    }
    return (
        <div className="delete-content" onClick={disableBubbling}>
            <div className="delete-box">
                <h3>Are you sure you want to delete?</h3>
                <p>If you delete the content, you can't recover it</p>
                <div className="delete-button">
                    <CustomButtonModified btnLabel={`Cancel`} 
                        className={`small-button`} 
                        onBtnClick={cancelBtnClick}/>

                    <CustomButtonModified btnLabel={`Delete`} 
                        className={`negative-button small-button`} 
                        onBtnClick={deleteBtnClick}
                        delID={deleteID}
                        />
                </div>
            </div>
        </div>
    )
}