import React from 'react';

const InfoDisplay = (props) => (
    <div>
        <ul>
            <li>Loot: {props.state.loot}</li>
            <li>People: {props.state.people}</li>
            <li>Wave #: {props.state.wave}</li>
        </ul>
    </div>
)

export default InfoDisplay;