import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView
} from "react-native";
import {
  setStorage,
  readStorage,
  removeStorage
} from "../../utils/asyncStorage";
import { globalStyles, styleMainColor } from "../../utils/styles";

export default class App extends Component {
  static navigationOptions = {
    title: "NOUVEL EVENEMENT"
  };

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      location: "",
      date: "",
      capacity: "",
      type: ""
    };
  }

  _renderScrollView = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ backgroundColor: styleMainColor }}>
        <TextInput
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: 20,
            fontStyle: "italic",
            textAlign: "center"
          }}
          placeholder="Renseigne ici ton titre!"
          placeholderTextColor="white"
          onChangeText={title => this.setState({ title })}
          value={this.state.title}
        />
        <TextInput
          style={{
            color: "white",
            fontSize: 15,
            fontStyle: "italic",
            textAlign: "center"
          }}
          placeholder="Et ton lieu"
          placeholderTextColor="white"
          onChangeText={location => this.setState({ location })}
          value={this.state.location}
        />
      </View>

      <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20 }}>
        <TextInput
          style={globalStyles.h2}
          placeholder="Décris-nous ton évènement en quelques lignes"
          placeholderTextColor={styleMainColor}
          multiline={true}
          onChangeText={description => this.setState({ description })}
          value={this.state.description}
        />

        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text style={[globalStyles.h3, globalStyles.h3Flex1]}>
            Début (jj/mm/aaaa 00:00)
          </Text>
          <TextInput
            style={[
              globalStyles.textInputLightRectangular,
              globalStyles.textInputLightRectangularFlex1
            ]}
            placeholder="A toi de nous dire"
            placeholderTextColor={styleMainColor}
            onChangeText={date => this.setState({ date })}
            value={this.state.date}
          />
        </View>

        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text style={[globalStyles.h3, globalStyles.h3Flex1]}>
            Nombre de personnes
          </Text>
          <TextInput
            style={[
              globalStyles.textInputLightRectangular,
              globalStyles.textInputLightRectangularFlex1
            ]}
            placeholder="A toi de nous dire"
            placeholderTextColor={styleMainColor}
            onChangeText={capacity => this.setState({ capacity })}
            value={this.state.capacity}
          />
        </View>

        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text style={[globalStyles.h3, globalStyles.h3Flex1]}>
            Type d'évènement
          </Text>
          <TextInput
            style={[
              globalStyles.textInputLightRectangular,
              globalStyles.textInputLightRectangularFlex1
            ]}
            placeholder="A toi de nous dire"
            placeholderTextColor={styleMainColor}
            secureTextEntry={true}
            onChangeText={type => this.setState({ type })}
            value={this.state.type}
          />
        </View>

        <TouchableOpacity
          style={localStyles.button}
          // onPress={() => {
          //   this._login(userToSave);
          // }}
        >
          <Text style={globalStyles.buttonText}> VALIDE </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  render() {
    return <>{this._renderScrollView()}</>;
  }
}

const localStyles = StyleSheet.create({
  button: {
    backgroundColor: styleMainColor,
    borderRadius: 20,
    padding: 10,
    marginTop: 30,
    marginBottom: 10
  }
});
