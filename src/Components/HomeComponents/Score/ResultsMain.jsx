import { Fixtures } from "../Fixtures"
import { LiveScore } from "./LiveScore"


export const ResultsMain = () => {
    return(
        <div className="game-result-wrapper">
            <div className="game-score-wrapper">
                <Fixtures />
            </div>
            <div className="game-fixture-wrapper">
                <LiveScore />
            </div>
        </div>
    )
}