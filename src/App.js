import React, { Component } from 'react';
import './App.css';
import Game from './Game';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameRunning: false,
    }
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
  }

  startGame() {
    this.setState({'gameRunning':true});
  }

  endGame() {
    this.setState({'gameRunning':false});
  }

  render() {
    return (
      <div>
        <h1>{this.state.gameRunning}</h1>
      {this.state.gameRunning === true
        ? <Game waveLength={40}
                initialWaveStrength={5}
                initialLootPerSecond={1}
                initialStrength={0}
                initialLoot={5}
                endGame={this.endGame} /> 
        : <div className="text-center" style={{marginTop: '40vh'}}>
            <button className="btn btn-success btn-lg" 
                    onClick={this.startGame}>
                    Start game</button>
          </div>}
      </div>
    );
  }
}

export default App;
