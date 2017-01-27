import React, { Component } from 'react';
import { KeyboardAvoidingView, Text, Navigator, Button, TextInput } from 'react-native';

import Title from '../components/Title'
import CenterButton from '../components/CenterButton'
import CustomInput from '../components/CustomInput'
import ModalInfo from '../components/ModalInfo'

var Env = require('../env.js')

export default class PlayersSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playersCount: null,
      creating: false
    };
  }

  render() {
    return (
      <KeyboardAvoidingView>
        <Title text='Create new game' />
        <CustomInput label='Your name' name={'playerName'} parent={this} />
        <ModalInfo text='Creating game...' parent={this} id='creating' />
        <CenterButton text='Create game' onPress={this.createGame.bind(this)} type='primary'/>
        <CenterButton text='Back' onPress={this.goToMainMenu.bind(this)} type='cancel' />
      </KeyboardAvoidingView>
    )
  }

  setPlayersCount(playersCount) {
    this.setState({ playersCount: playersCount })
  }

  goToMainMenu() {
    this.props.nav.replace({ id: 'index' })
  }

  createGame() {
    var obj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        creatorName: this.state.playerName
      })
    }

    fetch(Env.SERVER_URI + '/api/games/', obj)
    .then((response) => response.json())
    .then((response) => {
      this.props.nav.replace({ id: 'gameLobby', game: response, playerName: response.creatorName })
    })
  }
}
