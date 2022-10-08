import { CustomButton } from '..';
import './HeroNavBar.css';
import Logo from "../../../assets/images/logo.svg"

export const HeroNavBar = () => {
    return (
        <div className='nav-bar'>
            <div className="nav-bar-container">
                <div className='nav-wrapper'>
                    <div className='nav-bar-start'>
                        <div className='nav-logo'>
                            <img src={Logo}/>
                        </div>
                    </div>
                    <div className='nav-barMid'>
                        <div className='nav-items'>
                            <ul>
                                <li><a href='/#home'>Home</a></li>
                                <li><a href='/#lives'>Live</a></li>
                                <li><a href='/#highlights'>Highlights</a></li>
                                <li><a href='/#news'>News</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className='nav-barEnd'>
                    </div>
                </div>
            </div>
        </div>
    )
}