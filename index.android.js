import React, { Component } from 'react';
import { AppRegistry, Navigator, Text } from 'react-native';

import MainMenu from './scenes/MainMenu';
import PlayersSetup from './scenes/PlayersSetup';
import RevealCards from './scenes/RevealCards';

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
      case 'playersSetup':
        return (<PlayersSetup nav={nav}/>)
      case 'revealCards':
        return (<RevealCards nav={nav} gameData={route.gameData} />)
    }
  }
}

AppRegistry.registerComponent('spydroid', () => spydroid);
