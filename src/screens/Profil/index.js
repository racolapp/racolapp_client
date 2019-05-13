import React, { Component } from "react";
import { Text, View } from "react-native";
import { globalStyles } from "../../utils/styles";

import { readStorage, removeStorage } from "../../utils/asyncStorage";

export default class EventList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    }
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
      </View>
    )
  }
}