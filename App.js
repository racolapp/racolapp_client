import React, {Component} from 'react';
import GoogleMaps from './src/components/GoogleMaps'

export default class App extends Component {


  render(){
    return (
      <>
        {/* ATTENTION: le component GoogleMaps n'affichera rien si wrappé dans autre chose que des chevrons vides */}
        <GoogleMaps/>
      </>
    )
  }
}