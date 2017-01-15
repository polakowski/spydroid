import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

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

  componentWillMount() {
    this.socket = new WebSocket('ws://' + Env.SERVER_URL + ':8001/');
    this.socket.onopen = () => {
      message = {
        type: 'playerJoinedGame',
        token: this.props.game.token,
        playerName: this.props.playerName
      };
      this.socket.send(JSON.stringify(message));
    };
    this.socket.onmessage = (message) => {
      messageJson = JSON.parse(message.data);
      switch (messageJson.type) {
        case 'playersInGame':
          this.setState({ players: messageJson.players });
          break;
        case 'gameHasStarted':
          this.gameHasStarted(messageJson);
          break;
      }
    };
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
    message = {
      type: 'adminGameStart',
      adminToken: this.props.game.adminToken
    }
    this.socket.send(JSON.stringify(message));
  }

  gameHasStarted(message) {
    var placeName = message.placeName;
    var isSpy = message.isSpy;
    var gameData = { placeName: placeName, isSpy: isSpy }
    this.props.nav.replace({ id: 'revealCard', socket: this.socket, gameData: gameData });
  }
}

const styles = StyleSheet.create({
})
