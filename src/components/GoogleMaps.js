import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {requestLocationPermission} from '../utils/PermissionsAndroid';

export default class GoogleMaps extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        latitude: null,
        longitude: null,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        error: null,
      };
    }
  
    // Question: DidMount?
    async componentWillMount() {
        await requestLocationPermission();
        this.setLocation();
    }
    
    setLocation = () => {

        // TODO: obtenir les deltas pour conserver echelle

        navigator.geolocation.getCurrentPosition(
            (position) => {
              this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: this.state.latitudeDelta,
                longitudeDelta: this.state.longitudeDelta,
                error: null
              });
              console.log(position)
            },
            (error) => {
              this.setState({error: error.message})
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
          );
    }

    setRegion = () => ({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: this.state.latitudeDelta,
        longitudeDelta: this.state.longitudeDelta
    })

    render() {
      return (
        this.state.latitude !== null && <>
            <MapView 
                style={styles.container} 
                provider={PROVIDER_GOOGLE}
                region={this.setRegion()}
                showsUserLocation={true}
            />
            <TouchableOpacity onPress={this.setLocation} style={styles.button}>
                <Text> MOVE TO LOCATION </Text>
            </TouchableOpacity>
        </>
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
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
      }
  });