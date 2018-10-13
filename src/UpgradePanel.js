import React from 'react';

const UpgradePanel = (props) => (
    <div className="row">
        <h2 className="col-12">Upgrade panel</h2>
        <h3 className="col-12">Looters</h3>
        <div className="col-12">
        <div className="row">
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
        </div>
    </div>
)

export default UpgradePanel;