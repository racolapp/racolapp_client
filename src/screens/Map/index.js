import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, Image } from 'react-native'
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
    }
    this._setLocation();
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
      <View style={styles.overallViewContainer}>
        <GoogleMaps region={this._setRegion()} />
        <View style={{ height: "10%" }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center", marginLeft: 15 }}>
            <GoogleAutocomplete googlePlaces={this.state.googlePlaces} location={this.state.location} />
            <View style={{ marginRight: 15}}>
              <TouchableOpacity onPress={this._setLocation} >
                <Image
                  style={{ width: 25, height: 25 }}
                  source={require("../../../assets/img/googlePlaceSearch/gpsIndicator.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  overallViewContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
    flex: 1,
    // alignItems: "center"
  },
});