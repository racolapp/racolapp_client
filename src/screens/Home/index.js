import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Platform
} from "react-native";
import EventAbstract from "../../components/EventAbstract";
import { globalStyles, styleMainColor } from "../../utils/styles";
import { requestLocationPermission } from "../../utils/PermissionsAndroid";
import { connect } from "react-redux";


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

class HomeScreen extends Component {
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
    this._events = jsonFetched; // TODO: temporaire à remplacer par this._events = [] quand api OK
  }

  async componentWillMount() {
    if (Platform.OS == "android") {
      await requestLocationPermission();
      this._setLocation();
    }
  }

  _setLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const action = {
          type: "SET_LOCATION",
          value: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }
        };
        this.props.dispatch(action);
      },
      error => {console.log(`ERROR IN GETTING LOCATION: ${error.message}`)},
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
  };

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
          const { id, longitude, latitude, title, description } = item;
          return (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("SingleEventDetails", {
                  id,
                  longitude,
                  latitude,
                })
              }
            >
              <View style={styles.itemRendered}>
                <EventAbstract
                  id={id}
                  longitude={longitude}
                  latitude={latitude}
                  title={title}
                  description={description}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  render() {
    return this._renderListEvents();
  }
}

const mapStateToProps = state => {
  return { location: state.location };
};
export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({
  itemRendered: {
    margin: 15,
    padding: 5,
    backgroundColor: styleMainColor,
    borderRadius: 15
  },
  row: {
    flex: 1,
    justifyContent: "space-around"
  }
});
