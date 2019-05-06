import React, {Component} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import GoogleMaps from '../../components/GoogleMaps';

export default class HomeScreen extends Component {
  render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>HOME! List of results</Text>
          <TouchableOpacity 
            title="Go to Map View"
            onPress={() => {this.props.navigation.navigate('Map')}}>
            <Text> Go to Map View </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }