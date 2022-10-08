import "./MessageLog.css"
export const MessageLog = ({err}) => {
    return (
        <div>
            <p className="error-message">{err}</p>
        </div>
    )
}