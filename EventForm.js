import React, { Component } from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  StyleSheet,
} from "react-native";

import { formatDateTime, saveEvent } from "./api";

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
  button: {
    height: 50,
    backgroundColor: "#48bbec",
    borderColor: "#48bbec",
    alignSelf: "stretch",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  borderTop: {
    borderColor: "#888888",
    borderTopWidth: 0.5,
  },
});

class EventForm extends Component {
  state = { title: null, date: "" };

  handleAddPress = () => {
    saveEvent(this.state) // this.state is an object with title, date. Which is just what saveEvent needs
      .then(() => this.props.navigation.goBack());
    // KEEP, also works: this.props.navigation.navigate("list");
  };

  handleChangeTitle = (value) => {
    this.setState({ title: value });
  };

  handleDatePress = () => {
    this.setState({ showDatePicker: true });
  };

  handleDatePicked = (date) => {
    this.setState({
      date,
    });

    this.handleDatePickerHide(); // hide if not using anymore
  };

  handleDatePickerHide = () => {
    this.setState({
      showDatePicker: false,
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.fieldContainer}>
          <TextInput
            style={styles.text}
            placeholder="Event title"
            spellCheck={false}
            value={this.state.title}
            onChangeText={this.handleChangeTitle}
          />
          <TextInput
            style={[styles.text, styles.borderTop]}
            placeholder="Event date"
            spellCheck={false}
            value={formatDateTime(this.state.date.toString())}
            editable={!this.state.showDatePicker}
            onFocus={this.handleDatePress}
          />
          <DateTimePicker
            isVisible={this.state.showDatePicker}
            mode="datetime"
            onConfirm={this.handleDatePicked}
            onCancel={this.handleDatePickerHide}
          />
        </View>
        <TouchableHighlight style={styles.button} onPress={this.handleAddPress}>
          <Text style={styles.buttonText}>Add</Text>
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
