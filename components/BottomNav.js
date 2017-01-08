import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';

export default class BottomNav extends Component {
  defaultProps() {
    return {
    }
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <TouchableHighlight onPress={this.props.leftOnPress.bind(this)}>
          <Text style={styles.navText}>
            {this.props.leftText}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.props.rightOnPress.bind(this)}>
          <Text style={styles.navText}>
            {this.props.rightText}
          </Text>
        </TouchableHighlight>
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
