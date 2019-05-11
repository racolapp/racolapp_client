import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  Image
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Config from "react-native-config";

export default class GoogleAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitudeDelta: this.props.location.latitudeDelta,
      longitudeDelta: this.props.location.longitudeDelta,
      displayResultGooglePlacesSearch: this.props.googlePlaces
    };
  }

  _renderGooglePlacesAutocomplete = () => (
    <GooglePlacesAutocomplete
      placeholder="Search"
      minLength={2}
      autoFocus={false}
      returnKeyType={"search"}
      keyboardAppearance={"light"}
      listViewDisplayed={this.state.displayResultGooglePlacesSearch}
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
      currentLocation={false}
      debounce={200}
    />
  );

  _renderHideGooglePlacesResult = () => (
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
    </TouchableOpacity>
  );

  render() {
    const {
      displayResultGooglePlacesSearch
    } = this.state.displayResultGooglePlacesSearch;
    console.log(displayResultGooglePlacesSearch);
    return (
      <>
        {displayResultGooglePlacesSearch == "false" &&
          this._renderHideGooglePlacesResult()}
        {this._renderGooglePlacesAutocomplete()}
      </>
    );
  }
}
