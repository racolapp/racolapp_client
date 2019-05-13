import React, { Component } from "react";
import EventList from "../../components/EventList";

const jsonFetched = [
  {
    ID: 1,
    name: "This is a title 1",
    description: "This is a description"
  },
  {
    ID: 2,
    name: "This is a title 2",
    description: "This is a description"
  },
  {
    ID: 3,
    name: "This is a title 3",
    description: "This is a description"
  }
];
export default class EventsSubscriptedScreen extends Component {
  static navigationOptions = {
    title: "MES PARTICIPATIONS"
  };

  constructor(props) {
    super(props);
    this.events = jsonFetched; // TODO: temporaire à remplacer par this._events = [] quand api OK (passer par state ??)
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
    return <EventList events={this.events}/>
  }
}
