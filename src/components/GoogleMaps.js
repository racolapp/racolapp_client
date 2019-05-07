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
      <View style={styles.overallViewContainer}>
        <MapView
          style={styles.mapView}
          provider={PROVIDER_GOOGLE}
          region={this.props.region}
          showsMyLocationButton={false}
          showsUserLocation={true}
        />
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
