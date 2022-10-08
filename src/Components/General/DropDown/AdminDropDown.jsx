import "./DropDown.css"
import { Link } from 'react-router-dom';
import { AccountBoxOutlined, ExitToAppOutlined, HomeOutlined, KeyOutlined } from '@mui/icons-material';
export const AdminDropDown = ({userType}) => {
    return (
        <div className="custom-drop-down ">
            <div className="drop-down-items">
                <div className='profile-items'>
                    <HomeOutlined />
                    <Link to={`/home`}>Home</Link>
                </div>
                <div className="profile-items">
                    <AccountBoxOutlined />
                    <Link to={`/admin/profile`}>Profile</Link>
                </div>
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