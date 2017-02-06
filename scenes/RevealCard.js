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
  }

  render() {
    return (
      <View>
        <Title text='Game started' />
        <Label text='Press the button below to reveal your card.'/>
        <CenterButton text={this.state.buttonText} onPress={this.revealCard.bind(this)} type='primary' disabled={this.state.btnDisabled}/>
        <GameCard revealed={this.state.cardRevealed} content={this.state.cardContent} />
        <CenterButton text='Leave game' onPress={this.leaveGame.bind(this)} type='danger' />
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
    if (this.props.gameData.isSpy) {
      return 'You are a SPY'
    } else {
      return this.props.gameData.placeName;
    }
  }

  leaveGame() {
    Alert.alert(
      'Leaving...',
      'Are you sure you want to leave?',
      [
        { text: 'Nope', onPress: () => false },
        { text: 'Yes', onPress: () => this.props.nav.replace({ id: 'index' }) },
      ],
      { cancelable: false }
    )
  }
}

const styles = StyleSheet.create({
})
