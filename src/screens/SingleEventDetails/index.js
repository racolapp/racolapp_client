import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import GoogleMaps from '../../components/GoogleMaps';
import { TouchableOpacity, } from 'react-native-gesture-handler';


const jsonFetched = {
  lat: 48.8534,
  long: 2.3488,
}

export default class SingleEventDetailsScreen extends Component {
  static navigationOptions = {
    title: 'Evènement',
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
          <Text style={styles.h2}>DESCRIPTIF</Text>
        </View>
        <View style = {{flex: 1}}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textWhite}>S'INSCRIRE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2699FB",
    borderRadius: 5,
    // height: 40,
    // padding: 10,
    // shadowOpacity: 0.75,
    // shadowRadius: 1,
    // shadowColor: "gray"
  },
  textWhite: {
    color: "white"
  },
  h2: {
    color: "#2699FB",
    fontWeight: "bold"
  }
});


