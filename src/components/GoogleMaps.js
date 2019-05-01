import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {PermissionsAndroid} from 'react-native';

// ANDROID PERMISSION FOR API >= 23
async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

export default class GoogleMaps extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        latitude: null,
        longitude: null,
        error: null,
      };
    }
  
    async componentWillMount(){
      await requestLocationPermission()
    }
  
    componentDidMount() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("latitude: " + position.coords.latitude);
          console.log("longitude: " + position.coords.longitude);
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null
          })
        },
        (error) => {
            console.log("ERROR");
            this.setState({error: error.message});
            
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    }
  
    render() {
      return (
        <View style={styles.container}>
        {this.state.latitude !== null && <MapView 
          style={styles.container} 
          provider={PROVIDER_GOOGLE}
          initialRegion={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01
            }}
            showsUserLocation={true}
            />}
            </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });