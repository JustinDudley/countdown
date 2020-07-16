import React, { Component } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  StyleSheet,
} from "react-native";

const styles = StyleSheet.create({
  fieldContainer: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  text: {
    height: 40,
    margin: 0,
    marginRight: 7,
    paddingLeft: 10,
  },
});

class EventForm extends Component {
  handleAddPress = () => {
    this.props.navigation.navigate("list");
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.fieldContainer}>
          <TextInput
            style={styles.text}
            placeholder="Event title"
            spellCheck={false}
          />
        </View>
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
