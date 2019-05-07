import React, {Component} from 'react';
import HomeScreen from './src/screens/Home';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from "react-navigation";


const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  }
 });

 export default createAppContainer(AppNavigator);
