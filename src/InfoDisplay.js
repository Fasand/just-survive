import React from 'react';

const InfoDisplay = (props) => (
    <div>
        <ul>
            <li>Stuff: {props.state.stuff}</li>
            <li>People: {props.state.people}</li>
            <li>Wave #: {props.state.wave}</li>
        </ul>
    </div>
)

export default InfoDisplay;