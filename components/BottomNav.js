import React, { Component } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

export default class BottomNav extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Button title={this.props.leftText} onPress={this.props.leftOnPress.bind(this)} />
        <Button title={this.props.rightText} onPress={this.props.rightOnPress.bind(this)} />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 50,
    marginTop: 20
  },
  navText: {
    color: '#2196f3',
    fontSize: 16,
    textDecorationLine: 'underline'
  }
})
