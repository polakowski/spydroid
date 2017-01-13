import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Title from '../components/Title'
import Label from '../components/Label'
import CenterButton from '../components/CenterButton'
import CustomInput from '../components/CustomInput'
import LobbyPlayersList from '../components/LobbyPlayersList'

export default class GameLobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    }
  }

  componentWillMount() {
    this.socket = new WebSocket('ws://192.168.55.105:8001/');
    this.socket.onopen = () => {
      this.setState({ socket: 'connected' });
      message = {
        type: 'playerJoinedGame',
        token: this.props.game.token,
        playerName: this.props.playerName
      };
      this.socket.send(JSON.stringify(message));
    };
    this.socket.onmessage = (message) => {
      messageJson = JSON.parse(message.data);
      if (messageJson.type == 'playersInGame') {
        this.setState({ players: messageJson.players })
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
      return (<CenterButton text='Start game' onPress={() => 1} />)
    } else {
      return (<CenterButton text='I am ready!' onPress={() => 1} disabled={true}/>)
    }
  }
}

const styles = StyleSheet.create({
})
