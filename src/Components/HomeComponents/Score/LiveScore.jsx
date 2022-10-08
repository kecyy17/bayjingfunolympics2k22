
import { useState } from "react"
import { FunSelectComponent } from "../../General"
import Standings from "../../General/Standings/Standings"
import "./LiveScore.css"
import { ScoreBoard } from "./ScoreBoard"
export const LiveScore = () => {
    const [error, setError] = useState("")
    return (
        <div className="change-pass-wrapper game-score-wrapperFlex">
            <h3 style={{padding: "0rem 0rem 1rem 0rem", color:"white"}}>Results</h3>
            <div className="change-pass game-score-board">
                <form className="vid-upload-form game-score-upload-form" >
                    <h3>Basketball</h3>
                    <ScoreBoard date={"2022-10-06"} teamA={"USA"} teamB={"Greece"} scoreA={132} scoreB={121} flagA={`us`} flagB={`gr`}/>
                    
                    <div className="vid-send-reset">
                        <p>{error ? error : "" }</p>
                    </div>
                </form>
            </div>
            <div className="change-pass game-score-board">
                <form className="vid-upload-form game-score-upload-form" >
                    <h3>Football</h3>
                    <ScoreBoard date={"2022-10-05"} teamA={"Nepal"} teamB={"England"} scoreA={2} scoreB={4} flagA={`np`} flagB={`gb-eng`}/>
                    
                    <div className="vid-send-reset">
                        <p>{error ? error : "" }</p>
                    </div>
                </form>
            </div>
            <div className="change-pass game-score-board">
                <form className="vid-upload-form game-score-upload-form" >
                    <h3>Water Polo</h3>
                    <ScoreBoard date={"2022-10-04"} teamA={"France"} teamB={"China"} scoreA={8} scoreB={4} flagA={`fr`} flagB={`cn`}/>
                    
                    <div className="vid-send-reset">
                        <p>{error ? error : "" }</p>
                    </div>
                </form>
            </div>
            <div className="change-pass game-score-board">
                <form className="vid-upload-form game-score-upload-form" >
                    <h3>Rugby</h3>
                    <ScoreBoard date={"2022-10-03"} teamA={"New Zealand"} teamB={"Australia"} scoreA={45} scoreB={21} flagA={`nz`} flagB={`au`}/>
                    
                    <div className="vid-send-reset">
                        <p>{error ? error : "" }</p>
                    </div>
                </form>
            </div>

        </div>
    )
}