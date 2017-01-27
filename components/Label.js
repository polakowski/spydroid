import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

export default class Label extends Component {
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
    fontSize: 16,
    marginBottom: 10,
    marginHorizontal: 50
  }
})
