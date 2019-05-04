import React, { Component } from "react";
import {
  Platform,
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import axios from "axios";
import { requestLocationPermission } from "../utils/PermissionsAndroid";

export default class GoogleMaps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationInput: "",
      latitude: null,
      longitude: null,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
      error: null
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
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: this.state.latitudeDelta,
          longitudeDelta: this.state.longitudeDelta,
          error: null
        });
        console.log(position);
      },
      error => {
        this.setState({ error: error.message });
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  setRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: this.state.latitudeDelta,
    longitudeDelta: this.state.longitudeDelta
  });

  handleSubmit = () => {
    const ApiKey = "AIzaSyDFgAr4CWPWN9jSz7Xb5AsqVn-qn6AwnqQ";
    console.log("HANDLE SUBMIT");
    axios
      .get(
        "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" +
          this.state.locationInput +
          "&inputtype=textquery" +
          "&fields=formatted_address,name" +
          "&key=" +
          ApiKey
      )
      .then(response => {
        console.log("RESPONSE: ");
        console.log(response);
      })
      .catch(error => console.log("Get google places failed: ", error));
  };

  render() {
    return (
      this.state.latitude !== null && (
          <View style={styles.overallViewContainer}>
            <MapView
              style={styles.mapView}
              provider={PROVIDER_GOOGLE}
              region={this.setRegion()}
              showsMyLocationButton={false}
              showsUserLocation={true}
            />
            <View style={styles.allNonMapComponentsContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Where?"
                  style={styles.input}
                  onChangeText={locationInput =>
                    this.setState({ locationInput })
                  }
                  value={this.state.locationInput}
                  onSubmitEditing={() => this.handleSubmit()}
                />
              </View>
              <View style={styles.bottomContainer}>
                <TouchableOpacity
                  onPress={this.setLocation}
                  style={styles.button}
                >
                  <Text style={styles.textWhite}> MOVE TO LOCATION </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  overallViewContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  mapView: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  allNonMapComponentsContainer: {
    height: "100%",
    width: "100%",
    alignItems: "center"
  },
  inputContainer: {
    backgroundColor: "white",
    width: "90%",
    top: 25,
    borderRadius: 7,
    shadowOpacity: 0.75,
    shadowRadius: 1,
    shadowColor: "gray",
  },
  input: {
    width: "99%",
    marginLeft: 10,
    marginRight: 10
  },
  bottomContainer:{
    position: "absolute",
    bottom: 25,
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
