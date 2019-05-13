import React, { Component } from "react";
import EventList from "../../components/EventList";

import { readStorage } from "../../utils/asyncStorage";

export default class EventsSubscriptedScreen extends Component {
  static navigationOptions = {
    title: "MES PUBLICATIONS"
  };

  constructor(props) {
    super(props);

    this.state = {
      token: "",
      userID: ""
    }
    this.events = []; // TODO: temporaire à remplacer par this._events = [] quand api OK (passer par state ??)
  }

  

  fetchData = async () => {
    // // TODO: fetch ..................
    let user = await readStorage("user")

    this.setState({ token: user.meta.token, userID: user.data.user.ID})

    const response = await fetch(`https://racolapp.herokuapp.com/events/userID/${user.data.user.ID}`, {
      headers: {
        "Content-Type": "application/json",
        "authorization": user.meta.token
      },
      method: "GET",
      body: JSON.stringify(this.state)
    });

    console.log('=======================================================')

    const json = await response.json();

    if (json.error) {
      Alert.alert(
        "Erreur d'authentification",
        json.error,
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
      console.log(json)
      return json.data;
    }
  };

  componentWillMount = async () => {
    try {
      let userConnected = await readStorage("user");
      console.log(userConnected)
      if (userConnected === undefined) {
        this.props.navigation.navigate('SignIn');
      } else {
        this.setState({user: userConnected.data.user})
      }
    } catch (error) {
      console.log('catch eventposted')
      console.log(error)
    }
  }

  render() {
    return <EventList events={ () => { fetchData() }}/>
  }
}
