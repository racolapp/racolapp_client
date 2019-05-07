import React, {Component} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export default class SignInScreen extends Component {
  static navigationOptions = {
    title: 'CONNEXION',
  };

    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>HOME! List of results</Text>
          <TouchableOpacity 
            title="Go to Map View"
            onPress={() => {this.props.navigation.navigate('SignUp')}}>
            <Text> Go to Map Sign Up </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }