import { NewFlightLogEntry } from "../types/types";

const toNewFlightLogEntry = (object: unknown): NewFlightLogEntry => {
  console.log(object); // now object is no longer unused
  const newFlightLogEntry: NewFlightLogEntry = {
    weather: "cloudy", // fake the return value
    visibility: "good",
    date: "2022-1-1",
    comment: "fake news"
  };

  return newFlightLogEntry;
};

export default toNewFlightLogEntry;
