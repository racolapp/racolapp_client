import React, { Component } from "react";
import HomeScreen from "./src/screens/Home";
import MapScreen from "./src/screens/Map";
import SignInScreen from "./src/screens/SignIn";
import SignUpScreen from "./src/screens/SignUp";
import EventsPostedScreen from "./src/screens/EventsPosted";
import EventsSubscriptedScreen from "./src/screens/EventsSubscripted";
import SingleEventDetailsScreen from "./src/screens/SingleEventDetails";
import AddScreen from "./src/screens/Add";
import { Image } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import {
  styleMainColor,
  styleOnMainColor,
  styleNavigationHeaderStyle,
  sizeHomeButtonTabBar,
  sizeNotHomeButtonTabBar
} from "./src/utils/styles";

const resultsStack = createStackNavigator(
  {
    Home: HomeScreen,
    Map: MapScreen,
    SingleEventDetails: SingleEventDetailsScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: styleNavigationHeaderStyle
  }
);

const eventsPostedSingleStack = createStackNavigator(
  {
    EventsPosted: {
      screen: EventsPostedScreen
    }
  },
  {
    defaultNavigationOptions: styleNavigationHeaderStyle
  }
);

const addSingleStack = createStackNavigator(
  {
    Add: {
      screen: AddScreen
    }
  },
  {
    defaultNavigationOptions: styleNavigationHeaderStyle
  }
);

const eventsSubscriptedSingleStack = createStackNavigator(
  {
    EventsSubscripted: {
      screen: EventsSubscriptedScreen
    }
  },
  {
    defaultNavigationOptions: styleNavigationHeaderStyle
  }
);

const authenticationStack = createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SignUpScreen
  },
  {
    initialRouteName: "SignIn",
    defaultNavigationOptions: styleNavigationHeaderStyle
  }
);

_handleColorIconTabBar = focused => {
  return (color = focused ? styleOnMainColor : styleMainColor);
};

export default createAppContainer(
  createBottomTabNavigator(
    {
      EventsSubscripted: {
        screen: eventsSubscriptedSingleStack,
        navigationOptions: {
          tabBarIcon: focused => (
            <Image
              style={{
                width: sizeNotHomeButtonTabBar,
                height: sizeNotHomeButtonTabBar,
                tintColor: _handleColorIconTabBar(focused.focused)
              }}
              source={require("./assets/img/tabBar/calendar.png")}
            />
          )
        }
      },
      EventsPosted: {
        screen: eventsPostedSingleStack,
        navigationOptions: {
          tabBarIcon: focused => (
            <Image
              style={{
                width: sizeNotHomeButtonTabBar,
                height: sizeNotHomeButtonTabBar,
                tintColor: _handleColorIconTabBar(focused.focused)
              }}
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
              style={{
                width: sizeHomeButtonTabBar,
                height: sizeHomeButtonTabBar,
                tintColor: _handleColorIconTabBar(focused.focused)
              }}
              source={require("./assets/img/tabBar/search.png")}
            />
          )
        }
      },
      Add: {
        screen: addSingleStack,
        navigationOptions: {
          tabBarIcon: focused => (
            <Image
              style={{
                width: sizeNotHomeButtonTabBar,
                height: sizeNotHomeButtonTabBar,
                tintColor: _handleColorIconTabBar(focused.focused)
              }}
              source={require("./assets/img/tabBar/plus.png")}
            />
          )
        }
      },
      Authentication: {
        screen: authenticationStack,
        navigationOptions: {
          tabBarIcon: focused => (
            <Image
              style={{
                width: sizeNotHomeButtonTabBar,
                height: sizeNotHomeButtonTabBar,
                tintColor: _handleColorIconTabBar(focused.focused)
              }}
              source={require("./assets/img/tabBar/user.png")}
            />
          )
        }
      }
    },
    {
      initialRouteName: "Home",
      tabBarOptions: {
        showIcon: true,
        showLabel: false
      }
    }
  )
);
