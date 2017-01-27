import React, { Component } from 'react';
import { BackAndroid, View, StyleSheet, Alert } from 'react-native';
import SocketIO from 'react-native-socketio';

import Title from '../components/Title';
import CenterButton from '../components/CenterButton';

var Env = require('../env.js')

export default class MainScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titles: {
        newGame: 'Create new game',
        joinGame: 'Join game',
        exit: 'Quit Application'
      }
    };
  }

  render() {
    titles = this.state.titles
    return (
      <View>
        <Title text='Spydroid.' />
        <CenterButton text={titles.newGame} onPress={this.goToRoute.bind(this, 'newGame')} />
        <CenterButton text={titles.joinGame} onPress={this.goToRoute.bind(this, 'joinGame')} />
        <CenterButton text={titles.exit} onPress={BackAndroid.exitApp} />
      </View>
    )
  }

  goToRoute = (newRoute) => {
    this.props.nav.resetTo({ id: newRoute });
  }
}

const styles = StyleSheet.create({

})
