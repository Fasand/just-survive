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
    };

    constructor(props) {
        super(props);
        this.state = {
            stuff: 0,
            people: 1,
            wave: 0,
            // Key is looter ID, val is number of said looter
            looters: {
                0: 1,
                1: 0,
                2: 0,
            }
        };
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