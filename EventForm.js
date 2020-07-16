import React, { Component } from "react";
import { View, Text, TouchableHighlight } from "react-native";

class EventForm extends Component {
  handleAddPress = () => {
    this.props.navigation.navigate("list");
    // ?
  };

  render() {
    return (
      <View>
        <TouchableHighlight onPress={this.handleAddPress}>
          <Text>Add</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default EventForm;

//
//
// USING FUNCTION COMPONENT [[ Don't forget to use Brackets in App.js
// import statement: import { EventForm } from "./EventForm"; ]] :
//
// export function EventForm({ navigation }) {
//   const handleAddPress = () => {
//     navigation.navigate("EventList");
//   };

//   return (
//     <View>
//       <TouchableHighlight onPress={handleAddPress}>
//         <Text>Add</Text>
//       </TouchableHighlight>
//     </View>
//   );
// }
