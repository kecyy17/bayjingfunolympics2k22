import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PasswordIcon from '@mui/icons-material/Password';
import LogoutIcon from '@mui/icons-material/Logout';
import "./DropDown.css"
import { Link } from 'react-router-dom';
import { AccountBoxOutlined, DashboardOutlined, ExitToAppOutlined, GridViewOutlined, KeyOutlined } from '@mui/icons-material';
export const DropDown = ({userType}) => {
    return (
        <div className="custom-drop-down ">
            <div className="drop-down-items">
                <div className="profile-items">
                    <AccountBoxOutlined />
                    <Link to={`/profile`}>Profile</Link>
                </div>
                {
                    userType == "admin"?
                        <div className="profile-items">
                            <GridViewOutlined />
                            <Link to={`/admin/dashboard`}>Admin Panel</Link>
                        </div>
                        :
                        ""
                }
                <div className="profile-items">
                    <KeyOutlined />
                    <Link to={`/reset`}>Change Password</Link>
                </div>
                <div className="profile-items">
                    <ExitToAppOutlined />
                    <Link to={`/signout`}>Logout</Link>
                </div>
            </div>
        </div>
    )
}