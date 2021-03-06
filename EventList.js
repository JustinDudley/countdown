import React, { Component } from "react";
import { FlatList, Text, StyleSheet } from "react-native";
import ActionButton from "react-native-action-button";

import EventCard from "./EventCard";
import { getEvents } from "./api";

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#F3F3F3",
  },
});

class EventList extends Component {
  // default state for this component:
  state = {
    events: [],
  };

  // to get the  data that we want to bind to:
  componentDidMount() {
    // updates every second
    setInterval(() => {
      this.setState({
        events: this.state.events.map((evt) => ({
          ...evt,
          timer: Date.now(),
        })),
      });
    }, 1000);

    // getEvents works without this listener, but you it doesn't read the latest additions to db.json without a re-start
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      getEvents().then((events) => this.setState({ events }));
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  handleAddEvent = () => {
    this.props.navigation.navigate("form");
  };

  render() {
    // used to return just <FlatList>, now returns an array
    return [
      <FlatList
        // data={[{ name: "a" }, { name: "b" }]}
        // renderItem={({ item }) => <Text>{item.name}</Text>}
        // to bind to real data:
        style={styles.list}
        data={this.state.events}
        renderItem={({ item }) => <EventCard event={item}></EventCard>}
        keyExtractor={(item) => item.id}
      />,
      <ActionButton
        key="fab"
        onPress={this.handleAddEvent}
        buttonColor="rgba(231, 76, 60, 1)"
      />,
    ];
  }
}

export default EventList;
