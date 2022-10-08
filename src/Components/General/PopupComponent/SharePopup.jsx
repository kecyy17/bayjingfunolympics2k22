import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from "react-share"

import "./NotificationPopup.css"

export const SharePopup = () => {
    return (
        <div className="share-popup-wrapper">
            <div className="share-popup">
                <div className="share-buttons-popup">
                    <FacebookShareButton url={window.location.href}>
                        <FacebookIcon size={20} />
                    </FacebookShareButton>
                    <TwitterShareButton url={window.location.href}>
                        <TwitterIcon size={20} />
                    </TwitterShareButton>
                    <EmailShareButton url={window.location.href}>
                        <EmailIcon size={20} />
                    </EmailShareButton>
                </div>
            </div>
        </div>
    )
}