import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

export default class Title extends Component {
  render() {
    return (
      <Text style={styles.title}>
        {this.props.text}
      </Text>
    )
  }
}


const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: 'center',
    margin: 25,
    marginVertical: 30
  }
})
