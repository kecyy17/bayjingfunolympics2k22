import { Link } from "react-router-dom"
import "./EventsMini.css"
export const EventsMini = ({EventTitle, events, path}) => {
    return (
        <div className="event-mini-wrapper">
            <h3 className="event-title">{EventTitle}</h3>
            {
                events ? events.map((val, idx)=> {
                    return <div key={idx} className="event-mini-items">
                                <p key={idx}>{val.eventTitle} | {val.game}</p>
                                {val.hasOwnProperty('date')? <p className="event-date">{val.date}</p>:""}
                            </div>
                        
                }):""
            }
            <Link to={path}>See More</Link>
            
        </div>
    )
}