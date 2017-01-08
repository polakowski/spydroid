import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Title from '../components/Title';
import Label from '../components/Label';

export default class RevealCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Reveal ' + props.gameData.playersCount + ' cards',
      label: 'We have ' + this.props.gameData.players.length + ' players prepared.'
    };
  }

  render() {
    return (
      <View>
        <Title text={this.state.title} />
        <Label text='On this screen your cards will be revealed.' />
        <Label text={this.state.label} />
      </View>
    )
  }
}
