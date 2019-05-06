import React, { Component } from "react";
import { Text, View } from "react-native";
import GoogleMaps from "../../components/GoogleMaps";

export default class MapScreen extends Component {
  static navigationOptions = {
    title: "A proximité",
    headerRight: (<View></View>) // To perfectly center title with back chevron
  };

  render() {
    return (
      <>
        {/* ATTENTION: le component GoogleMaps n'affichera rien si wrappé dans autre chose que des chevrons vides */}
        <GoogleMaps />
      </>
    );
  }
}
