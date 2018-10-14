import React from 'react';

const GameOver = (props) => {
    return (
        <div className="text-center" style={{marginTop: '35vh'}}>
            {props.won 
                ? <h1><u>Congratulations! You Won!</u></h1> 
                : <h1><u>GID GUD SCRUB</u></h1>}
            <h2>You survived until wave <strong>{props.stats.endWave}</strong></h2>
            <ul style={{listStyle: 'none'}} class="text-center">
                <li>Loot per second: {props.stats.lootPerSecond}</li>
                {props.won
                    ? <li>Defense left: {props.stats.defense}</li>
                    : <li>Defense needed: {-props.stats.defense}</li>}
            </ul>
            <button className="btn btn-success btn-lg mt-4" 
                onClick={props.restartGame}>
                Back to main menu</button>
        </div>
    )
}

export default GameOver;