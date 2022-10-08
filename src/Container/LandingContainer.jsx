import { Navigate } from 'react-router-dom';
import { HeroNavBar, ForgotPassword, LandingBodyContent } from '../Components';
import { auth } from '../firebase';
import { AuthUser } from '../AllContext';
import './LandingContainer.css';
export function LandingContainer({pageName}) {
  const {funUser, loading} = AuthUser();
  const ReloadPage = () => {
    auth.signOut()
    return <Navigate to="/" />
  }
  return (
    loading? "" :
    funUser && !funUser.emailVerified ? ReloadPage():
    funUser && funUser.emailVerified? <Navigate to="/home" />:
    <div>
        <HeroNavBar />
        {
          pageName == "reset" ?
            <div className='pass-reset'>
              <ForgotPassword />
            </div>
          :
          <LandingBodyContent />
        }
    </div>
  );
}