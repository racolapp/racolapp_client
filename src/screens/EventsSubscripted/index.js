import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import EventAbstract from "../../components/EventAbstract";
import { globalStyles, styleMainColor } from "../../utils/styles";

const jsonFetched = [
  {
    id: 1,
    title: "This is a title 1",
    description: "This is a description"
  },
  {
    id: 2,
    title: "This is a title 2",
    description: "This is a description"
  },
  {
    id: 3,
    title: "This is a title 3",
    description: "This is a description"
  }
];
export default class EventsSubscriptedScreen extends Component {
  static navigationOptions = {
    title: "MES PARTICIPATIONS"
  };

  constructor(props) {
    super(props);
    this._events = jsonFetched; // TODO: temporaire à remplacer par this._events = [] quand api OK
  }

  _renderListEvents = () => (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={this._events}
      keyExtractor={singleEvent => singleEvent.id.toString()}
      renderItem={({ item }) => {
        const { id, title, description } = item;
        return (
          <EventAbstract id={id} title={title} description={description} />
        );
      }}
    />
  );

  render() {
    return <>{this._renderListEvents()}</>;
  }
}
