import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import Label from '../components/Label'

export default class CustomInput extends Component {
  defaultProps() {
    return {
      label: ''
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  render() {
    return (
      <View>
        <Label text={this.props.label} />
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            onChangeText={this.onChangeText.bind(this)}
          />
        </View>
      </View>
    )
  }

  onChangeText(newText) {
    newState = {};
    newState[this.props.name] = newText;
    this.props.parent.setState(newState);
  }
}

const styles = StyleSheet.create({
  inputWrapper: {
    marginHorizontal: 50,
    marginTop: -5,
    marginBottom: 20
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
})
