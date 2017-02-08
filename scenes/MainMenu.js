import React, { Component } from 'react';
import { ToastAndroid, View, StyleSheet, Alert } from 'react-native';
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
        credits: 'Credits',
        checkServer: 'Check server'
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
        <CenterButton text={titles.credits} onPress={this.displayCredits.bind(this)} type='cancel' />
        <CenterButton text={titles.checkServer} onPress={this.checkServer.bind(this)} type='cancel' disabled={this.state.pingPending} />
      </View>
    )
  }

  goToRoute = (newRoute) => {
    this.props.nav.resetTo({ id: newRoute });
  }

  displayCredits = () => {
    Alert.alert(
      'Credits',
      "Application by Marek Polakowski\nBased on Spyfall game"
    )
  }

  checkServer = () => {
    this.setState({ pingPending: true })
    fetch(Env.SERVER_URI + '/api/status/')
    .then((response) => response.json())
    .then((response) => {
      this.setState({ pingPending: false })
      if (response === true) {
        ToastAndroid.show('Server is up!', ToastAndroid.LONG)
      }
    })
  }
}

const styles = StyleSheet.create({

})
