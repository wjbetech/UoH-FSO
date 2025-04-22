export type Weather = "sunny" | "rainy" | "cloudy" | "stormy" | "windy" | "snowy";

export type Visibility = "excellent" | "good" | "ok" | "poor" | "very poor";

export interface FlightLogEntry {
  id: string;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type NonSensitiveLogEntry = Omit<FlightLogEntry, "comment">;
export type NewFlightLogEntry = Omit<FlightLogEntry, "id">;
