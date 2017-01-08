import React, { Component } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

const maxCounter = 8;
const minCounter = 3;

export default class PlayersCounterSetter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 3,
    }
  }

  componentWillMount() {
    this.props.setPlayersCount(this.state.counter);
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Button
          style={styles.plusMinusButton}
          title='  -  '
          onPress={this.change.bind(this, -1)}
          disabled={this.state.counter == minCounter}
        />

        <Text style={{ fontSize: 16, alignSelf: 'center' }}>
          Players: {this.state.counter}
        </Text>

        <Button
          style={styles.plusMinusButton}
          title='  +  '
          onPress={this.change.bind(this, 1)}
          disabled={this.state.counter == maxCounter}
        />
      </View>
    )
  }

  change(value) {
    var newCounter = this.state.counter + value;
    this.setState({ counter: newCounter });
    this.props.setPlayersCount(this.state.counter + value);
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25
  },
  plusMinusButton: {
    width: 300
  }
})
