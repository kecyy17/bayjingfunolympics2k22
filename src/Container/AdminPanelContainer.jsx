import { Sidebar, AdminNavigation } from "../Components"
import { RestrictedContextProvider } from "../AllContext"
import "./AdminPanelContainer.css"
import Logo from "../assets/images/logo.svg"
export const AdminPanelContainer = ({component}) => {
    return (
        <RestrictedContextProvider>
            <div className="admin-container">
                <div className="admin-panel-sidebar">
                    <div className="admin-panel-logo">
                        <div className='nav-logo-admin'>
                            <img src={Logo}/>
                        </div>
                    </div>
                    <div className="grid-sidebar">
                        <Sidebar />
                    </div>              
                </div>
                <div className="admin-component">
                    <div className="admin-nav-bar">
                        <AdminNavigation/>
                    </div>
                    <div className="admin-dash-container">
                        {                    
                            component
                        }
                    </div>
                </div>
            </div>
        </RestrictedContextProvider>
    )
}