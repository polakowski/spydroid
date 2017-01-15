import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import Title from '../components/Title'
import CustomInput from '../components/CustomInput'
import CenterButton from '../components/CenterButton'

var Env = require('../env.js')

export default class JoinGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisabled: false
    }
  }

  render() {
    return (
      <View>
        <Title text='Join game' />
        <CustomInput label='Game access key' name={'token'} parent={this} />
        <CustomInput label='Your name' name={'playerName'} parent={this} />
        <CenterButton text='Join game' onPress={this.joinGame.bind(this)} disabled={this.state.btnDisabled} />
        <CenterButton text='Go back' onPress={() => this.props.nav.replace({ id: 'index' })} />
      </View>
    )
  }

  joinGame() {
    this.setState({ btnDisabled: true });
    var playerName = this.state.playerName;
    var obj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: this.state.token
      })
    }

    fetch('http://' + Env.SERVER_URL + ':5000/api/connections', obj)
    .then((response) => response.json())
    .then((response) => {
      this.props.nav.replace({ id: 'gameLobby', game: response, playerName: playerName })
    })
  }
}

const styles = StyleSheet.create({

})
