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
            people: 1,
            wave: 0,
            // Key is looter ID, val is number of said looter
            looters: {
                0: 1,
                1: 0,
                2: 0,
            }
        };

        this.updateGame = this.updateGame.bind(this);
        this.upgradeHandler = this.upgradeHandler.bind(this);
    }

    updateGame() {
        let lps = 0;
        for (let id in this.state.looters) {
            let amount = this.state.looters[id];
            let definition = this.LOOTER_TYPES[id];
            // Aggregate all the loot per second
            lps += definition['lootPerSecond'] * amount;
        }
        // Update the amount of loot we have
        this.setState({
            loot: this.state.loot + lps,
        });
    }

    upgradeHandler(e) {
        // Make sure we don't follow the link
        e.preventDefault();

        const target = e.currentTarget;
        const looter_id = target.getAttribute('looter_id');
        const looter_def = this.LOOTER_TYPES[looter_id];
        
        //console.log(e, );
        // Can afford it
        if (this.state.loot >= looter_def['cost']) {
            // Update the number of looters
            let updatedLooters = {
                ...this.state.looters,
            }
            updatedLooters[looter_id]++;
            // Push update to state
            this.setState({
                loot: this.state.loot - looter_def['cost'],
                looters: updatedLooters
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
            <div>
                <InfoDisplay  state={this.state}
                              looters={this.LOOTER_TYPES} />
                <UpgradePanel loot={this.state.loot}
                              looters={this.LOOTER_TYPES}
                              upgradeHandler={this.upgradeHandler} />
            </div>
        )
    }

}

export default Game;