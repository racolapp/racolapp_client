import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Config from 'react-native-config'

export default class GoogleAutocomplete extends Component {

  constructor (props) {
    super(props)

    // const { displayResultGooglePlacesSearch } = this.state.googlePlaces;
    // const { latitudeDelta, longitudeDelta } = this.state.location;

    this.state = {
      latitudeDelta: this.props.location.latitudeDelta,
      longitudeDelta: this.props.location.longitudeDelta,
      displayResultGooglePlacesSearch: this.props.googlePlaces
    }
  }

  render() {
    return (
      <GooglePlacesAutocomplete
        placeholder="Search"
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        keyboardAppearance={"light"} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
        listViewDisplayed={this.state.displayResultGooglePlacesSearch} // true/false/undefined
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
              latitudeDelta: this.state.latitudeDelta,
              longitudeDelta: this.state.longitudeDelta
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
  }
};

const styles = StyleSheet.create({
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
});