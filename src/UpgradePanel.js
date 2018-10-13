import React from 'react';

const UpgradePanel = (props) => (
    <div className="row">
        <h2 className="col-12">Upgrade panel</h2>
        <div className="col-12">
            <div className="row">
                <h3 className="col-12">Looters</h3>
                {props.looters.map((looter) => (
                    <a  className="upgradeButton"
                        href={`#buy-looter-${looter.id}`}
                        key={looter.id}
                        type="looter"
                        id={looter.id} 
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
        <div className="col-12">
            <div className="row">
                <h3 className="col-12">Defenders</h3>
                {props.defenders.map((defender) => (
                    <a  className="upgradeButton"
                        href={`#buy-defender-${defender.id}`}
                        key={defender.id}
                        type="defender"
                        id={defender.id} 
                        onClick={props.upgradeHandler}>
                        <div>
                            <p>{defender.name}</p>
                            <p>{defender.cost}</p>
                            <p>{defender.strength}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    </div>
)

export default UpgradePanel;