import { BroadcastOnHomeOutlined, CalendarTodayOutlined, CollectionsOutlined, DashboardRounded, DriveFolderUploadOutlined, EventNoteOutlined, FeedOutlined, GridViewOutlined, GroupAddOutlined, GroupOutlined, LiveTvOutlined, LogoutOutlined, ManageAccountsOutlined, SmartDisplayOutlined, VerifiedUserOutlined, VideoLibraryOutlined } from "@mui/icons-material"
import { CustomLink } from "../CustomLink"

import "./Sidebar.css"

export const Sidebar = () => {
    return(
        <div className="fun_adminSidebarContainer">
            <div className="admin-sidebar">
                <ul className="cst-ul">
                    <p className='admin-sidebar-title'>Main</p>
                    <CustomLink to="/admin-panel/dashboard">
                        <GridViewOutlined className='icon'/>
                        <span>Dashboard</span>
                    </CustomLink>
                    <CustomLink to="/admin-panel/users">
                        <GroupAddOutlined className='icon'/>
                        <span>User List</span>
                    </CustomLink>

                    <p className='admin-sidebar-title'>Upload</p>

                    <CustomLink to="/admin-panel/live">
                        <BroadcastOnHomeOutlined className='icon'/>
                        <span>Lives</span>
                    </CustomLink>

                    <CustomLink to="/admin-panel/highlights">
                        <VideoLibraryOutlined className='icon'/>
                        <span>Highlights</span>
                    </CustomLink>

                    <CustomLink to="/admin-panel/news">
                        <FeedOutlined className='icon'/>
                        <span>News</span>
                    </CustomLink>

                    <CustomLink to="/admin-panel/fixture">
                        <CalendarTodayOutlined className='icon'/>
                        <span>Fixtures</span>
                    </CustomLink>

                </ul>
            </div>
        </div>
    )
}