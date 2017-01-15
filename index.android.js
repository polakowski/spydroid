import React, { Component } from 'react';
import { AppRegistry, Navigator, Text } from 'react-native';

import MainMenu from './scenes/MainMenu';
import NewGame from './scenes/NewGame';
import GameLobby from './scenes/GameLobby';
import JoinGame from './scenes/JoinGame';
import RevealCard from './scenes/RevealCard';

class spydroid extends Component {
  constructor() {
    super();
    this.routes = [
      { id: 'index' }
    ]
  }

  render() {
    return (
      <Navigator
        initialRoute={this.routes[0]}
        initialRouteStack={this.routes}
        renderScene={this.navigatorRenderScene.bind(this)}
      />
    )
  }

  navigatorRenderScene(route, nav) {
    switch (route.id) {
      case 'index':
        return (<MainMenu nav={nav} />)
      case 'newGame':
        return (<NewGame nav={nav} />)
      case 'joinGame':
        return (<JoinGame nav={nav} />)
      case 'gameLobby':
        return (<GameLobby nav={nav} game={route.game} playerName={route.playerName} />)
      case 'revealCard':
        return (<RevealCard nav={nav} socket={route.socket} gameData={route.gameData}/>)
    }
  }
}

AppRegistry.registerComponent('spydroid', () => spydroid);
