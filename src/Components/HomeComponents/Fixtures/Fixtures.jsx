
import { useState } from "react"
import { FunSelectComponent } from "../../General"
import Standings from "../../General/Standings/Standings"
import "../Score/LiveScore.css"
import { FunScoreBoard } from "../Score/ScoreBoard"
export const Fixtures = ({data}) => {
    const [error, setError] = useState("")
    return (
        <div className="change-pass-wrapper game-score-wrapperFlex">
            <h3 style={{padding: "0rem 0rem 1rem 0rem", color:"white"}}>Fixtures</h3>
            <div className="change-pass game-score-board">
                <div className="vid-upload-form game-score-upload-form" >
                    <h3>Date: 10/9/2022</h3>

                    <div className="fixture-game">
                        <p>Football | Men</p>
                        <h4>Brazil vs Spain | FunOlympic Bronze Match</h4>
                    </div>
                </div>
            </div>

            <div className="change-pass game-score-board">
                <div className="vid-upload-form game-score-upload-form" >
                    <h3>Date: 10/15/2022</h3>

                    <div className="fixture-game">
                        <p>Football | Women</p>
                        <h4>Brazil vs Australia | FunOlympic Silver Match</h4>
                    </div>
                </div>
            </div>


            <div className="change-pass game-score-board">
                <div className="vid-upload-form game-score-upload-form" >
                    <h3>Date: 10/17/2022</h3>

                    <div className="fixture-game">
                        <p>Basketball | Men</p>
                        <h4>USA vs England | FunOlympic Gold Match</h4>
                    </div>
                </div>
            </div>

            <div className="change-pass game-score-board">
                <div className="vid-upload-form game-score-upload-form" >
                    <h3>Date: 10/27/2022</h3>

                    <div className="fixture-game">
                        <p>Javelin | Women</p>
                        <h4>India vs Jamaica | FunOlympic Gold Match</h4>
                    </div>
                </div>
            </div>

        </div>
    )
}