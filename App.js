import React, {Component} from 'react';
import HomeScreen from './src/screens/Home';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from "react-navigation";


const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  }
 });

//  export default createAppContainer(AppNavigator);



// class HomeScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Home!</Text>
//       </View>
//     );
//   }
// }



const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  EventsPosted: EventsPostedScreen,
  Add: AddScreen,
  EventsSubscripted: EventsSubscriptedScreen,
  Profile: ProfileScreen
});

export default createAppContainer(TabNavigator);