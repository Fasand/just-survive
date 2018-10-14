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
                    won={props.gameOverWon}
                    restartGame={props.restartGame}/>
  }
  // Start new game
  else {
    return (
      <div className="text-center" style={{marginTop: '30vh'}}>
        <div className="card text-white bg-info mx-auto" style={{maxWidth: '60vw'}}>
          <div className="card-header card-title" style={{fontSize: '15pt'}}><strong>Just Survive</strong></div>
          <div className="card-body" style={{fontSize: '13pt'}}>
            <p className="card-text">On the 14th of October 2018 that was when the “new world” was formed. Doomsbury. Civilization collapsed following the aftermath of the continuous feud between the prior ruler of the world, Scotland, and their nearby nasty neighbours... the English. England’s naive notion that they could compete against the otherworldly strength of the Scots lead to mass devastation once they declared nuclear war. Alas, Doomsbury was formed.</p>
            <p className="card-text">Now, brave warrior it is your job to defend against the heathen scum attempting to claim the once beautiful nation you called home. Be courageous my friend, remember the importance of your mission. FREEDOM!</p>
          </div>
        </div>
        <button className="btn btn-success btn-lg mt-4" 
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

  gameOver(won, stats) {
    this.setState({
      gameIsRunning: false,
      gameIsOver: true,
      gameOverStats: stats,
      gameOverWon: won,
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
                    gameOverStats={this.state.gameOverStats}
                    gameOverWon={this.state.gameOverWon}>
          <Game waveLength={40}
            initialWaveStrength={5}
            initialLootPerSecond={1}
            initialDefense={0}
            initialLoot={5}
            restartGame={this.restartGame}
            gameOver={this.gameOver} />
        </GameWrapper>
      </div>
    );
  }
}

export default App;
