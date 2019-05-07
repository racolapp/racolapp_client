import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Keyboard, Image } from 'react-native'
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Config from 'react-native-config'

export default class GoogleAutocomplete extends Component {

  constructor(props) {
    super(props)
    this.state = {
      latitudeDelta: this.props.location.latitudeDelta,
      longitudeDelta: this.props.location.longitudeDelta,
      displayResultGooglePlacesSearch: this.props.googlePlaces
    }
  }

  render() {
    const { displayResultGooglePlacesSearch } = this.state.displayResultGooglePlacesSearch;
    console.log(displayResultGooglePlacesSearch)
    return (
      <>
        {/* // TODO: HIDE WHEN LISTVIEW NOT VISIBLE */}

        {displayResultGooglePlacesSearch == "false" && 
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            this.setState({
              googlePlaces: {
                displayResultGooglePlacesSearch: "false"
              }
            });
          }}
        >
          <Image
            style={{ width: 25, height: 25 }}
            source={require("../../assets/img/googlePlaceSearch/leftArrow.png")}
          />
        </TouchableOpacity>}

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
          }
          onPress={(data, details = null) => {
            this.setState({
              location: {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: this.state.latitudeDelta,
                longitudeDelta: this.state.longitudeDelta
              }
            });
          }}
          getDefaultValue={() => ""}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: Config.GOOGLE_MAPS_API_KEY,
            language: "fr",
            types: "(cities)"
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
          // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          // currentLocationLabel="Position actuele"

          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        />
      </>
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