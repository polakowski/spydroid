import React, { Component } from 'react';
import { View, Text, Navigator } from 'react-native';

export default class MainScene extends Component {
  static get defaultProps() {
    return {
      title: 'Initial Scene'
    };
  }

  render() {
    return (
      <View>
        <Text style={{ fontSize: 30 }}>Main Menu</Text>
        <Text>Hi! This is: {this.props.title}.</Text>
      </View>
    )
  }
}
