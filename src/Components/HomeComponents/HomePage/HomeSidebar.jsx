
import { EventsMini, StandingsMini } from "../../General"

import "./HomePage.css"
export const HomeSidebar = () => {

    const upcomingEvents = [
        {eventTitle: "Brazil vs Spain | Gold Match", game: "Football", date: '10/9/2022'},
        {eventTitle: "Brazil vs Australia | Silver Match", game: "Football", date: '10/15/2022'},
        {eventTitle: "USA vs England | Gold Match", game: "Basketball", date: '10/17/2022'}
    ]

    const liveEvents = [
        {eventTitle: "Cycling Track Women's Finals", game: "Cycling"},
        {eventTitle: "Great Britain vs Chile Gold Medal", game: "Football"},
        {eventTitle: "Women's Javelin Throw Finals", game: "Javelin"},
        {eventTitle: "Women's 4x100m Sprint Finals", game: "Sprinting"}
    ]

    return (
        <div className="home-sidebar-wrapper">
            <div className="home-sidebar-upcoming-event card-items-wrapper">
                <EventsMini EventTitle={"Upcoming Events"} events={upcomingEvents} path={`/fixtures`}/>
            </div>
            <div className="home-sidebar-live-event card-items-wrapper">
                <EventsMini EventTitle={"Live Events"} events={liveEvents} path={`/livegames`}/>
            </div>
            <div className="home-sidebar-standings card-items-wrapper">
                <StandingsMini />
            </div>
        </div>
    )
}