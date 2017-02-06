import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import SocketIO from 'react-native-socketio';

import Title from '../components/Title'
import Label from '../components/Label'
import CenterButton from '../components/CenterButton'
import CustomInput from '../components/CustomInput'
import LobbyPlayersList from '../components/LobbyPlayersList'

var Env = require('../env.js')
var _ = require('lodash')

export default class GameLobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      players: []
    }
  }

  componentDidMount() {
    this.socket = this.props.socket || this.createLobbySocket()

    this.socket.on('gameHasStarted', (data) => {
      this.gameHasStarted(data[0])
    })

    this.socket.on('playersInGame', (data) => {
      this.setState({ players: data[0].players });
    })

    this.socket.on('playerReady', (data) => {
      let player = this.state.players.find((player) => { return player.id == data[0].playerId })
      player.ready = true
      if (player.id == this.props.user.id) { this.setState({ ready: true }) }
      this.setState({ players: this.state.players })
      if (this.allPlayersReady(this.state.players)) {
        this.setState({ everyoneReady: true })
      }
    })

    if (!this.props.socket) {
      this.socket.emit('playerJoinedGame', {
        token: this.props.game.token,
        playerName: this.props.user.name,
        playerId: this.props.user.id
      })
    } else {
      this.socket.emit('playerJoinedLobby', {
        token: this.props.game.token
      })
    }
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
    if (this.state.everyoneReady && this.props.game.adminToken) {
      return (<CenterButton text='Start game' onPress={this.adminGameStart.bind(this)} />)
    } else {
      return (<CenterButton text='I am ready!' onPress={this.getReady.bind(this)} disabled={this.state.ready}/>)
    }
  }

  getReady() {
    this.socket.emit('playerReady', {
      token: this.props.game.token,
      playerId: this.props.user.id
    })
  }

  allPlayersReady(players) {
    return _.all(players, (player) => player.ready)
  }

  adminGameStart() {
    this.socket.emit('adminGameStart', { adminToken: this.props.game.adminToken });
  }

  gameHasStarted(data) {
    var game = {
      placeName: data.placeName,
      isSpy: data.isSpy,
      token: this.props.game.token,
      adminToken: this.props.game.adminToken
    }
    this.props.nav.replace({ id: 'revealCard', socket: this.socket, game: game, user: this.props.user });
  }

  createLobbySocket() {
    let socket = new SocketIO(Env.SERVER_URI);
    socket.connect();
    return socket;
  }
}

const styles = StyleSheet.create({
})
