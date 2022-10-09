import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { AdminPanelContainer, LandingContainer, BayjingHomeContainer } from './Container';
import { VerifyComponent, HomePage, Signup, Login, BroadcastHome, LiveGames, ResultsMain, News, Highlights, Profile, LogoutUser, ChangePassword, Banned, MainDashboard, AllUsers, UploadHighlights, AllHighlights, UploadLive, AllLives, UploadNews, AllNews, HighlightHome, UploadFixture, ContactUs } from './Components';
import { AuthContextProvider } from './AllContext';
import { AuthenticatedRoute, BannedRoute, AdminRoute, RestrictedRoute, VerificationRoute } from './AllRestrictedRoutes';


function App() {
  return (
    <div className="App__container">
      <AuthContextProvider>
        <Router>
          <Routes>
            <Route element={<BannedRoute />}>
              <Route path="/banned" element={<BayjingHomeContainer component={ <Banned /> } />}/>   
              <Route path="/logout" element={<BayjingHomeContainer component={ <LogoutUser />} />}/>
            </Route>

            <Route element={<RestrictedRoute />}>
              <Route path="/signup" element={<Signup/>} />    
              <Route path="/login" element={<Login/>} />   
            </Route>
            
            <Route element={<VerificationRoute />}>
              <Route path="/verify" element={<VerifyComponent/>} />
            </Route>
            
          

            <Route element={<AdminRoute />}>
              <Route path="/admin-panel/dashboard" element={<AdminPanelContainer component={ <MainDashboard/>} />} />
              <Route path="/admin-panel/users" element={<AdminPanelContainer component={ <AllUsers/> } />} />
              <Route path="/admin-panel/highlights" element={<AdminPanelContainer component={ <UploadHighlights /> } />} />
              <Route path="/admin-panel/highlights/all" element={<AdminPanelContainer component={<AllHighlights docPath={'highlights'} />} /> } />
              <Route path="/admin-panel/highlights/update/:videoID" element={<AdminPanelContainer component={ <UploadHighlights /> } />} />
              <Route path="/admin-panel/live" element={<AdminPanelContainer component={ <UploadLive /> } />} />
              <Route path="/admin-panel/live/all" element={<AdminPanelContainer component={ <AllLives docPath={'lives'} /> } />} />
              <Route path="/admin-panel/live/update/:videoID" element={<AdminPanelContainer component={ <UploadLive />} />} />
              <Route path="/admin-panel/news" element={<AdminPanelContainer component={ <UploadNews /> } />} />
              <Route path="/admin-panel/news/all" element={<AdminPanelContainer component={ <AllNews docPath={'news'} />} />} />
              <Route path="/admin-panel/news/update/:postID" element={<AdminPanelContainer component={ <UploadNews /> } />} />
              <Route path="/admin-panel/profile" element={<AdminPanelContainer component={<Profile isDashBoard={true} userType={`Admin`}/>} />} />
              <Route path="/admin-panel/fixture" element={<AdminPanelContainer component={ <UploadFixture /> } />} />
            </Route>

            

            <Route element={<AuthenticatedRoute/>} >
              <Route path="/home" element={<BayjingHomeContainer component={<HomePage />}/>}/>
              <Route path="/livegames" element={<BayjingHomeContainer component={<LiveGames />} />}/> 
              <Route path="/fixtures" element={<BayjingHomeContainer component={<ResultsMain />} />}/> 
              <Route path="/news" element={<BayjingHomeContainer component={ <News/> } />}/> 
              <Route path="/highlights" element={<BayjingHomeContainer component={ <HighlightHome />} />}/> 
              <Route path="/profile" element={<BayjingHomeContainer component={ <Profile userType={`User`} isDashBoard={false} /> } />}/> 
              <Route path="/signout" element={<BayjingHomeContainer  component={ <LogoutUser />} />}/>
              <Route path="/live/watch/:videoID" element={<BayjingHomeContainer component={ <BroadcastHome /> } />}/>
              <Route path="/highlights/watch/:postID" element={<BayjingHomeContainer component={ <Highlights /> } />}/>
              <Route path="/reset" element={<BayjingHomeContainer component={ <ChangePassword/> } />}/>  
              <Route path="/contact" element={<BayjingHomeContainer component={ <ContactUs/> } />}/>  
            </Route>
            <Route path="/" element={<LandingContainer/>} />
            <Route path="/forgot" element={<LandingContainer pageName={"reset"}/>} />
            <Route path="/news/post/:postID" element={<BayjingHomeContainer component={ <News/> } />}/>
          </Routes>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
