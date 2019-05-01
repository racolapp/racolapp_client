import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export default class GoogleMaps extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        latitude: null,
        longitude: null,
        error: null,
      };
    }
  
    async componentWillMount() {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              error: null
            });
          },
          (error) => {
            this.setState({error: error.message})
          },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
      }
      
    render() {
      return (
        this.state.latitude !== null && <MapView 
            style={styles.container} 
            provider={PROVIDER_GOOGLE}
            initialRegion={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }}
            showsUserLocation={true}
        />
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