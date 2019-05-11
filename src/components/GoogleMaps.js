import React, { Component } from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import PropTypes from "prop-types";
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
    height: "100%",
    width: "100%"
  },
});

GoogleMaps.propTypes = {
  region: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      latitude: PropTypes.number.isRequired,
      latitudeDelta: PropTypes.number.isRequired,
      longitudeDelta: PropTypes.number.isRequired,
    })
}
