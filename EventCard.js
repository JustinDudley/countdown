import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { PropTypes } from "prop-types";

import { formatDate, getCountdownParts } from "./api";

const styles = StyleSheet.create({});

//stateless functional component:
export default function EventCard({ event }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.date}>{formatDate(event.date)}</Text>
        <Text style={styles.title}>{event.title}</Text>
      </View>
    </View>
  );
}

// let's specify some property validation rules. Good practice:
EventCard.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date),
  }),
};
