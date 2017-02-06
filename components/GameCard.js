import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class GameCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.card}>
          <Text style={styles.cardContent}> {this.cardContent()} </Text>
        </View>
      </View>
    )
  }

  cardContent() {
    if (this.props.revealed) {
      return this.props.content
    } else {
      return '...'
    }
  }
}


const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
    marginHorizontal: 50
  },
  card: {
    padding: 20,
    backgroundColor: '#ddd',
    borderRadius: 2
  },
  cardContent: {
    fontSize: 18,
    textAlign: 'center'
  }
})
