import React, { Component } from "react";
import HomeScreen from "./src/screens/Home";
import MapScreen from "./src/screens/Map";
import SignInScreen from "./src/screens/SignIn";
import SignUpScreen from "./src/screens/SignUp";
import EventsPostedScreen from "./src/screens/EventsPosted";
import EventsSubscriptedScreen from "./src/screens/EventsSubscripted";
import AddScreen from "./src/screens/Add";
import { Text, View } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";

const resultsStack = createStackNavigator(
  {
    Home: HomeScreen,
    Map: MapScreen
  },
  {
    initialRouteName: "Home"
  }
);

const authenticationStack = createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SignUpScreen
  },
  {
    initialRouteName: "SignIn"
  }
);

export default createAppContainer(
  createBottomTabNavigator({
    Home: resultsStack,
    EventsPosted: EventsPostedScreen,
    Add: AddScreen,
    EventsSubscripted: EventsSubscriptedScreen,
    Authentication: authenticationStack
  })
);
