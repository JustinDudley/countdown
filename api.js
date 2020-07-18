import moment from "moment";

// TO GENERATE NGROK, use 2 (TWO) terminals:
// >countdown $ json-server --watch db.json
// >countdown $ ngrok http 3000

const ngrokWithHttp = "http://f77fb5466f91.ngrok.io";
const url = `${ngrokWithHttp}/events`;

export function getEvents() {
  return fetch(url)
    .then((response) => response.json())
    .then((events) => events.map((e) => ({ ...e, date: new Date(e.date) })));
}

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

//
// const url = "http://localhost:3000/events";
// this won't work because i'm using my phone, not my laptop,  so we do VOO-DOO:

// Couldn't make this Hendrik plan (for generating url) work, so used ngrok instead:
// import Constants from "expo-constants";
// const { manifest } = Constants;
// const api =
//   typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
//     ? manifest.debuggerHost.split(`:`).shift().concat(`:3000`)
//     : `api.example.com`;
