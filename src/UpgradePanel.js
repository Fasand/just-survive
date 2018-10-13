import React from 'react';

const UpgradePanel = (props) => (
    <div>
        <h2>Upgrade panel</h2>
        <h3>Looters</h3>
        {props.looters.map((looter) => (
            <button key={looter.id}
                    looter_id={looter.id} 
                    onClick={props.upgradeHandler}>
                {looter.name}
            </button>
        ))}
        
    </div>
)

export default UpgradePanel;