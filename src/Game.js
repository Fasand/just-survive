import React, { Component } from 'react';
import InfoDisplay from './InfoDisplay';
import UpgradePanel from './UpgradePanel';

class Game extends Component {

    INITIAL_LOOTERS = [
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
            name: "Looter on a scooter",
            cost: 250,
            lootPerSecond: 12,
        },
        {
            id: 3,
            name: "Rockomotor looter",
            cost: 1000,
            lootPerSecond: 40,
        },
        {
            id: 4,
            name: "Antique hoarder",
            cost: 3500,
            lootPerSecond: 120,
        },
        {
            id: 5,
            name: "Pensioners",
            cost: 5000,
            lootPerSecond: 200,
        },
    ];

    INITIAL_DEFENDERS = [
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
            name: "Sir Killcelot",
            cost: 100,
            strength: 8,
        },
        {
            id: 3,
            name: "Big boi",
            cost: 250,
            strength: 25,
        },
        {
            id: 4,
            name: "Scooter monkey",
            cost: 700,
            strength: 80,
        },
        {
            id: 5,
            name: "Tank of Justice",
            cost: 1500,
            strength: 200,
        },
        {
            id: 6,
            name: "A fucking plane",
            cost: 4000,
            strength: 500,
        },
    ];

    INITIAL_STATE = JSON.stringify({
        loot: this.props.initialLoot,
        wave: {
            number: 1,
            secondsUntil: this.props.waveLength,
            strength: this.props.initialWaveStrength,
        },
        secondsBetweenWaves: this.props.waveLength,
        lootPerSecond: this.props.initialLootPerSecond,
        strength: this.props.initialStrength,
        looters: [...this.INITIAL_LOOTERS],
        defenders: [...this.INITIAL_DEFENDERS],
    });

    constructor(props) {
        super(props);
        // Initial state is saved as a string to force immutability
        this.state = JSON.parse(this.INITIAL_STATE);

        this.updateGame = this.updateGame.bind(this);
        this.upgradeHandler = this.upgradeHandler.bind(this);
    }
    
    updateCost(cost) {
        return Math.round(cost * 1.05);
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
            definition = this.state.looters[id];
        } else if (type === 'defender') {
            definition = this.state.defenders[id];
        } else {
            throw new TypeError("You can only upgrade looters & defenders.");
        }
        
        // Can afford it, so buy it
        if (this.state.loot >= definition['cost']) {
            // Subtract loot used for purchase
            const newState = {...this.state}
            newState['loot'] -= definition['cost'];
            // Update the upgrade cost
            definition['cost'] = this.updateCost(definition['cost'])
            // At this point, we've checked it's either looter or defender
            if (type === 'looter') {
                newState['lootPerSecond'] += definition['lootPerSecond'];
            } else {
                newState['strength'] += definition['strength'];
            }
            this.setState(newState)
        } else {
            alert("No! You can't! Not enough moneyz!")
        }
    }

    getNextWaveStrength() {
        return this.state.wave.strength * 3;
    }

    isGameOver() {
        return this.state.strength < 0;
    }
    
    updateGame() {
        // Game over?
        if (this.isGameOver()) {
            this.gameOver();
            return;
        }

        // Update the amount of loot we have
        this.setState({
            loot: this.state.loot + this.state.lootPerSecond,
            wave: { ...this.state.wave,
                secondsUntil: this.state.wave.secondsUntil - 1,
            },
        });

        // Wave has arrived
        if (this.state.wave.secondsUntil <= 0) {
            // handle wave
            console.log("Wave has arrived")
            this.setState({
                strength: this.state.strength - this.state.wave.strength,
            })

            // if we survived
            this.setState({
                wave: { ...this.state.wave,
                    number: this.state.wave.number + 1,
                    secondsUntil: this.state.secondsBetweenWaves,
                    strength: this.getNextWaveStrength()
                },
            });
        }
    }

    startGame() {
        this.setState(JSON.parse(this.INITIAL_STATE));
        this.state.gameUpdater = setInterval(this.updateGame, 1000);
    }

    gameOver() {
        clearInterval(this.state.gameUpdater);
        alert("gid gud scrub");
        this.props.endGame();
    }

    componentDidMount() {
        this.startGame();
    }
    
    render() {
        return (
            <div className="container">
                <InfoDisplay    state={this.state}
                                looters={this.state.looters} />
                <UpgradePanel loot={this.state.loot}
                            looters={this.state.looters}
                            defenders={this.state.defenders}
                            upgradeHandler={this.upgradeHandler} />
            </div>
        )
    }

}

export default Game;
