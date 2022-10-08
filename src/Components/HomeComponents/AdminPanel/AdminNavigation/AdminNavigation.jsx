import React, { useState } from 'react'
import './AdminNavigation.css';
import { AdminPanelSettingsOutlined, MarkUnreadChatAltOutlined, NotificationsActiveOutlined, NotificationsNoneOutlined } from '@mui/icons-material';
import { AdminDropDown, DropDown, MessageDropDown } from '../../../General';
import { collection, limitToLast, orderBy, query } from 'firebase/firestore';
import { firestore } from '../../../../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
export const AdminNavigation = () => {
  const queryRef = collection(firestore, "BadActivity")
  // const queryRef = collection(firestore, "livechat","Ju6NdmCCF23yOq8xSqbJ","football")
  
  const chatQuery = query(queryRef)
  const [badComment, loading] = useCollection(chatQuery);
  const [hideMessage, setHideMessage] = useState(true)
  const [showDrop, setShowDrop] = useState(false)
  const HandleMessageBox = () => {
    setHideMessage(!hideMessage)
  }

  return (
    <div className='admin-nav-container'>
      <div className="admin-nav-wrapper">
        <div className="admin-nav-bar-items">
          <div className={`nav-item`} >
            <MarkUnreadChatAltOutlined className='icon'/>
          </div>  
          
          <div className="nav-item admin-message-box" onClick={HandleMessageBox}>
            <NotificationsActiveOutlined className='icon'/>
            <MessageDropDown className={hideMessage ? `hideMsgBox`:""} loading={loading} data={badComment}/>
          </div> 
          
          <div className="nav-item nav-drop">
            <div className="nav-profile" onClick={() => setShowDrop(!showDrop)}>
            <AdminPanelSettingsOutlined className='icon'/>
              
                {/* <img src='https://avatars.dicebear.com/api/adventurer/hackerworld.svg' alt='' className='avatar' /> */}
            </div>
            <div className={`drop-wrapper-admin ${showDrop ? 'show-admin-drop': 'hide-admin-drop'}`}>
                <AdminDropDown userType={"admin"}/>
            </div>
          </div>  
        </div>
      </div>
    </div>
  )
}
