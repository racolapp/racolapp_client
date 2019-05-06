import React, {Component} from 'react';
import { Text, View  } from 'react-native';
import GoogleMaps from '../../components/GoogleMaps';

export default class MapScreen extends Component {
  render(){
    return (
      <>
        {/* ATTENTION: le component GoogleMaps n'affichera rien si wrappé dans autre chose que des chevrons vides */}
        <GoogleMaps/>
      </>
    )
  }
}
