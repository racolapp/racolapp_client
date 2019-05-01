import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import GoogleMaps from './src/components/GoogleMaps'

// // (UTILE ?????) ANDROID PERMISSIONS FOR API >= 23
// import {requestLocationPermission} from './src/utils/PermissionsAndroid';

export default class App extends Component {

  // async componentWillMount(){
  //   await requestLocationPermission();
  // }

  render(){
    return (
      <>
        {/* ATTENTION: le component GoogleMaps n'affichera rien si wrappé dans autre chose que des chevrons vides */}
        <GoogleMaps/>
      </>
    )
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
