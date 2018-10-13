import React, { Component } from 'react';
import InfoDisplay from './InfoDisplay';
import UpgradePanel from './UpgradePanel';

class Game extends Component {

    LOOTER_TYPES = [
        {
            id: 0,
            name: "Lame looter",
            cost: 30,
            lootPerSecond: 1,
        },
        {
            id: 1,
            name: "Rookie looter",
            cost: 100,
            lootPerSecond: 4,
        },
        {
            id: 2,
            name: "Intermediate looter",
            cost: 250,
            lootPerSecond: 12,
        },
    ];

    constructor(props) {
        super(props);
        this.state = {
            loot: 30,
            wave: 0,
            lootPerSecond: 1.0,
            strength: 0,
        };

        this.updateGame = this.updateGame.bind(this);
        this.upgradeHandler = this.upgradeHandler.bind(this);
    }

    updateGame() {
        // Update the amount of loot we have
        this.setState({
            loot: this.state.loot + this.state.lootPerSecond,
        });
    }

    upgradeHandler(e) {
        // Make sure we don't follow the link
        e.preventDefault();

        const target = e.currentTarget;
        const looter_id = target.getAttribute('looter_id');
        const looter_def = this.LOOTER_TYPES[looter_id];
        
        // Can afford it, so buy it
        if (this.state.loot >= looter_def['cost']) {
            // Subtract loot and add lootPerSecond
            this.setState({
                loot: this.state.loot - looter_def['cost'],
                lootPerSecond: this.state.lootPerSecond + looter_def['lootPerSecond']
            })
        } else {
            alert("No! You can't! Not enough moneyz!")
        }
    }

    componentDidMount() {
        this.gameUpdater = setInterval(this.updateGame, 1000);
    }
    
    render() {
        return (
            <div className="container">
                <InfoDisplay    state={this.state}
                                looters={this.LOOTER_TYPES} />
                <UpgradePanel loot={this.state.loot}
                            looters={this.LOOTER_TYPES}
                            upgradeHandler={this.upgradeHandler} />
            </div>
        )
    }

}

export default Game;