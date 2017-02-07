import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

import Title from '../components/Title'
import Label from '../components/Label'
import CenterButton from '../components/CenterButton'
import GameCard from '../components/GameCard'

export default class RevealCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardContent: '',
      buttonText: 'Reveal card'
    }
  }

  componentWillMount() {
    this.setState({ cardContent: this.cardContent.bind(this)() })
    this.socket = this.props.socket

    this.socket.on('gameHasEnded', (data) => {
      let lobbyRoute = {
        id: 'gameLobby',
        game: this.props.game,
        user: this.props.user,
        socket: this.socket
      }
      this.socket.on('gameHasEnded', () => true)
      Alert.alert(
        'Info',
        'The game has ended.',
        [
          { text: 'Go to lobby', onPress: () => this.props.nav.resetTo(lobbyRoute) },
        ],
        { cancelable: false }
      )
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  render() {
    return (
      <View>
        <Title text='Game started' />
        <Label text='Press the button below to reveal your card.'/>
        <CenterButton text={this.state.buttonText} onPress={this.revealCard.bind(this)} type='primary' disabled={this.state.btnDisabled}/>
        <GameCard revealed={this.state.cardRevealed} content={this.state.cardContent} />
        { this.leaveGameButton() }
      </View>
    )
  }

  revealCard() {
    let updatesLeft = 3
    this.setState({
      btnDisabled: true,
      revealUpdatesLeft: updatesLeft,
      buttonText: updatesLeft + '...',
      cardRevealed: true
    })

    let intervalId = setInterval(this.revealRoutine.bind(this), 1000)
    this.setState({ intervalId: intervalId })
  }

  revealRoutine() {
    let updatesLeft = this.state.revealUpdatesLeft - 1
    if (updatesLeft < 1) {
      this.setState({ btnDisabled: false, buttonText: 'Reveal card', cardRevealed: false })
      clearInterval(this.state.intervalId)
    } else {
      this.setState({ revealUpdatesLeft: updatesLeft, buttonText: updatesLeft + '...' })
    }
  }

  cardContent() {
    if (this.props.game.isSpy) {
      return 'You are a SPY'
    } else {
      return this.props.game.placeName;
    }
  }

  leaveGameButton() {
    if (this.props.game.adminToken) {
      return <CenterButton text='End game' onPress={this.endGame.bind(this)} type='danger' />
    } else {
      return <CenterButton text='Leave game' onPress={this.leaveGame.bind(this)} type='cancel' />
    }
  }

  leaveGame() {
    Alert.alert(
      'Leaving...',
      'Are you sure you want to leave?',
      [
        { text: 'Nope', onPress: () => false },
        { text: 'Yes', onPress: () => {
          this.socket.emit('playerLeftGame', {
            token: this.props.game.token,
            playerId: this.props.user.id
          })
          this.socket.disable()
          this.props.nav.resetTo({ id: 'index' })
        } },
      ],
      { cancelable: false }
    )
  }

  endGame() {
    Alert.alert(
      'Whoa, boi',
      'Do you really want to end this game?',
      [
        { text: 'Nope', onPress: () => false },
        { text: 'Yes', onPress: () => this.props.socket.emit('adminGameEnd', { adminToken: this.props.game.adminToken }) },
      ],
      { cancelable: false }
    )
  }
}

const styles = StyleSheet.create({
})
