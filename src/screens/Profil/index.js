import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { globalStyles } from "../../utils/styles";

import { readStorage, removeStorage } from "../../utils/asyncStorage";

export default class EventList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    }
  }

  _disconnect = async () => {
    Alert.alert(
      "Êtes vous sur de vouloir vous déconnecter ?",
      [
        {
          text: "OUI",
          onPress: () => {
            removeStorage("user")
            this.location.locate('Home')
          }
        }
      ]
    );
  }

  componentWillMount = async () => {
    try {
      let userConnected = await readStorage("user");
      if (userConnected === undefined) {
        this.props.navigation.navigate('SignIn');
      } else {
        this.setState({user: userConnected.data.user})
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <View>
        <Text style={globalStyles.h2}>
          Vous êtes bien connecté {this.state.user.pseudo}
        </Text>

        <TouchableOpacity style={globalStyles.button} onPress={() => { this._disconnect() }} >
          <Text style={globalStyles.buttonText}>SE DECONNECTER</Text>
        </TouchableOpacity>
      </View>
    )
  }
}