import React, { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';

export default class CenterButton extends Component {
  defaultProps() {
    return {
      text: 'Unnamed'
    }
  }

  render() {
    return (
      <View style={styles.buttonContainer}>
        <Button
          title={this.props.text}
          onPress={this.props.onPress}
          style={styles.button}
          disabled={this.props.disabled}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  buttonContainer: {
    paddingBottom: 20,
    marginHorizontal: 50
  },
  button: {

  }
})
