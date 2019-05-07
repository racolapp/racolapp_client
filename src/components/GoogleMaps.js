import React, { Component } from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export default class GoogleMaps extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <MapView
          style={styles.mapView}
          provider={PROVIDER_GOOGLE}
          region={this.props.region}
          showsMyLocationButton={false}
          showsUserLocation={true}
        />
    );
  }
}

const styles = StyleSheet.create({
  mapView: {
    position: "absolute",
    // paddingTop: "10%",
    height: "100%",
    width: "100%"
  },
});
