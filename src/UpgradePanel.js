import React from 'react';

const UpgradePanel = (props) => (
    <div className="row">
        <h2 className="col-12">Upgrade panel</h2>
        <div className="col-12">
            <div className="row">
                <h3 className="col-12">Looters</h3>
                {props.looters.map((looter, id) => (
                    <div key={id} className="col-md-3 p-1">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{looter.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Loot per second: {looter.lootPerSecond}</h6>
                                {/* <p className="card-text"></p> */}
                                <button className="btn btn-primary"
                                        type="looter"
                                        id={id} 
                                        onClick={props.upgradeHandler}
                                        disabled={props.loot < looter.cost}>
                                    Buy for {looter.cost} loot
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="col-12">
            <div className="row">
                <h3 className="col-12">Defenders</h3>
                {props.defenders.map((defender, id) => (
                    <div key={id} className="col-md-3 p-1">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{defender.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Strength: {defender.strength}</h6>
                                {/* <p className="card-text"></p> */}
                                <button className="btn btn-primary"
                                        type="defender"
                                        id={id} 
                                        onClick={props.upgradeHandler}
                                        disabled={props.loot < defender.cost}>
                                    Buy for {defender.cost} loot
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
)

export default UpgradePanel;