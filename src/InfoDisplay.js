import React from 'react';

const InfoDisplay = (props) => {
    const wave = props.state.wave;
    let progress_width =
        (1 - wave.secondsUntil/props.state.secondsBetweenWaves)
        * 100;
    // Compute the progress status
    let progress_status;
    if (progress_width < 50) progress_status = 'success';
    else if (progress_width < 70) progress_status = 'warning';
    else progress_status = 'danger';

    return (
        <div className="row">
            <h5 className="col-md-2 pt-3">Loot: <strong>{props.state.loot}</strong></h5>
            <h5 className="col-md-2 pt-3">Strength: <strong>{props.state.strength}</strong></h5> 
            <h5 className="col-md-4 pt-3">Loot per second: <strong>{props.state.lootPerSecond}</strong></h5>
            <div className="col-md-4">
                <div className="row">
                    <h2 className="col-md-6">Wave {wave.number}</h2>
                    <h3 className="col-md-6">Strength: {wave.strength}</h3>
                </div>
                <div className="progress">
                    <div role="progressbar" 
                        className={`progress-bar bg-${progress_status}`}
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