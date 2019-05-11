import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { globalStyles, styleMainColor } from "../utils/styles";

class EventAbstractWithMap extends Component {
  render() {
    let { id, longitude, latitude, title, description } = this.props;
    return (
      <View
        style={{
          backgroundColor: styleMainColor,
          marginBottom: 10,
          padding: 20
        }}
      >
        <Text style={styles.title}>{title}</Text>
        {/* <Text style={styles.text}>{description}</Text> */}
      </View>
    );
  }
}

export default EventAbstractWithMap;

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10
  },
  text: {
    color: "white",
    fontSize: 15,
    textAlign: "center"
  }
});
