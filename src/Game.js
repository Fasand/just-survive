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

    DEFENDER_TYPES = [
        {
            id: 0,
            name: "Defenseless child",
            cost: 20,
            strength: 1,
        },
        {
            id: 1,
            name: "Jeff",
            cost: 50,
            strength: 3,
        },
        {
            id: 2,
            name: "Sir Cancelot",
            cost: 100,
            strength: 8,
        },
    ]

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

        // Extract key information from target
        const target = e.currentTarget;
        const type = target.getAttribute('type');
        const id = target.getAttribute('id');
        
        // Decide on the type of the upgrade
        let definition;
        if (type === 'looter') {
            definition = this.LOOTER_TYPES[id];
        } else if (type === 'defender') {
            definition = this.DEFENDER_TYPES[id];
        } else {
            throw new TypeError("You can only upgrade looters & defenders.");
        }
        
        // Can afford it, so buy it
        if (this.state.loot >= definition['cost']) {
            // Subtract loot used for purchase
            const newState = {...this.state}
            newState['loot'] -= definition['cost'];
            // At this point, we've checked it's either looter or defender
            if (type === 'looter') {
                // Subtract loot and add lootPerSecond
                newState['lootPerSecond'] += definition['lootPerSecond'];
            } else {
                newState['strength'] += definition['strength'];
            }
            this.setState(newState)
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
                            defenders={this.DEFENDER_TYPES}
                            upgradeHandler={this.upgradeHandler} />
            </div>
        )
    }

}

export default Game;