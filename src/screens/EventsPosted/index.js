import React, {Component} from 'react';
import { Text, View  } from 'react-native';

export default class EventsPostedScreen extends Component {
  static navigationOptions = {
    title: 'MES PUBLICATIONS',
  };

    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Posted events!</Text>
        </View>
      );
    }
  }