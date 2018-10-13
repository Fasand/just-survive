import React, { Component } from 'react';
import InfoDisplay from './InfoDisplay';

class Game extends Component {

    LOOTER_TYPES = {
        0: {
            name: "Lame looter",
            cost: 10,
            lootPerSecond: 1,
        },
        1: {
            name: "Rookie looter",
            cost: 30,
            lootPerSecond: 4,
        },
        2: {
            name: "Intermediate looter",
            cost: 70,
            lootPerSecond: 10,
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            loot: 0,
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

    componentDidMount() {
        this.gameUpdater = setInterval(this.updateGame, 1000);
    }
    
    render() {
        return (
            <div>
                <InfoDisplay state={this.state} />
                <h1>Hello from the Game</h1>
            </div>
        )
    }

}

export default Game;