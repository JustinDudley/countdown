import moment from "moment";
import { v4 as uuidv4 } from "uuid";

// I used ngrok, I think, because from my phone (using expo app) I couldn't access port:3000 on my laptop directly
// TO GENERATE NGROK, use TWO terminals:
// (1)   >countdown $ json-server --watch db.json   // default is port 3000. To specify another port: $ json-server --watch -p 4007 db.json
// (2)   >countdown $ ngrok http 3000   (doesn't have to be countdown)  to use other port? $ngrok http 4007
// (3)   Put the ngrok address into the code below (should be in a .env file, but...)

// WARNING: A common way for this program to break is this: If you hit submit before using the DatePicker, the json file will have an event with an invalid date, which will break the whole program next time it runs. So you need to go manually delete that event in the db.json file

const ngrokWithHttp = "http://0bd011378b6a.ngrok.io"; // MUST CHANGE THIS EACH TIME.  (See above) (Must change it if you are running the program the next day. ngrok only lasts for a few hours)
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
