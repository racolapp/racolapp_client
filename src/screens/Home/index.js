import React, { Component } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import EventAbstract from "../../components/EventAbstract";

const jsonFetched = [
  {
    id: 1,
    longitude: 2.3488,
    latitude: 48.8534,
    title: "This is a title",
    description: "This is a description"
  },
  {
    id: 2,
    longitude: 2,
    latitude: 48,
    title: "This is a title",
    description: "This is a description"
  },
  {
    id: 3,
    longitude: 2.5,
    latitude: 49,
    title: "This is a title",
    description: "This is a description"
  }
];

export default class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "A PROXIMITE",
      headerRight: (
        <TouchableOpacity
          title="Go to Map View"
          onPress={() => navigation.navigate("Map")}
        >
          <Text> Go to Map View </Text>
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);

    this._events = jsonFetched; // temporaire à remplacer par this._events = [] quand api OK
  }

  // TODO
  _loadEvents = () => {
    // TODO: requete AXIOS
    // TODO: setState this._events
  };

  _renderListEvents = () => {
    return (
      <FlatList
        data={this._events}
        keyExtractor={singleEvent => singleEvent.id.toString()}
        renderItem={({ item }) => {
          return (
              <EventAbstract
                id={item.id}
                longitude={item.longitude}
                latitude={item.latitude}
                title={item.title}
                numColumns={2}
                description={item.description}
              />
          );
        }}
      />
    );
  };

  render() {
    return (
      <>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center"}}
          >
          {this._renderListEvents()}
          <Text>Welcome HOME!</Text>
          <TouchableOpacity
            title="Go to Map View"
            onPress={() => this.props.navigation.navigate("SingleEventDetails")}
          >
            <Text> Go to Single Event Detais View </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}
