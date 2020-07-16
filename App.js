import "react-native-gesture-handler"; // placed at very top, per React Native docs
import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import EventList from "./EventList";
import EventForm from "./EventForm";

const Stack = createStackNavigator(); // returns an object containing 2 properties: Screen and Navigator

export default class MyStack extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="list">
          <Stack.Screen
            name="list"
            component={EventList}
            options={{ title: "Your Events" }}
          />
          <Stack.Screen
            name="form"
            component={EventForm}
            options={{ title: "Add an event" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

// // The class below got deleted when we put in navigation
// export default class App extends React.Component {
//   render() {
//     return (
//         <EventList />
//     );
//   }
// }

//
//
// -- function component, works --
// export default function App() {
//   debugger;
//   return <EventList />;
// }
