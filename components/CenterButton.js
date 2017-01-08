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
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  buttonContainer: {
    paddingBottom: 20
  },
  button: {
    
  }
})
