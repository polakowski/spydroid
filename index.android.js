import React, { Component } from 'react';
import { AppRegistry, Navigator } from 'react-native';

import MainScene from './scenes/MainScene';

class spydroid extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ title: 'Initial Scene', index: 0 }}
        renderScene={(route, navigator) =>
          <MainScene
            title={route.title}

            // Function to call when a new scene should be displayed
            onForward={() => {
              const nextIndex = route.index + 1;
              navigator.push({
                title: 'Scene ' + nextIndex,
                index: nextIndex,
              });
            }}

            // Function to call to go back to the previous scene
            onBack={() => {
              if (route.index > 0) {
                navigator.pop();
              }
            }}
          />
        }
      />
    )
  }
}

AppRegistry.registerComponent('spydroid', () => spydroid);
