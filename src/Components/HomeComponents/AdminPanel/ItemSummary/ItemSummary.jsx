
import "./ItemSummary.css"

export const ItemSummary = ({CustomIcon, summaryTitle, summaryResult}) => {
    return (
        <div className="summary-item">
            <div className="summery-item-title">{summaryTitle}</div>
            <div className="summary-item-result summary-positive">
                <CustomIcon fontSize='small'/>
                <div className="resultAmount">{summaryResult}</div>
            </div>
        </div>
    )
}