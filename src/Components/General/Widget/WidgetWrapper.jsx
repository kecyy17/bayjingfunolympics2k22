
import { KeyboardArrowUpOutlined } from "@mui/icons-material";
import "./WidgetWrapper.css";
export const WidgetWrapper = ({widgetData}) => {
    return (
        <div className="cst-widget">
        <div className="widget-left">
            <span className="widget-title">{widgetData.title}</span>
            <span className="widget-counter">{widgetData.liveCount}</span>
            <span className="widget-link">{widgetData.link}</span>
        </div>
        <div className="widget-right">
            <div className="widget-percentage widget-positive">
                <KeyboardArrowUpOutlined/>
               {Math.floor(Math.random(0, 10) * 10)}
            </div>
            { widgetData.icon}
        </div>
    </div>
    )
}