import React, { Component } from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import axios from "axios";
import { requestLocationPermission } from "../utils/PermissionsAndroid";

// PARAMS GOOGLE PLACES AUTOCOMPLETe
// const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
// const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

export default class GoogleMaps extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.overallViewContainer}>
        <MapView
          style={styles.mapView}
          provider={PROVIDER_GOOGLE}
          region={this.props.region}
          showsMyLocationButton={false}
          showsUserLocation={true}
        />
        {/* TODO: hide when google places search is visible */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  overallViewContainer: {
    paddingTop: "10%",
    position: "relative",
    height: "100%",
    width: "100%",
    alignItems: "center"
  },
  mapView: {
    paddingTop: "10%",
    position: "relative",
    height: "100%",
    width: "100%"
  },
});
