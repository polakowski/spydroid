import React, { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';

export default class CenterButton extends Component {
  render() {
    return (
      <View style={styles.buttonContainer}>
        <Button
          title={this.props.text}
          onPress={this.props.onPress}
          color={this.getColor()}
          disabled={this.props.disabled}
        />
      </View>
    )
  }

  getColor() {
    return colors[this.props.type] || colors['primary']
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingBottom: 20,
    marginHorizontal: 50
  }
})

const colors = {
  primary: '#2095f2',
  cancel: '#9d9d9d'
}
