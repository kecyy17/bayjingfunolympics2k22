import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./ChatBox.css";
export const ChatMessage = ({comment, userName, className}) => {
    return (
        <div className="chat-body-message">
            <div className={`message-content ${className}`}>
                <div className='message-profile'>
                    <AccountCircleIcon />
                    <h3>{userName}</h3>
                </div>
                <p>{comment}</p>
            </div>
        </div>
    )
}