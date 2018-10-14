import React, { Component } from 'react';
import InfoDisplay from './InfoDisplay';
import UpgradePanel from './UpgradePanel';

class Game extends Component {

    WAVE_STRENGTHS = [5, 10, 20, 35, 60, 120, 190, 270, 350, 800, 1000, 1200, 1500, 1800, 2200]
    
    INITIAL_LOOTERS = [
        {
            name: "Lame looter",
            cost: 15,
            lootPerSecond: 1,
        },
        {
            name: "Rat boi",
            cost: 100,
            lootPerSecond: 8,
        },
        {
            name: "Looter on a scooter",
            cost: 500,
            lootPerSecond: 24,
        },
        {
            name: "Rockomotor looter",
            cost: 2200,
            lootPerSecond: 69,
        },
        {
            name: "Antique hoarder",
            cost: 9001,
            lootPerSecond: 200,
        },
        {
            name: "Pensioner",
            cost: 50000,
            lootPerSecond: 600,
        },
    ];

    INITIAL_DEFENDERS = [
        {
            name: "Defenseless child",
            cost: 5,
            defense: 1,
        },
        {
            name: "Jeff",
            cost: 50,
            defense: 4,
        },
        {
            name: "Sir Killcelot",
            cost: 250,
            defense: 8,
        },
        {
            name: "Big boi",
            cost: 1000,
            defense: 20,
        },
        {
            name: "Autonomous car",
            cost: 4500,
            defense: 50,
        },
        {
            name: "Doma-Coof",
            cost: 20000,
            defense: 90,
        },
        {
            name: "A fucking plane",
            cost: 50000,
            defense: 150,
        },
    ];

    INITIAL_STATE = JSON.stringify({
        loot: this.props.initialLoot,
        wave: {
            number: 1,
            secondsUntil: this.props.waveLength,
            strength: this.getNextWaveStrength(true),
        },
        secondsBetweenWaves: this.props.waveLength,
        lootPerSecond: this.props.initialLootPerSecond,
        defense: this.props.initialDefense,
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
                newState['defense'] += definition['defense'];
            }
            this.setState(newState)
        } else {
            alert("No! You can't! Not enough moneyz!")
        }
    }

    getNextWaveStrength(init = null) {
        if (init !== null)
            return this.WAVE_STRENGTHS[0];
        else
            return this.WAVE_STRENGTHS[this.state.wave.number];
    }

    isGameOver() {
        return this.state.defense < 0;
    }

    isLastWave() {
        return this.state.wave.number >= this.WAVE_STRENGTHS.length;
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
                defense: this.state.defense - this.state.wave.strength,
            })

            // We've reached the last wave
            if(this.isLastWave()) {
                console.log("LAST WAVE "+this.state.wave.number);
                return this.gameOver(true);
            }

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

    gameOver(won = false) {
        clearInterval(this.state.gameUpdater);
        this.props.gameOver(won, {
            endWave: this.state.wave.number - 1,
            lootPerSecond: this.state.lootPerSecond,
            defense: this.state.defense,
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
