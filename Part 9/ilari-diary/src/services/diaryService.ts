import flightEntries from "../../data/flightLogs"
import { NonSensitiveLogEntry, Weather } from "../types/types";

import { FlightLogEntry } from "../types/types";

const getEntries = (): FlightLogEntry[] => {
  return flightEntries;
};

const getNonSensitiveEntries = (): NonSensitiveLogEntry[] => {
  return flightEntries.map(({
    id, date, weather, visibility
  }) => ({
    id,
    date,
    weather, 
    visibility,
  }));
};

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
};
