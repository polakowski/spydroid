import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SocketIO from 'react-native-socketio';

import Title from '../components/Title'
import Label from '../components/Label'
import CenterButton from '../components/CenterButton'
import CustomInput from '../components/CustomInput'
import LobbyPlayersList from '../components/LobbyPlayersList'

var Env = require('../env.js')

export default class GameLobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    }
  }

  componentDidMount() {
    this.socket = new SocketIO(Env.SERVER_URI);
    this.socket.connect();

    this.socket.emit('playerJoinedGame', {
      token: this.props.game.token,
      playerName: this.props.playerName
    })

    this.socket.on('gameHasStarted', (data) => {
      this.gameHasStarted(data[0])
    })

    this.socket.on('playersInGame', (data) => {
      this.setState({ players: data[0].players });
    })
  }

  render() {
    var tokenInfo = 'Game token: ' + this.props.game.token;
    return (
      <View>
        <Title text='Game lobby' />
        <Label text={tokenInfo} />
        { this.actionButton() }
        <LobbyPlayersList players={this.state.players} />
      </View>
    )
  }

  actionButton() {
    if (this.props.game.adminToken) {
      return (<CenterButton text='Start game' onPress={this.adminGameStart.bind(this)} />)
    } else {
      return (<CenterButton text='I am ready!' onPress={() => 1} disabled={true}/>)
    }
  }

  adminGameStart() {
    this.socket.emit('adminGameStart', { adminToken: this.props.game.adminToken });
  }

  gameHasStarted(data) {
    var placeName = data.placeName;
    var isSpy = data.isSpy;
    var gameData = { placeName: placeName, isSpy: isSpy }
    this.props.nav.replace({ id: 'revealCard', socket: this.socket, gameData: gameData });
  }
}

const styles = StyleSheet.create({
})
