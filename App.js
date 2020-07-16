import "react-native-gesture-handler"; // placed at very top, per React Native docs
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import EventList from "./EventList";

const Stack = createStackNavigator();

//The class below is all going to get deleted by Hendrik
export default class App extends React.Component {
  render() {
    return (
      // NavigationContainer is from RN docs, not Hendriks
      <NavigationContainer>
        <EventList />
      </NavigationContainer>
    );
  }
}

//
// -- or --
// export default function App() {
//   debugger;
//   return <EventList />;
// }
