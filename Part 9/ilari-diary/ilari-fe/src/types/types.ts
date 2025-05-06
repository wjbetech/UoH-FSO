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

export interface FlightLogTypes {
  id: string;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

export interface FlightLogs {
  flightLogs: FlightLogTypes[];
}

export type NewFlightLog = Omit<FlightLogTypes, "id">;
