import React, {Component} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export default class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return({
      title: 'A proximité',
      headerRight: (
        <TouchableOpacity 
        title="Go to Map View"
        onPress={() => navigation.navigate('Map')}>
        <Text> Go to Map View </Text>
      </TouchableOpacity>
      ),
    })
  };


    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Welcom HOME!</Text>
        </View>
      );
    }
  }