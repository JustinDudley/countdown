import React, { Component } from "react";
import { FlatList, Text, StyleSheet } from "react-native";
import ActionButton from "react-native-action-button";
// import { NavigationEvents } from "react-navigation";

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

    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      // console.log("didFocus DID fire"); // this DOES log, with 'didFocus' OR 'focus', but also with "didFcus"!!
      getEvents().then((events) => this.setState({ events }));
    });

    //  description here, please.  'didFocus' ?  'focus' ? 'onDidFocus' ?
    //
    //  copied from Henrick github:
    // this.props.navigation.addListener("didFocus", () => {
    //   // console.log("didFocus DID fire"); // this DOES log, with 'didFocus' OR 'focus', but also with "didFcus"!!
    //   getEvents().then((events) => this.setState({ events }));
    // });
    //
    // coded by me from tutorial:
    //  this.props.navigation.addListener("didFocus", () =>
    //   getEvents().then((events) => this.setState({ events }))
    // );

    //
    // former, works.  Before listener event introduced
    // getEvents().then((events) => this.setState({ events }));
    //
  }

  // componentDidMount() {
  //   this._unsubscribe = navigation.addListener('focus', () => {
  //     // do something
  //   });
  // }

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
