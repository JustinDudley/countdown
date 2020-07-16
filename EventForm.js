import React, { Component } from "react";
import { View, Text, TouchableHighlight, Alert } from "react-native";

class EventForm extends Component {
  handleAddPress = () => {
    Alert.alert("you pressed add");
    // ?   (navigation logic will go here)
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
