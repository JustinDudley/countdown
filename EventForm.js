import React, { Component } from "react";
import { View, Text, TouchableHighlight, Alert, Button } from "react-native";

export function EventForm({ navigation }) {
  const handleAddPress = () => {
    Alert.alert("you pressed add");
    navigation.navigate("EventList");

    // this.navigation.navigate("EventList");

    // ?   (navigation logic will go here)
  };

  return (
    <View>
      <Button
        title="Add this way"
        onPress={() => navigation.navigate("EventList")}
      ></Button>
      <TouchableHighlight onPress={() => handleAddPress}>
        <Text>Add</Text>
      </TouchableHighlight>
    </View>
  );
}

// class EventForm extends Component {
//   constructor(props) {
//     super(props);
//     // this.state = navigation;
//   }

//   handleAddPress = () => {
//     Alert.alert("you pressed add");

//     // this.navigation.navigate("EventList");

//     // ?   (navigation logic will go here)
//   };

//   render() {
//     return (
//       <View>
//         <TouchableHighlight onPress={this.handleAddPress}>
//           <Text>Add</Text>
//         </TouchableHighlight>
//       </View>
//     );
//   }
// }

// export default EventForm;
