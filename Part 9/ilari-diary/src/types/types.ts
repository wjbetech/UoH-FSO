import { z } from "zod";
import { newEntrySchema } from "../utils/utils";

export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
  Snowy = "snowy"
}

export enum Visibility {
  Excellent = "excellent",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
  VeryPoor = "very poor"
}

export interface FlightLogEntry {
  id: string;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export type NonSensitiveLogEntry = Omit<FlightLogEntry, "comment">;

export type NewFlightLogEntry = z.infer<typeof newEntrySchema>;

export interface FlightLogEntry extends NewFlightLogEntry {
  id: string;
};
