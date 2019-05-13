import React, { Component } from "react";
import { Text, View } from "react-native";
import GoogleMaps from "../../components/GoogleMaps";
import { TouchableOpacity } from "react-native-gesture-handler";
import { globalStyles } from "../../utils/styles";

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
            markers={this.props.navigation.state.params.marker}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={globalStyles.h2}>DESCRIPTIF</Text>
          <Text style={globalStyles.h3Center}>{this.props.navigation.state.params.description}</Text>
        </View>

        {/* TODO: Intégrer d'autres données */}

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
