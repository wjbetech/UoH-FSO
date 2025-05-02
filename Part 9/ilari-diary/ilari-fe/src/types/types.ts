export interface FlightLogTypes {
  id: string;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
};

export interface FlightLogs {
  flightLogs: FlightLogTypes[];
};

export type NewFlightLog = Omit<FlightLogTypes, "id">;
