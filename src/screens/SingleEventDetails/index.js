import React, { Component } from "react";
import { Text, View } from "react-native";
import GoogleMaps from "../../components/GoogleMaps";
import { TouchableOpacity } from "react-native-gesture-handler";
import { globalStyles } from "../../utils/styles";
import moment from "moment";

export default class SingleEventDetailsScreen extends Component {
  static navigationOptions = {
    title: "EVENEMENT"
  };

  constructor(props) {
    super(props);
  }

  _setRegion = () => {
    const { longitude, latitude } = this.props.navigation.state.params;
    return {
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    };
  };

  render() {
    const { marker, description, date } = this.props.navigation.state.params
    return (
      <View
        style={{
          flex: 1,
          height: "100%",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View style={{ flex: 3, width: "100%" }}>
          <GoogleMaps
            region={this._setRegion()}
            markers={marker}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={globalStyles.h2}>DESCRIPTIF</Text>
          <Text style={globalStyles.h3Center}>{description}</Text>
          {date !== null && <Text style={globalStyles.h3Center}>Le {moment(date).format("LL")} à {moment(date).format("LT")}</Text>}
        </View>

        {/* TODO: FETCH POUR S'INSCRIRE */}
        <View style={{ flex: 1, width: "90%" }}>
          <TouchableOpacity style={globalStyles.button}>
            <Text style={globalStyles.buttonText}>S'INSCRIRE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
