import React, { Component } from "react";
import HomeScreen from "./src/screens/Home";
import MapScreen from "./src/screens/Map";
import SignInScreen from "./src/screens/SignIn";
import SignUpScreen from "./src/screens/SignUp";
import EventsPostedScreen from "./src/screens/EventsPosted";
import EventsSubscriptedScreen from "./src/screens/EventsSubscripted";
import AddScreen from "./src/screens/Add";
import { Image, } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";

// STYLE HEADER NAVIGATION
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

// STYLE BOTTOM NAVIGATION
const sizeHomeButtonTabBar = 40;
const sizeNotHomeButtonTabBar = 25;
const colorIconsTabBar = "#2699FB";
const colorIconsTabBarSelected = "#1D6098";


// NAVIGATION
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

_handleColorIconTabBar = (focused) => {
  return color = focused ? colorIconsTabBarSelected : colorIconsTabBar;
}

export default createAppContainer(
  createBottomTabNavigator(
    {
      EventsSubscripted: {
        screen: eventsSubscriptedSingleStack,
        navigationOptions: {
          tabBarIcon: (focused, tintColor) => {
            return (<Image
              style={{ width: 25, height: 25, tintColor: _handleColorIconTabBar(focused.focused) }}
              source={require("./assets/img/tabBar/calendar.png")}
            />)
          }
        }
      },
      EventsPosted: {
        screen: eventsPostedSingleStack,
        navigationOptions: {
          tabBarIcon: (focused, tintColor) => (
            <Image
              style={{ width: sizeNotHomeButtonTabBar, height: sizeNotHomeButtonTabBar, tintColor: _handleColorIconTabBar(focused.focused) }}
              source={require("./assets/img/tabBar/invite.png")}
            />
          )
        }
      },
      Home: {
        screen: resultsStack,
        navigationOptions: {
          tabBarIcon: (focused, tintColor) => (
            <Image
              style={{ width: sizeHomeButtonTabBar, height: sizeHomeButtonTabBar, tintColor: _handleColorIconTabBar(focused.focused) }}
              source={require("./assets/img/tabBar/search.png")}
            />
          )
        }
      },
      Add: {
        screen: addSingleStack,
        navigationOptions: {
          tabBarIcon: (focused, tintColor) => (
            <Image
              style={{ width: sizeNotHomeButtonTabBar, height: sizeNotHomeButtonTabBar, tintColor: _handleColorIconTabBar(focused.focused) }}
              source={require("./assets/img/tabBar/plus.png")}
            />
          )
        }
      },
      Authentication: {
        screen: authenticationStack,
        navigationOptions: {
          tabBarIcon: (focused, tintColor) => (
            <Image
              style={{ width: sizeNotHomeButtonTabBar, height: sizeNotHomeButtonTabBar, tintColor: _handleColorIconTabBar(focused.focused) }}
              source={require("./assets/img/tabBar/user.png")}
            />
          )
        }
      },
    },
    {
      initialRouteName: "Home",
      tabBarOptions: {
        showIcon: true,
        showLabel: false
      }
    },
  )
);
