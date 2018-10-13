import React from 'react';

const InfoDisplay = (props) => {
    const wave = props.state.wave;
    let progress_width =
        (1 - wave.secondsUntil/props.state.secondsBetweenWaves)
        * 100;
    let progress_status = progress_width < 70 ? 'success' : 'danger'
    return (
        <div className="row">
            <div className="col-md-6">
                <h2>Essentials</h2>
                <ul>
                    <li>Wave #: {wave.number}</li>
                    <li>Wave strength: {wave.strength}</li>
                    <li>Loot: {props.state.loot}</li>
                    <li>Loot per second: {props.state.lootPerSecond}</li>
                    <li>Strength: {props.state.strength}</li> 
                </ul>
            </div>
            <div className="col-md-6">
            <div className="progress">
                <div    className={`progress-bar bg-${progress_status}`}
                        role="progressbar" 
                        style={{
                            width:`${progress_width}%`
                        }} 
                        aria-valuenow={props.state.secondsUntilWave} 
                        aria-valuemin="0" 
                        aria-valuemax={props.state.secondsBetweenWaves}></div>
            </div>
            </div>
        </div>
    )
}

export default InfoDisplay;