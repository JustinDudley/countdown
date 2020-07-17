import moment from "moment";

// const url = "http://localhost:3000/events";
// this won't work because i'm using my phone, not my laptop,  so we do VOO-DOO:

import Constants from "expo-constants";
const { manifest } = Constants;

const api =
  typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
    ? /*console.log("so far so good") */
      manifest.debuggerHost.split(`:`).shift().concat(`:3000`)
    : `api.example.com`;

// replaced below with stack overflow
// import Constants from "expo-constants";
// const { manifest } = Constants;
// const api = manifest.packagerOpts.dev
//   ? manifest.debuggerHost.split(`:`).shift().concat(`:3000`)
//   : `api.example.com`;

const url = `http://${api}/events`;
console.log("url is: ", url);

export function getEvents() {
  return fetch(url)
    .then((response) => response.json())
    .then((events) => console.log(events));
  // .then((events) => events.map((e) => ({ ...e, date: new Date(e.date) })));
}

// export const getEvents = () => {
//   return fetch(url)
//     .then((res) => res.json())
//     .then((events) => events.map((e) => ({ ...e, date: new Date(e.date) })));
// };

export function formatDateTime(dateString) {
  const parsed = moment(new Date(dateString));

  if (!parsed.isValid()) {
    return dateString;
  }

  return parsed.format("H A on D MMM YYYY");
}

export function formatDate(dateString) {
  const parsed = moment(new Date(dateString));

  if (!parsed.isValid()) {
    return dateString;
  }

  return parsed.format("D MMM YYYY");
}

export function getCountdownParts(eventDate) {
  const duration = moment.duration(
    moment(new Date(eventDate)).diff(new Date())
  );
  return {
    days: parseInt(duration.as("days")),
    hours: duration.get("hours"),
    minutes: duration.get("minutes"),
    seconds: duration.get("seconds"),
  };
}
