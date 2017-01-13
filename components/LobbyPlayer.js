import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class LobbyPlayersList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var playerName = this.props.player.name;
    return (
      <View style={styles.wrapper}>
        <Text style={styles.text}>
          {playerName}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#ddd',
    borderRadius: 2
  }
})
