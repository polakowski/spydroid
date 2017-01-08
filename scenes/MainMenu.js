import React, { Component } from 'react';
import { BackAndroid, View, StyleSheet } from 'react-native';

import Title from '../components/Title';
import CenterButton from '../components/CenterButton';

export default class MainScene extends Component {
  static get defaultProps() {
    return {
      title: 'Initial Scene'
    };
  }

  constructor(props) {
   super(props);
   this.state = {
     titles: {
       newGame: 'New game',
       exit: 'Quit Application'
     }
   };
  }

  render() {
    titles = this.state.titles
    return (
      <View style={styles.buttonsWrapper}>
        <Title text='Spydroid.' />
        <CenterButton text={titles.newGame} onPress={this.goToRoute.bind(this, 'playersSetup')} />
        <CenterButton text={titles.exit} onPress={BackAndroid.exitApp} />
      </View>
    )
  }

  goToRoute = (newRoute) => {
    this.props.nav.resetTo({ id: newRoute });
  }
}

const styles = StyleSheet.create({
  buttonsWrapper: {
    paddingHorizontal: 50
  }
})
