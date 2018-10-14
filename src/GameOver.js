import React from 'react';

const GameOver = (props) => {
    return (
        <div className="text-center" style={{marginTop: '25vh'}}>
            {props.won 
                ? <div>
                    <h1><u>Congratulations!</u></h1>
                    <h3 className="mx-auto" style={{maxWidth: '50vw'}}>You have managed to fend off the English... for now. Enjoy a nice Irn Bru and some haggis to celebrate, before the rations run out!</h3>
                </div>
                : <div>
                    <h1><u>GID GUD SCRUB</u></h1>
                    <h3 className="mx-auto" style={{maxWidth: '50vw'}}>Somehow the enemy has managed to intercept your defence (maybe you shouldn't have invested in so many defenseless children), better luck next time!</h3>
                </div>}
            <hr />
            <h2>You survived until wave <strong>{props.stats.endWave}</strong></h2>
            <ul style={{listStyle: 'none'}} class="text-center p-0">
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