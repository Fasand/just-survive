import React from 'react';

const UpgradePanel = (props) => {
    const getImageUrl = (name) => name.toLowerCase().split(' ').join('-');
    return (
    <div className="row">
        <h2 className="col-12">Upgrade panel</h2>
        <div className="col-12">
            <div className="row">
                <h3 className="col-12">Looters</h3>
                {props.looters.map((looter, id) => (
                    <div key={id} className="col-md-3 p-1">
                        <button className={`card upgrade-card btn ${props.loot < looter.cost ? 'btn-outline-danger disabled' : 'btn-light'}`}
                                type="looter"
                                id={id} 
                                onClick={props.upgradeHandler}
                                disabled={props.loot < looter.cost}>
                            <div className="card-body p-1">
                                <img className="img-fluid"
                                    alt={looter.name}
                                    src={`${process.env.PUBLIC_URL}/looters/${getImageUrl(looter.name)}.png`} />
                                <h5 className="card-title">{looter.name}</h5>
                                <h6 className="card-subtitle float-left text-muted">Cost: <strong>{looter.cost}</strong></h6>
                                <h6 className="card-subtitle float-right text-muted">LPS: <strong>{looter.lootPerSecond}</strong></h6>
                            </div>
                        </button>
                    </div>
                ))}
            </div>
        </div>
        <div className="col-12">
            <div className="row">
                <h3 className="col-12">Defenders</h3>
                {props.defenders.map((defender, id) => (
                    <div key={id} className="col-md-3 p-1">
                        <button className={`card upgrade-card btn ${props.loot < defender.cost ? 'btn-outline-danger disabled' : 'btn-light'}`}
                                type="defender"
                                id={id} 
                                onClick={props.upgradeHandler}
                                disabled={props.loot < defender.cost}>
                            <div className="card-body p-1">
                                <img className="img-fluid"
                                    alt={defender.name}
                                    src={`${process.env.PUBLIC_URL}/defenders/${getImageUrl(defender.name)}.png`} />
                                <h5 className="card-title">{defender.name}</h5>
                                <h6 className="card-subtitle float-left text-muted">Cost: <strong>{defender.cost}</strong></h6>
                                <h6 className="card-subtitle float-right text-muted">Defense: <strong>{defender.defense}</strong></h6>
                            </div>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    </div>
    )
}

export default UpgradePanel;