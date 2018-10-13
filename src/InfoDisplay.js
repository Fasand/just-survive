import React from 'react';

const InfoDisplay = (props) => (
    <div className="row">
        <div class="col-md-6">
            <h2>Essentials</h2>
            <ul>
                <li>Wave #: {props.state.wave}</li>
                <li>Loot: {props.state.loot}</li>
                <li>People: {props.state.people}</li>
            </ul>
        </div>
        <div className="col-md-6">
            <h2>Looters</h2>
            <ul>
                {props.looters.map((looter) => (
                    <li key={looter.id}>
                        {looter.name} ({props.state.looters[looter.id]})
                    </li>
                ))}
            </ul>
        </div>
    </div>
)

export default InfoDisplay;