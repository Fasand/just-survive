import React from 'react';

const UpgradePanel = (props) => (
    <div>
        <h2>Upgrade panel</h2>
        <h3>Looters</h3>
        {props.looters.map((looter) => (
            <a  className="upgradeButton"
                href={`#buy-looter-${looter.id}`}
                key={looter.id}
                looter_id={looter.id} 
                onClick={props.upgradeHandler}>
                <div>
                    <p>{looter.name}</p>
                    <p>{looter.cost}</p>
                    <p>{looter.lootPerSecond}</p>
                </div>
            </a>
        ))}
        
    </div>
)

export default UpgradePanel;