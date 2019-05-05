// TODO (Google Places):
// 1/ delete a textinput
// 2/ get long/lat from selected result
// 3/ get long/lat from current position
// 4/ show global planet if gps unauthorized
// 5/ API KEY => environment variable

import React, { Component } from "react";
import {
  Platform,
  TextInput,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import axios from "axios";
import { requestLocationPermission } from "../utils/PermissionsAndroid";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

// PARAMS GOOGLE PLACES AUTOCOMPLETe
// const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
// const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

export default class GoogleMaps extends Component {
  constructor(props) {
    super(props);

    this.apiKey = "AIzaSyDFgAr4CWPWN9jSz7Xb5AsqVn-qn6AwnqQ";

    this.state = {
      location: {
        latitude: 48.8534,
        longitude: 2.3488,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        error: null
      },
      googlePlaces: {
        displayResultGooglePlacesSearch: "false"
        // textInput: ""
      }
    };
  }

  async componentWillMount() {
    await requestLocationPermission();
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
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
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

  _renderGooglePlacesAutocomplete = () => {
    const { displayResultGooglePlacesSearch } = this.state.googlePlaces;
    return (
      <GooglePlacesAutocomplete
        placeholder="Search"
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        keyboardAppearance={"light"} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
        listViewDisplayed={displayResultGooglePlacesSearch} // true/false/undefined
        fetchDetails={true}
        renderDescription={row =>
          row.description || row.formatted_address || row.name
        } // (TODO: vérifier) custom description render
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
          // this.setState({
          //   displayResultGooglePlacesSearch: "auto"
          // });
        }}
        getDefaultValue={() => ""}
        // getDefaultValue={() => this.state.textInput}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: this.apiKey,
          language: "fr", // (TODO: vérifier) language of the results
          types: "(cities)" // default: 'geocode'
        }}
        styles={{
          textInputContainer: {
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0)",
            borderBottomWidth: 0
          },
          description: {
            fontWeight: "bold"
          },
          listView: {
            backgroundColor: "white",
            borderRadius: 10
          }
        }}
        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={
          {
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }
        }
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: "distance",
          type: "cafe"
        }}
        GooglePlacesDetailsQuery={{
          // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
          fields: "formatted_address"
        }}
        filterReverseGeocodingByTypes={[
          "locality",
          "administrative_area_level_3"
        ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        // predefinedPlaces={[homePlace, workPlace]}

        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        // TODO: pas le comportement attendu : ferme page résultats mais pas le clavier ni le curseur
        renderLeftButton={() => (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Keyboard.dismiss();
              this.setState({
                googlePlaces: {
                  displayResultGooglePlacesSearch: "false"
                }
              });
            }}
          >
            <Text> Left Button or Left Icon </Text>
          </TouchableOpacity>
        )}
        // renderRightButton={() =>
        //   <TouchableOpacity style={styles.button}
        //     onPress={() => {
        //       this.setState({textInput: ""});

        //     }}
        //   >
        //   <Text> X </Text>
        //   </TouchableOpacity>
        // }
      />
    );
  };

  render() {
    return (
      <View style={styles.overallViewContainer}>
        <MapView
          style={styles.mapView}
          provider={PROVIDER_GOOGLE}
          region={this._setRegion()}
          showsMyLocationButton={false}
          showsUserLocation={true}
        />
        {this._renderGooglePlacesAutocomplete()}

        {/* TODO: hide when google places search is visible */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={this._setLocation} style={styles.button}>
            <Text style={styles.textWhite}> MOVE TO LOCATION </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  overallViewContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
    alignItems: "center"
  },
  mapView: {
    position: "absolute",
    height: "100%",
    width: "100%"
  },
  bottomContainer: {
    position: "absolute",
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
