
export const ScoreBoard = ({date,teamA, teamB, scoreA, scoreB, flagA, flagB}) => {
    return (<>
        <p>{date}</p>
        <div className="game-score">
            <div className="game-score-left">
                <div className="game-country-wrap">
                    <img src={`https://firebasestorage.googleapis.com/v0/b/bayjingfunolympics2k22.appspot.com/o/flags%2F${flagA}.svg?alt=media`}/>
                    <h3>{teamA}</h3>
                </div>
                <div className="game-score-lpoint">
                    <p>{scoreA}</p>
                </div>
            </div>
            <div className="game-score-right">
                <div className="game-score-lpoint">
                    <p>{scoreB}</p>
                </div>
                <div className="game-country-wrap">
                    <h3>{teamB}</h3>
                    <img src={`https://firebasestorage.googleapis.com/v0/b/bayjingfunolympics2k22.appspot.com/o/flags%2F${flagB}.svg?alt=media`}/>
                </div>
            </div>
        </div>
    </>
    )
}