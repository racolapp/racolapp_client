import React, {Component} from 'react';
import { Text, View  } from 'react-native';

export default class SignUpScreen extends Component {
  static navigationOptions = {
    title: 'INSCRIPTION',
    headerRight: (<View></View>) // To perfectly center title with back chevron
  };

    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Sign Up!</Text>
        </View>
      );
    }
  }