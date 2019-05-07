import React, { Component } from 'react';
import { Text, View } from 'react-native';
import GoogleMaps from '../../components/GoogleMaps';
import { TouchableOpacity, } from 'react-native-gesture-handler';
import {globalStyles} from '../../utils/styles';


const jsonFetched = {
  lat: 48.8534,
  long: 2.3488,
}

export default class SingleEventDetailsScreen extends Component {
  static navigationOptions = {
    title: 'EVENEMENT',
  };

  _setRegion = () => {
    const { lat, long } = jsonFetched;
    return {
      latitude: lat,
      longitude: long,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    };
  };

  render() {
    return (
    <View style={{ flex: 1, height: "100%", justifyContent: 'center', alignItems: 'center', }}>
      <View style = {{flex:3, width: "100%"}} >
        <GoogleMaps region={this._setRegion()} />
      </View>
        <View style = {{flex: 2}}>
          <Text style={globalStyles.h2}>DESCRIPTIF</Text>
        </View>
        <View style = {{flex: 1}}>
          <TouchableOpacity style={globalStyles.button}>
            <Text style={globalStyles.buttonText}>S'INSCRIRE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}