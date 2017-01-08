import React, { Component } from 'react';
import { View, Text, Navigator, Button, TextInput } from 'react-native';

import Title from '../components/Title'
import Label from '../components/Label'
import BottomNav from '../components/BottomNav'
import PlayersCounterSetter from '../components/game/PlayersCounterSetter'

export default class PlayersSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playersCount: null
    };
  }

  render() {
    return (
      <View>
        <Title text='Players Setup' />
        <Label text='How many players do you want to play?' />
        <PlayersCounterSetter setPlayersCount={this.setPlayersCount.bind(this)} />
        <BottomNav
          leftText='Back to menu'
          leftOnPress={this.goToMainMenu.bind(this)}
          rightText='Next step'
          rightOnPress={this.goNext.bind(this)}
        />
      </View>
    )
  }

  setPlayersCount(playersCount) {
    this.setState({ playersCount: playersCount })
  }

  goToMainMenu() {
    this.props.nav.replace({ id: 'index' });
  }

  goNext() {
    var players = this.preparePlayers(this.state.playersCount);
    var gameData = { playersCount: this.state.playersCount, players: players };
    this.props.nav.push({ id: 'revealCards', gameData: gameData });
  }

  preparePlayers(count) {
    var array = [];
    const placeName = 'Miejsce testowe'
    const spyIndex = Math.floor(Math.random() * count)
    for (var i = 0; i < count; i++) {
      if (i == spyIndex) {
        array.push(this.createSpy());
      } else {
        array.push(this.createPlayer(placeName));
      }
    }
    return array;
  }

  createSpy() {
    return {
      isSpy: true
    }
  }

  createPlayer(placeName) {
    return {
      isSpy: false,
      placeName: placeName
    }
  }
}
