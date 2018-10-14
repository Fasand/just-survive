import React, { Component } from 'react';
import './App.css';
import Game from './Game';
import GameOver from './GameOver';

const GameWrapper = (props) => {
  // Render game
  if (props.gameIsRunning) {
    return props.children;
  }
  // Game over
  else if (props.gameIsOver) {
    return <GameOver stats={props.gameOverStats}
                    restartGame={props.restartGame}/>
  }
  // Start new game
  else {
    return (
      <div className="text-center" style={{marginTop: '40vh'}}>
        <button className="btn btn-success btn-lg" 
                onClick={props.startGame}>
                Start game</button>
      </div>
    )
  }

}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameIsRunning: false,
      gameIsOver: false,
    }
    this.startGame = this.startGame.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.gameOver = this.gameOver.bind(this);
  }

  startGame() {
    this.setState({
      gameIsRunning: true,
    });
  }

  restartGame() {
    this.setState({
      gameIsRunning: false,
      gameIsOver: false,
    });
  }

  gameOver(stats) {
    this.setState({
      gameIsRunning: false,
      gameIsOver: true,
      gameOverStats: stats,
    })
  }

  render() {
    return (
      <div>
        <GameWrapper gameIsRunning={this.state.gameIsRunning}
                    gameIsOver={this.state.gameIsOver}
                    startGame={this.startGame}
                    restartGame={this.restartGame}
                    gameOver={this.gameOver}
                    gameOverStats={this.state.gameOverStats}>
          <Game waveLength={40}
            initialWaveStrength={5}
            initialLootPerSecond={1}
            initialStrength={0}
            initialLoot={5}
            restartGame={this.restartGame}
            gameOver={this.gameOver} />
        </GameWrapper>
      </div>
    );
  }
}

export default App;
