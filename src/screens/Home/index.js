import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Dimensions
} from "react-native";
import EventAbstract from "../../components/EventAbstract";

const jsonFetched = [
  {
    id: 1,
    longitude: 2.3488,
    latitude: 48.8534,
    title: "This is a title 1",
    description: "This is a description"
  },
  {
    id: 2,
    longitude: 2,
    latitude: 48,
    title: "This is a title 2",
    description: "This is a description"
  },
  {
    id: 3,
    longitude: 2.5,
    latitude: 49,
    title: "This is a title 3",
    description: "This is a description"
  }
];

export default class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "A PROXIMITE",
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate("Map")}>
          <Image
            style={{
              width: 25,
              height: 25,
              marginRight: 10
            }}
            source={require("../../../assets/img/map.png")}
          />
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
        numColumns={2}
        columnWrapperStyle={styles.row}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        data={this._events}
        keyExtractor={singleEvent => singleEvent.id.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.itemRendered}>
              <EventAbstract
                id={item.id}
                longitude={item.longitude}
                latitude={item.latitude}
                title={item.title}
                description={item.description}
              />
            </View>
          );
        }}
      />
    );
  };

  render() {
    return (
        this._renderListEvents()
    );
  }
}

const styles = StyleSheet.create({
  itemRendered: {
    margin: 15,
    padding: 5,
    width: "40%",
    height: 150,
    backgroundColor: "#DADADA",
    borderRadius: 15
  },
  row:{
    flex: 1,
    justifyContent: "space-around",
  }
});
