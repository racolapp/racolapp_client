import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import GoogleMaps from "../../components/GoogleMaps";
import GoogleAutocomplete from "../../components/GoogleAutocomplete";
import { connect } from "react-redux";

const data = [
  {
    "longitude": 2.5,
    "latitude": 48.8534,
    "title": "EventA",
    "statusValue": "ready"
  },
  {
    "longitude": 2.3488,
    "latitude": 48.8,
    "title": "EventB",
    "statusValue": "ready"
  },
  {
    "longitude": 2.8,
    "latitude": 48.9,
    "title": "EventC",
    "statusValue": "ready"
  },
  {
    "longitude": 2.7,
    "latitude": 48.8,
    "title": "EventD",
    "statusValue": "ready"
  },
  {
    "longitude": 2.3488,
    "latitude": 48.8534,
    "title": "EventE",
    "statusValue": "ready"
  },
  {
    "longitude": 2.3,
    "latitude": 48.9,
    "title": "EventF",
    "statusValue": "ready"
  }, 
]
const jsonRender = data

class MapScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      googlePlaces: {
        displayResultGooglePlacesSearch: "false"
      }
    };
  }

  static navigationOptions = {
    title: "A PROXIMITE"
  };

  componentDidMount() {
    this._setRegion();
  }

  _setRegion = () => {
    const {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta
    } = this.props.location;
    return { latitude, longitude, latitudeDelta, longitudeDelta };
  };


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

  render() {
    return (
      <View style={styles.overallViewContainer}>
        <GoogleMaps region={this._setRegion()} markers={jsonRender} />
        <View style={{ height: "10%" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 15
            }}
          >
            <GoogleAutocomplete />
            <View style={{ marginRight: 15 }}>
              <TouchableOpacity onPress={this._setLocation}>
                <Image
                  style={{ width: 25, height: 25 }}
                  source={require("../../../assets/img/googlePlaceSearch/gpsIndicator.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { location: state.location };
};
export default connect(mapStateToProps)(MapScreen);

const styles = StyleSheet.create({
  overallViewContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
    flex: 1
  }
});
