import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native'
import GoogleMaps from '../../components/GoogleMaps';
import GoogleAutocomplete from '../../components/GoogleAutocomplete'
import { requestLocationPermission } from "../../utils/PermissionsAndroid";


export default class MapScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: {
        latitude: 48.8534,
        longitude: 2.3488,
        latitudeDelta: 100,
        longitudeDelta: 100,
        error: null
      },
      googlePlaces: {
        displayResultGooglePlacesSearch: "false"
      }
    };
  }

  static navigationOptions = {
    title: 'A proximité',
  };

  async componentWillMount() {
    if (Platform.OS == "android") {
      await requestLocationPermission();
      this._setLocation();
    }
  }

  _setLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
            error: null
          }
        });
        console.log(position);
      },
      error => {
        this.setState({
          error: error.message
        });
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
  };

  _setRegion = () => {
    const {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta
    } = this.state.location;
    return { latitude, longitude, latitudeDelta, longitudeDelta };
  };


  render() {
    return (
      <>
        <GoogleAutocomplete googlePlaces={this.state.googlePlaces} location={this.state.location} />
        <GoogleMaps region={this._setRegion()} />
        {/* TODO: Hide when GoogleAutocomplete search list is active */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={this._setLocation} style={styles.button}>
            <Text style={styles.textWhite}> MOVE TO LOCATION </Text>
          </TouchableOpacity>
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  bottomContainer: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    bottom: 25
  },
  button: {
    alignItems: "center",
    backgroundColor: "#ff6600",
    borderRadius: 10,
    height: 40,
    padding: 10,
    shadowOpacity: 0.75,
    shadowRadius: 1,
    shadowColor: "gray"
  },
  textWhite: {
    color: "white"
  }
});
