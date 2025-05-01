import flightLogEntries from "../../data/flightLogs";
import { NonSensitiveLogEntry, FlightLogEntry, NewFlightLogEntry } from "../types/types";
import { v4 as uuidv4 } from "uuid";

const getEntries = (): FlightLogEntry[] => {
  return flightLogEntries;
};

const findById = (id: string): FlightLogEntry => {
  const entry = flightLogEntries.find((d) => d.id === id);
  if (!entry) {
    throw new Error("Diary entry not found");
  }
  return entry;
};

const getNonSensitiveEntries = (): NonSensitiveLogEntry[] => {
  return flightLogEntries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility
  }));
};

const addFlightLog = (entry: NewFlightLogEntry): FlightLogEntry => {
  const newFlightLogEntry = {
    id: uuidv4(),
    ...entry
  };

  flightLogEntries.push(newFlightLogEntry);
  return newFlightLogEntry;
};

export default {
  getEntries,
  addFlightLog,
  getNonSensitiveEntries,
  findById
};
