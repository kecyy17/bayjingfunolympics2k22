import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PasswordIcon from '@mui/icons-material/Password';
import LogoutIcon from '@mui/icons-material/Logout';
import "./DropDown.css"
import { Link } from 'react-router-dom';
import { DashboardOutlined } from '@mui/icons-material';
import { cardMediaClasses } from '@mui/material';
export const MessageDropDown = ({userType, className, loading, data}) => {
    return (
        <div className={`custom-drop-down message-drop-down ${className}`}>
            <h1>Notifications</h1>
            {!loading && !data.empty && data.docs.map((cmt,idx) => {
                    return <div className="drop-down-items messageDropDown" key={idx}>
                    <div className="profile-items message-items">
                        <h3>{cmt.data().badTitle} </h3>
                        <p>{cmt.data().badMessage}</p>
                    </div>
                </div>
            })}
        </div>
    )
}