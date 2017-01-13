import React, { Component } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';

export default class CustomInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.props.parent.state[this.props.id]}
        onRequestClose={() => {alert("Modal has been closed.")}}
      >
        <View style={styles.wrapper}>
          <Text style={styles.text}> { this.props.text } </Text>
        </View>
      </Modal>
    )
  }

  onChangeText(newText) {
    newState = {};
    newState[this.props.name] = newText;
    this.props.parent.setState(newState);
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center'
  }
})
