import { LandingScore } from "../../HomeComponents"
import "./NotificationPopup.css"

export const NotificationPopup = () => {
    return (
        <div className="popup-notification-wrapper">
            <div className="popup-notification">
                <div className="popup-left-img">
                    <img src="https://cdn.dribbble.com/users/1218007/screenshots/14438691/media/958a2fcf688d926463d49b8245468d3b.jpg"></img>
                </div>
                <div className="popup-fixtureWrapper">
                    <div className="popup-score-wrapper">
                        <h4>Result</h4>
                        <LandingScore game={`Football`}
                                         date={`2022-10-05`}   
                                         teamA={`Nepal`}
                                         teamB={`England`}
                                         scoreA={2}
                                         scoreB={4}
                                         flagA={`np`}
                                         flagB={`gb-eng`}
                                         removePadding={true}
                                            />
                        
                    </div>
                    <div className="popup-fixture">
                        <h4>Important Fixture</h4>
                        <LandingScore game={`Basketball`}
                             date={`2022-10-07`}   
                             teamA={`USA`}
                             teamB={`Canada`}
                             scoreA={"--"}
                             scoreB={"--"}
                             flagA={`us`}
                             flagB={`ca`}
                             removePadding={true}
                                />
                    </div>
                </div>
            </div>
        </div>
    )
}