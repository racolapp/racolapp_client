import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {
  setStorage,
  readStorage,
  removeStorage
} from "../../utils/asyncStorage";
import { globalStyles, styleMainColor } from "../../utils/styles";

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
      pseudo: "",
      password: ""
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
      // await readStorage("user");
      // await removeStorage("user");
      // await readStorage("user");
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center"
        }}
        behavior="height"
        enabled
      >
        <View
          style={{
            flex: 0.5,
            backgroundColor: styleMainColor,
            width: "100%",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>RACOLAPP</Text>
        </View>

        <View
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "center"
          }}
        >
          <View style={styles.buttonOnTop}>
            <TextInput
              style={globalStyles.textInputLightRound}
              placeholder="Enter your email"
              placeholderTextColor={styleMainColor}
              onChangeText={pseudo => (this.setState({pseudo}))}
              value={this.state.pseudo}
              // onSubmitEditing = {() => this.showMovies()}
            />
          </View>

          <View style={styles.buttonOnBottom}>
            <TextInput
              style={globalStyles.textInputLightRound}
              placeholder="Enter your password"
              placeholderTextColor={styleMainColor}
              type="password"
              onChangeText={password => (this.setState({password}))}
              value={this.state.password}
              secureTextEntry={true}
              // onSubmitEditing = {() => this.showMovies()}
            />
          </View>
        </View>

        <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
        <View style={styles.buttonOnTop}>
            <TouchableOpacity
              style={globalStyles.button}
              onPress={() => {
                this._login(userToSave);
              }}
            >
              <Text style={globalStyles.buttonText}> CONTINUE </Text>
            </TouchableOpacity>
          </View>

          {/* TODO ???? */}
          {/* <TouchableOpacity
          onPress={() => {
            this._login(userToSave);
          }}
        >
          <Text> Mot de passe oublié? </Text>
        </TouchableOpacity> */}

          <View style={styles.buttonOnBottom}>
            <TouchableOpacity
              style={globalStyles.buttonLight}
              onPress={() => {
                this.props.navigation.navigate("SignUp");
              }}
            >
              <Text style={globalStyles.buttonLightText}>
                {" "}
                CREATE AN ACCOUNT{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  buttonOnTop: {
    flex: 1,
    width: "90%",
    borderColor: styleMainColor,
    justifyContent: "flex-end"
  },
  buttonOnBottom: {
    flex: 1,
    width: "90%",
    borderColor: styleMainColor,
    justifyContent: "flex-start"
  },
})
