import React, { Component } from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export default class GoogleMaps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      markers: this.props.markers,
    };
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
        >

        {this.state.markers.map((marker, index) => {
          const coords = {
            latitude: marker.latitude,
            longitude: marker.longitude,
          };

          console.log("ok");

          const metadata = `${marker.statusValue}`;

          return (
            <MapView.Marker
              key={index}
              coordinate={coords}
              title={marker.title}
              description={metadata}
              onPress={() => {console.log('coucou')}}
              onCalloutPress={() => {this.props.navigation.navigate('Home')}}
            />
          );
        })}
      </MapView>
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
