import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import Label from './Label'
import LobbyPlayer from './LobbyPlayer'

export default class LobbyPlayersList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var list = [];
    for (var i = 0; i < this.props.players.length; i++) {
      player = this.props.players[i];
      list.push(<LobbyPlayer player={player} key={player.name} />)
    }
    return (
      <View>
        <Label text='Players' />
        <View style={styles.wrapper}>
          {list}
        </View>
      </View>
    )
  }

  goToRoute = (newRoute) => {
    this.props.nav.resetTo({ id: newRoute });
  }
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 50
  }
})
