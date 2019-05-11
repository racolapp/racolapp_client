import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView
} from "react-native";
import {
  setStorage,
  readStorage,
  removeStorage
} from "../../utils/asyncStorage";
import { globalStyles, styleMainColor } from "../../utils/styles";

export default class App extends Component {
  static navigationOptions = {
    title: "INSCRIPTION"
  };

  constructor(props) {
    super(props);
    this.state = {
      pseudo: "",
      mail: "",
      password: "",
      birthday: "",
      country: "",
      state: "",
      city: ""
      // errorOnLog: false
    };
  }

  _read = async () => {
    console.log("HELLO SIGN UP!");
    await readStorage("user");
  };

  render() {
    return (
      <ScrollView
        style={{ marginTop: 10, marginLeft: 20, marginRight: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={globalStyles.h3}>Nom complet</Text>
        <TextInput
          style={globalStyles.textInputLightRectangular}
          placeholder="Nom complet"
          placeholderTextColor={styleMainColor}
          onChangeText={pseudo => this.setState({ pseudo })}
          value={this.state.pseudo}
        />
        <Text style={globalStyles.h3}>Email</Text>
        <TextInput
          style={globalStyles.textInputLightRectangular}
          placeholder="Email"
          placeholderTextColor={styleMainColor}
          onChangeText={mail => this.setState({ mail })}
          value={this.state.mail}
        />
        <Text style={globalStyles.h3}>Password</Text>
        <TextInput
          style={globalStyles.textInputLightRectangular}
          placeholder="Mot de passe"
          placeholderTextColor={styleMainColor}
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />

        {/* DETAILS SECTION */}
        <Text style={globalStyles.h2}>Informations personnelles</Text>
        <Text style={globalStyles.h3}>Date de naissance</Text>
        <TextInput
          style={globalStyles.textInputLightRectangular}
          placeholder="Mot de passe"
          placeholderTextColor={styleMainColor}
          onChangeText={birthday => this.setState({ birthday })}
          value={this.state.birthday}
        />
        <Text style={globalStyles.h3}>Nationalité</Text>
        <TextInput
          style={globalStyles.textInputLightRectangular}
          placeholder="Mot de passe"
          placeholderTextColor={styleMainColor}
          onChangeText={country => this.setState({ country })}
          value={this.state.country}
        />
        <Text style={globalStyles.h3}>Département</Text>
        <TextInput
          style={globalStyles.textInputLightRectangular}
          placeholder="Mot de passe"
          placeholderTextColor={styleMainColor}
          onChangeText={state => this.setState({ state })}
          value={this.state.state}
        />
        <Text style={globalStyles.h3}>Ville</Text>
        <TextInput
          style={globalStyles.textInputLightRectangular}
          placeholder="Mot de passe"
          placeholderTextColor={styleMainColor}
          onChangeText={city => this.setState({ city })}
          value={this.state.city}
        />
        <TouchableOpacity
          style={globalStyles.button}
          // onPress={() => {
          //   this._login(userToSave);
          // }}
        >
          <Text style={globalStyles.buttonText}> VALIDER </Text>
        </TouchableOpacity>
      </ScrollView>
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
