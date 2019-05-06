import React, {Component} from 'react';
import HomeScreen from './src/screens/Home';
import { createStackNavigator, createAppContainer } from "react-navigation";


const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  }
 });

 export default createAppContainer(AppNavigator);