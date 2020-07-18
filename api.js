import moment from "moment";
import { v4 as uuidv4 } from "uuid";

// TO GENERATE NGROK, use 2 (TWO) terminals:
// >countdown $ json-server --watch db.json  // to specify port other than default 3000, $ json-server --watch -p 4007 db.json
// >countdown $ ngrok http 3000   (doesn't have to be countdown)  to use other port? $ngrok http 4007

const ngrokWithHttp = "http://c62d5131b0fc.ngrok.io";
const url = `${ngrokWithHttp}/events`;

export const getEvents = () => {
  return fetch(url)
    .then((response) => response.json())
    .then((events) => events.map((e) => ({ ...e, date: new Date(e.date) })));
};

// see below for former form of this function, before a quickfix automagically converted it to async function
export const saveEvent = async ({ title, date }) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        title,
        date,
        uuidv4,
      }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return res.json;
  } catch (err) {
    return console.error(err);
  }
};

// export const saveEvent = ({ title, date }) => {
//   return fetch(url, {
//     method: "POST",
//     body: JSON.stringify({
//       title,
//       date,
//       uuidv4,
//     }),
//     headers: new Headers({ "Content-Type": "application/json" }),
//   })
//     .then((res) => res.json)
//     .catch((err) => console.error(err));
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

//
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
