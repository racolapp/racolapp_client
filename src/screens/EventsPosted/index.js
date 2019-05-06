import React, {Component} from 'react';
import { Text, View  } from 'react-native';

export default class EventsPostedScreen extends Component {
  static navigationOptions = {
    title: 'Mes publications',
  };

    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Posted events!</Text>
        </View>
      );
    }
  }