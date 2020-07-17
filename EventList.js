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
  //default state for this component:
  state = {
    events: [],
  };

  // to get the data that we want to bind to:
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

    const fetchData = async () => {
      fetch(
        "https://rest32.bullhornstaffing.com/rest-services/234yo4/query/JobOrder?start=0&count=100&orderBy=type,-dateAdded&fields=id,dateAdded,title,publishedCategory,type,employmentType,address(city,state),publicDescription&where=isOpen=true+AND+isPublic=1&BhRestToken=8b48c314-71a5-4787-98fc-9f94d2b903ec"
      )
        // fetch("http://192.168.200.57:3000/events")
        .then((response) => response.json())
        .then((events) => console.log(events));
      // .then((events) => events.map((e) => ({ ...e, date: new Date(e.date) })));
    };

    fetchData();

    // this code is from Hendrik's repo. Result: a blank  screen, but at least it doesn't shut down the whole expo app
    // this.props.navigation.addListener("didFocus", () => {
    //   getEvents().then((events) => this.setState({ events }));
    // });

    // // "getEvents returns a promise, so we all a .then on there"
    // //  THE FOLLOWING BLOCK OF CODE CAUSES THE EXPO APP ON MY PHONE TO STOP:
    // getEvents().then((events) => this.setState({ events }));

    //
    //
    // This is from before db.json was accessed via json-server. This pulls the data directly from the local file
    // const events = require("./db.json").events.map((e) => ({
    //   ...e,
    //   date: new Date(e.date),
    // }));
    // this.setState({ events });
    //
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
