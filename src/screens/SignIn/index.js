import React, { Component } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { setStorage, readStorage, removeStorage } from "../../utils/asyncStorage";

const urlLogin = "http://localhost:4242/api/auth/login";

const userToSave = {
  ID: 1,
  pseudo: "User1",
  mail: "mail@user1.net",
  password: "psswrd",
  active: 1,
  premium: 0,
  img_profil: "url",
  created_at: "2019-05-06T00:00:00.000Z",
  updated_at: "2019-05-06T00:00:00.000Z"
};

const json2 = "json";
export default class SignInScreen extends Component {
  static navigationOptions = {
    title: "CONNEXION"
  };

  constructor(props) {
    super(props);
    this.state = {
      pseudo: "mytest",
      password: "mypassword"
      // errorOnLog: false
    };
  }

  _login = async json => {
    // // TODO: fetch ..................
    // const response = await fetch(urlLogin, {
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   method: "POST",
    //   body: JSON.stringify(this.state)
    // });

    // const json = await response.json();

    // ERROR
    // if (json.error) {
    if (1 == 2) {
      Alert.alert(
        "Erreur d'authentification",
        "Mot de passe ou identifiant incorrect",
        [
          {
            text: "OK",
            onPress: () => console.log("Authentification error - OK pressed")
          }
        ]
      );
    }
    // I'M CONNECTED
    else {
      await setStorage("user", json);
      // TODO: supprimer (pour le test)
      await readStorage("user");
      // await removeStorage("user");
      // await readStorage("user");
    }
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>HOME! List of results</Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("SignUp");
          }}
        >
          <Text> Go to Sign Up </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this._login(userToSave);
          }}
        >
          <Text> TEST HERE </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
