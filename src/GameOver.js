import React from 'react';

const GameOver = (props) => {
    return (
        <div className="text-center" style={{marginTop: '35vh'}}>
            <h1><u>GAME OVER</u></h1>
            <h2>You survived until wave <strong>{props.stats.endWave}</strong></h2>
            <ul style={{listStyle: 'none'}}>
                <li>Loot per second: {props.stats.lootPerSecond}</li>
                <li>Strength: {props.stats.strength}</li>
            </ul>
            <button className="btn btn-success btn-lg mt-4" 
                onClick={props.restartGame}>
                Back to main menu</button>
        </div>
    )
}

export default GameOver;