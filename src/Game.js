import React, { Component } from 'react';
import InfoDisplay from './InfoDisplay';
import UpgradePanel from './UpgradePanel';

class Game extends Component {

    WAVE_STRENGTHS = [5, 10, 20, 35, 60, 120, 190, 270, 350, 800, 1000]
    
    INITIAL_LOOTERS = [
        {
            id: 0,
            name: "Lame looter",
            cost: 15,
            lootPerSecond: 1,
        },
        {
            id: 1,
            name: "Rookie looter",
            cost: 100,
            lootPerSecond: 8,
        },
        {
            id: 2,
            name: "Looter on a scooter",
            cost: 500,
            lootPerSecond: 24,
        },
        {
            id: 3,
            name: "Rockomotor looter",
            cost: 2200,
            lootPerSecond: 69,
        },
        {
            id: 4,
            name: "Antique hoarder",
            cost: 9001,
            lootPerSecond: 200,
        },
        {
            id: 5,
            name: "Pensioners",
            cost: 50000,
            lootPerSecond: 600,
        },
    ];

    INITIAL_DEFENDERS = [
        {
            id: 0,
            name: "Defenseless child",
            cost: 5,
            strength: 1,
        },
        {
            id: 1,
            name: "Jeff",
            cost: 50,
            strength: 4,
        },
        {
            id: 2,
            name: "Sir Killcelot",
            cost: 250,
            strength: 8,
        },
        {
            id: 3,
            name: "Big boi",
            cost: 1000,
            strength: 20,
        },
        {
            id: 4,
            name: "Scooter monkey",
            cost: 4500,
            strength: 50,
        },
        {
            id: 5,
            name: "Tank of Justice",
            cost: 20000,
            strength: 90,
        },
        {
            id: 6,
            name: "A fucking plane",
            cost: 50000,
            strength: 150,
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
        this.gameOver = this.gameOver.bind(this);
    }
    
    updateCost(cost) {
        return Math.round(cost * 1.10);
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
        return this.WAVE_STRENGTHS[this.state.wave.number];
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
        this.props.gameOver({
            endWave: this.state.wave.number - 1,
            lootPerSecond: this.state.lootPerSecond,
            strength: this.state.strength,
        });
    }

    componentDidMount() {
        this.startGame();
    }

    componentWillUnmount() {
        clearInterval(this.state.gameUpdater);
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
                <div className="footer text-right">
                    <button className="btn btn-danger mt-3" onClick={this.props.restartGame}>Restart game</button>
                </div>
            </div>
        )
    }

}

export default Game;
