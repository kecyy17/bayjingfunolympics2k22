import './HeroNavBar.css';
import Logo from "../../../assets/images/logo.svg"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { KeyboardArrowDownOutlined, PermIdentityOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { DropDown } from '..';
import { Link } from 'react-router-dom';
import { AuthUser } from '../../../AllContext';

export const HomeNavBar = ({navColor, btnText, toPage, userName, className}) => {
    let funNavStyle = {
        backgroundColor: navColor
    }
    const {CurrentUserType, userType} = AuthUser();
    const [showProfileDrop, setShowProfileDrop] = useState(false)
    const HandleProfileDrop = () => {
        setShowProfileDrop(!showProfileDrop)
    }
    useEffect(()=> {
        CurrentUserType()
    },[])
    return (
        <div className='nav-bar'>
            <div className="nav-bar-container" style={funNavStyle}>
                <div className='nav-wrapper'>
                    <div className='nav-bar-start'>
                        <div className='nav-logo'>
                            <img src={Logo}/>
                        </div>
                    </div>
                    <div className='nav-barMid'>
                        <div className={`nav-items ${className}`}>
                            <ul>
                                <li><Link to={`/home`}>Home</Link></li>
                                <li><Link to={`/livegames`}>Live</Link></li>
                                <li><Link to={`/highlights`}>Highlights</Link></li>
                                <li><Link to={`/news`}>News</Link></li>
                                <li><Link to={`/fixtures`}>Fixture</Link></li>
                                <li><Link to={`/contact`}>Contact</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className='nav-barEnd'>
                        <div className='nav-end-items'>
                            <div className='live-profile-btn' onClick={HandleProfileDrop}>
                                <div className='profile-btn'>
                                    <p>Hi, {userName}</p>
                                    <div className='profile-btn-drop'>
                                        <PermIdentityOutlined sx={{width: 35, height: 35, color: "white"}}/>
                                        <KeyboardArrowDownOutlined sx={{color: "whitesmoke"}}/>
                                    </div>
                                    
                                </div>
                                {
                                showProfileDrop ? 
                                    <div className='drop-wrapper'>
                                        <DropDown userType={userType}/>
                                    </div>
                                    :
                                    ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}