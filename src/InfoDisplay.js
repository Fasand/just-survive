import React from 'react';

const InfoDisplay = (props) => (
    <div className="row">
        <div className="col-md-6">
            <h2>Essentials</h2>
            <ul>
                <li>Wave #: {props.state.wave}</li>
                <li>Loot: {props.state.loot}</li>
                <li>Loot per second: {props.state.lootPerSecond}</li>
                <li>Strength: {props.state.strength}</li> 
            </ul>
        </div>
        <div className="col-md-6">
            
        </div>
    </div>
)

export default InfoDisplay;