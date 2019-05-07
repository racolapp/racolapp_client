import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import GoogleMaps from '../../components/GoogleMaps';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Config from 'react-native-config'

export default class HomeScreen extends Component {
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

  _renderGooglePlacesAutocomplete = () => {
    const { displayResultGooglePlacesSearch } = this.state.googlePlaces;
    const { latitudeDelta, longitudeDelta } = this.state.location;
    return (
      <GooglePlacesAutocomplete
        placeholder="Search"
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        keyboardAppearance={"light"} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
        listViewDisplayed={displayResultGooglePlacesSearch} // true/false/undefined
        fetchDetails={true}
        enablePoweredByContainer={false}
        renderDescription={row =>
          row.description || row.formatted_address || row.name
        } // (TODO: vérifier) custom description render
        onPress={(data, details = null) => {
          this.setState({
            location:{
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta,
              longitudeDelta
            }
          });
        }}
        getDefaultValue={() => ""}
        // getDefaultValue={() => this.state.textInput}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: Config.GOOGLE_MAPS_API_KEY,
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
        currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
        // // currentLocationLabel="Current location"
        // nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        // GoogleReverseGeocodingQuery={
        //   {
        //     // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        //   }
        // }
        // GooglePlacesSearchQuery={{
        //   // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        //   rankby: "distance",
        //   type: "cafe"
        // }}
        // GooglePlacesDetailsQuery={{
        //   // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
        //   fields: "formatted_address"
        // }}
        // filterReverseGeocodingByTypes={[
        //   "locality",
        //   "administrative_area_level_3"
        // ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        // // predefinedPlaces={[homePlace, workPlace]}

        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
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
      />
    );
  };
  render(){
    return (
      <>
        {this._renderGooglePlacesAutocomplete()}
        {/* ATTENTION: le component GoogleMaps n'affichera rien si wrappé dans autre chose que des chevrons vides */}
        <GoogleMaps region={this._setRegion()}/>
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
