import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Title from '../components/Title'
import Label from '../components/Label'
import CenterButton from '../components/CenterButton'

export default class GameLobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {

  }

  render() {
    return (
      <View>
        <Title text={this.cardContent()} />
      </View>
    )
  }

  cardContent() {
    if (this.props.gameData.isSpy) {
      return 'You are a SPY'
    } else {
      return this.props.gameData.placeName;
    }
  }
}

const styles = StyleSheet.create({
})
