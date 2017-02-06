import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';

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
        <CustomInput label='Game access key' name='token' parent={this} />
        <CustomInput label='Your name' name='playerName' parent={this} />
        <CenterButton text='Join game' onPress={this.joinGame.bind(this)} disabled={this.btnDisabled} />
        <CenterButton text='Back' onPress={() => this.props.nav.resetTo({ id: 'index' })} type='cancel' />
      </View>
    )
  }

  joinGame() {
    this.setState({ btnDisabled: true });
    var obj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: this.state.token,
        playerName: this.state.playerName
      })
    }

    fetch(Env.SERVER_URI + '/api/connections', obj)
    .then((response) => response.json())
    .then((response) => {
      if (!response.error) {
        this.props.nav.resetTo({ id: 'gameLobby', game: response.game, user: response.user })
      } else {
        Alert.alert('Error', response.error)
        this.setState({ btnDisabled: false })
      }
    })
  }
}

const styles = StyleSheet.create({

})
