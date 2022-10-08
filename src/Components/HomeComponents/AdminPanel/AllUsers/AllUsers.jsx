
import { PersonOutlined } from "@mui/icons-material"
import { RestrictedAdminContext } from "../../../../AllContext"
import { WidgetWrapper } from "../../../General"
import CustomStyledDataGrid from "../../../General/DataGrid/CustomStyledDataGrid"

import "./AllUsers.css"
export const AllUsers = () => {
    const {usersData} = RestrictedAdminContext()
    const {liveCount} = RestrictedAdminContext()
    const {totalUserCount} = RestrictedAdminContext()
    const {bannedCount} = RestrictedAdminContext()
    const {newUserCount} = RestrictedAdminContext()
    const GenerateWidgetData = (xTitle, xLiveCount, xLink, Icon) => {
        return {
            title: xTitle,
            liveCount: xLiveCount,
            link: xLink,
            icon:(<Icon className='widget-icon' style = {{color: 'crimson', backgroundColor: 'rgba(218,165,32,0.2)'}}/>)
        }
    }
    return (
        <div className="user-main-container">
            <div className="user-upper-section">
                <WidgetWrapper widgetData={GenerateWidgetData("Total Users", totalUserCount, "See all users", PersonOutlined)} />
                <WidgetWrapper widgetData={GenerateWidgetData("Live Users", liveCount, "See all users", PersonOutlined )} />
                <WidgetWrapper widgetData={GenerateWidgetData("Blocked Users", bannedCount, "See all users", PersonOutlined)} />
            </div>
            <div className="user-lower-section">
                { usersData ? <CustomStyledDataGrid usersData={usersData}/> : "Loading..." }
            </div>
        </div>
    )
}