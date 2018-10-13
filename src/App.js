import React, { Component } from 'react';
import './App.css';
import Game from './Game';

class App extends Component {
  render() {
    return (
      <Game   waveLength={30}
              initialWaveStrength={5}
              initialLootPerSecond={1}
              initialStrength={0}
              initialLoot={25} />
    );
  }
}

export default App;
