<<<<<<< HEAD:Part 9/ilari-diary/data/entries.ts
import { DiaryEntry } from "../src/types/types";
import toNewFlightLogEntry from @
=======
import { FlightLogEntry } from "../src/types/types";
>>>>>>> 32914abd0dddd9ec3afb4d50735d20579ed8b2a6:Part 9/ilari-diary/data/flightLogs.ts

const flightLogEntries: FlightLogEntry[] = [
  {
    id: "01000001",
    date: "2017-01-01",
    weather: "rainy",
    visibility: "poor",
    comment: "Pretty scary flight, I'm glad I'm alive"
  },
  {
    id: "01000002",
    date: "2017-04-01",
    weather: "sunny",
    visibility: "good",
    comment: "Everything went better than expected, I'm learning much"
  },
  {
    id: "01000003",
    date: "2017-04-15",
    weather: "windy",
    visibility: "good",
    comment: "I'm getting pretty confident although I hit a flock of birds"
  },
  {
    id: "01000004",
    date: "2017-05-11",
    weather: "cloudy",
    visibility: "good",
    comment: "I almost failed the landing but I survived"
  }
];

export default flightLogEntries;
