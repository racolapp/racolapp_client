import React, {Component} from 'react';
import GoogleMaps from '../../components/GoogleMaps';

export default class HomeScreen extends Component {
  render(){
    return (
      <>
        {/* ATTENTION: le component GoogleMaps n'affichera rien si wrappé dans autre chose que des chevrons vides */}
        <GoogleMaps/>
      </>
    )
  }
}
