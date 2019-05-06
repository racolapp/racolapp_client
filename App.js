import React, { Component } from "react";
import HomeScreen from "./src/screens/Home";
import MapScreen from "./src/screens/Map";
import SignInScreen from "./src/screens/SignIn";
import SignUpScreen from "./src/screens/SignUp";
import EventsPostedScreen from "./src/screens/EventsPosted";
import EventsSubscriptedScreen from "./src/screens/EventsSubscripted";
import AddScreen from "./src/screens/Add";
import { Text, View, Image } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";

const headerStyle = {
  headerStyle: {
    backgroundColor: "#F8F8F8"
  },
  headerTintColor: "#000000",
  headerTitleStyle: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "center"
  }
};

// TODO: répercuter partout (utiliser stylesheet?)
const colorIconsTabBar = "#2699FB";

const resultsStack = createStackNavigator(
  {
    Home: HomeScreen,
    Map: MapScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: headerStyle
  }
);

const eventsPostedSingleStack = createStackNavigator(
  {
    EventsPosted: {
      screen: EventsPostedScreen
    }
  },
  {
    defaultNavigationOptions: headerStyle
  }
);

const addSingleStack = createStackNavigator(
  {
    Add: {
      screen: AddScreen
    }
  },
  {
    defaultNavigationOptions: headerStyle
  }
);

const eventsSubscriptedSingleStack = createStackNavigator(
  {
    EventsSubscripted: {
      screen: EventsSubscriptedScreen
    }
  },
  {
    defaultNavigationOptions: headerStyle
  }
);

const authenticationStack = createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SignUpScreen
  },
  {
    initialRouteName: "SignIn",
    defaultNavigationOptions: headerStyle
  }
);

export default createAppContainer(
  createBottomTabNavigator(
    {
      Home: {
        screen: resultsStack,
        navigationOptions: {
          tabBarIcon: (focused, tintColor) => (
            <Image
              style={{ width: 30, height: 30 }}
              source={require("./assets/img/tabBar/search.png")}
            />
          )
        }
      },
      EventsPosted: {
        screen: eventsPostedSingleStack,
        navigationOptions: {
          tabBarIcon: (focused, tintColor) => (
            <Image
              style={{ width: 30, height: 30 }}
              source={require("./assets/img/tabBar/thumbs.png")}
            />
          )
        }
      },
      Add: {
        screen: addSingleStack,
        navigationOptions: {
          tabBarIcon: (focused, tintColor) => (
            <Image
              style={{ width: 30, height: 30 }}
              source={require("./assets/img/tabBar/plus.png")}
            />
          )
        }
      },
      EventsSubscripted: {
        screen: eventsSubscriptedSingleStack,
        navigationOptions: {
          tabBarIcon: (focused, tintColor) => (
            <Image
              style={{ width: 30, height: 30, tintColor: "red" }}
              source={require("./assets/img/tabBar/calendar.png")}
            />
          )
        }
      },
      Authentication: {
        screen: authenticationStack,
        navigationOptions: {
          tabBarIcon: (focused, tintColor) => (
            <Image
              style={{ width: 30, height: 30 }}
              source={require("./assets/img/tabBar/user.png")}
            />
          )
        }
      },
    },
    {
      tabBarOptions: {
        showIcon: true,
        showLabel: false
      }
    }
  )
);
