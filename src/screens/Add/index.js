import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Picker
} from "react-native";
import {
  setStorage,
  readStorage,
  removeStorage
} from "../../utils/asyncStorage";
import { globalStyles, styleMainColor } from "../../utils/styles";
import DatePicker from "react-native-datepicker";
import SearchableDropdown from 'react-native-searchable-dropdown';

export default class App extends Component {
  static navigationOptions = {
    title: "NOUVEL EVENEMENT"
  };

  constructor(props) {
    super(props);
    this.state = {
      searchedLocation: "",
      name: "Partie de billard",
      description: "Pour retrouver des amateurs de billard et de bonnes bières",
      location: "",
      long: "",
      lat: "",
      date: "",
      capacity: "",
      TypeEventsID: "1",
      UserID: 1
    };
    this.resultToSearchLocation = [];
  }

  _searchLocation = async adress => {
    const response = await fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${adress}`,
      {
        headers: {
          "Content-Type": "application/json"
        },
        method: "GET"
      }
    );

    const json = await response.json();
this.resultToSearchLocation = json.features;

    // const json = await response.json();
    // this._listSearchLocation(json.features)
  };

  _listSearchLocation = (list) => {
    this.resultToSearchLocation = []
    try {
      return list.map(item => {
        // console.log("MAPPPPPPPPPPPPP")
        // console.log(item.properties.label)
        return this.resultToSearchLocation.push(item.properties.label)
      });
    } catch (err) {
      console.log("Fetch api adress failed");
      console.log(err.message);
    }
    finally{
    console.log(this.resultToSearchLocation)
    }
  };

  _listResultLocation = () => {
    try {
      return this.resultToSearchLocation.map(item => {
        return (
          <Picker.Item
            label={item.properties.label}
            key={item.properties.id}
            value={{
              label: item.properties.label,
              long: item.geometry.coordinates[0],
              lat: item.geometry.coordinates[1]
            }}
          />
        );
      });
    } catch (err) {
      console.log("Fetch api adress failed");
      console.log(err.message);
    }
  };

  _addEvent = async () => {
    const response = await fetch("https://racolapp.herokuapp.com/users", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(this.state)
    });
    const json = await response.json();
    // console.log("############# RESPONSE JSON ###############");
    // console.log(json);
  };

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
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
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
            Lieu de l'évènement
          </Text>
          <TextInput
            style={[
              globalStyles.textInputLightRectangular,
              globalStyles.textInputLightRectangularFlex1
            ]}
            placeholder="A toi de nous dire"
            placeholderTextColor={styleMainColor}
            onChangeText={searchedLocation => {
              this.setState({ searchedLocation });
              this._searchLocation(this.state.searchedLocation);
            }}
            value={this.state.searchedLocation}
          />
        </View>
        <View>
          <Picker
            // selectedValue={this.state.location}
            onValueChange={value => {
              this.setState({
                location: value.label,
                long: value.long,
                lat: value.lat
              });
            }}
          >
            {this._listResultLocation()}
          </Picker>
          {console.log(this.state)}
        </View>

        {/* <View>
        <SearchableDropdown
        // onTextChange={text => alert(text)}
        onTextChange={searchedLocation => {
          this.setState({ searchedLocation });
          this._searchLocation(this.state.searchedLocation);
          // this._listSearchLocation()
        }}
        // onItemSelect={item => alert(JSON.stringify(item))}
        containerStyle={{ padding: 5 }}
        textInputStyle={{
          padding: 12,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
        }}
        itemStyle={{
          padding: 10,
          marginTop: 2,
          backgroundColor: '#ddd',
          borderColor: '#bbb',
          borderWidth: 1,
          borderRadius: 5,
        }}
        itemTextStyle={{ color: '#222' }}
        itemsContainerStyle={{ maxHeight: 140 }}
        items={this.resultToSearchLocation}
        defaultIndex={2}
        placeholder="placeholder"
        resetValue={false}
        underlineColorAndroid="transparent"
      />
        </View> */}

        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Text style={[globalStyles.h3, globalStyles.h3Flex1]}>
            Date de l'évènement
          </Text>
          <DatePicker
            style={globalStyles.datePicker}
            date={this.state.date}
            mode="datetime"
            placeholder="Sélectionne le jour et l'heure"
            format=""
            minDate={Date.now()}
            confirmBtnText="OK"
            cancelBtnText="Annuler"
            is24Hour={true}
            showIcon={false}
            customStyles={{
              dateInput: {
                borderWidth: 0
              },
              dateText: {
                color: styleMainColor
              },
              placeholderText: {
                color: styleMainColor
              }
            }}
            onDateChange={date => {
              this.setState({ date: date });
            }}
          />

          {/* <TextInput
            style={[
              globalStyles.textInputLightRectangular,
              globalStyles.textInputLightRectangularFlex1
            ]}
            placeholder="A toi de nous dire"
            placeholderTextColor={styleMainColor}
            onChangeText={date => this.setState({ date })}
            value={this.state.date}
          /> */}
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
            keyboardType="numeric"
            onChangeText={capacity =>
              this.setState({ capacity: Number(capacity) })
            }
            value={this.state.capacity}
          />
          {/* {console.log(this.state)} */}
          {/* {console.log(this.resultToSearchLocation)} */}
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
            onChangeText={TypeEventsID => this.setState({ TypeEventsID })}
            value={this.state.TypeEventsID}
          />
        </View>

        <TouchableOpacity
          style={localStyles.button}
          onPress={() => {
            this._addEvent();
          }}
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
