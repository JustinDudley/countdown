import React, { Component } from "react";
import { FlatList, Text } from "react-native";

import EventCard from "./EventCard";

class EventList extends Component {
  //default state for this component:
  state = {
    events: [],
  };

  // to get the data that we want to bind to:
  componentDidMount() {
    const events = require("./db.json").events;
    this.setState({ events });
  }

  render() {
    return (
      <FlatList
        // data={[{ name: "a" }, { name: "b" }]}
        // renderItem={({ item }) => <Text>{item.name}</Text>}
        // to bind to real data:
        data={this.state.events}
        renderItem={({ item }) => <EventCard event={item}></EventCard>}
        keyExtractor={(item) => item.id}
      />
    );
  }
}

export default EventList;
