import React, { Component } from "react";
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from "react-native";
import {
  setStorage,
  readStorage,
  removeStorage
} from "../../utils/asyncStorage";

export default class App extends Component {
  renderItem({ item, index }) {
    return (
      <View
        style={{
          flex: 1,
          margin: 5,
          minWidth: 170,
          maxWidth: 223,
          height: 304,
          maxHeight: 304,
          backgroundColor: "#CCC"
        }}
      />
    );
  }

  _read = async () => {
    console.log("HELLO SIGN UP!");
    await readStorage("user");
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>SIGN UP!</Text>
        <TouchableOpacity
          onPress={() => {
            this._read();
          }}
        >
          <Text> TEST HERE </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap"
  }
});

//// ----------------- SAVE -----------------------------------------
// import React, {Component} from 'react';
// import { Text, View  } from 'react-native';
// export default class SignUpScreen extends Component {
//   static navigationOptions = {
//     title: 'INSCRIPTION',
//     headerRight: (<View></View>) // To perfectly center title with back chevron
//   };

//     render() {
//       return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <Text>Sign Up!</Text>
//         </View>
//       );
//     }
//   }
