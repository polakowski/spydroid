import React, { Component } from 'react';
import { View, Text, Navigator } from 'react-native';

export default class PlayersSetup extends Component {
  static get defaultProps() {
    return {
      title: 'Players Setup'
    };
  }

  render() {
    return (
      <View>
        <Text>Hi! This is: {this.props.title}.</Text>
      </View>
    )
  }
}
