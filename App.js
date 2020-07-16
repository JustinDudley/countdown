import "react-native-gesture-handler"; // placed at very top, per React Native docs
import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import EventList from "./EventList";
import { EventForm } from "./EventForm";

const Stack = createStackNavigator(); // returns an object containing 2 properties: Screen and Navigator

export default class MyStack extends React.Component {
  render() {
    return (
      // verbage: "Each SCREEN in the NAVIGATOR can specify some options for the navigator, such as the title to render in the header."

      <NavigationContainer>
        <Stack.Navigator initialRouteName="EventForm">
          <Stack.Screen
            name="EventList"
            component={EventList}
            options={{ title: "this is the EventList" }}
          />
          <Stack.Screen
            name="EventForm"
            component={EventForm}
            options={{ title: "this is the EventForm" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

// //The class below is all going to get deleted by Hendrik
// export default class App extends React.Component {
//   render() {
//     return (
//       // NavigationContainer is from RN docs, not Hendriks
//       <NavigationContainer>
//         <EventList />
//       </NavigationContainer>
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
