export interface FlightLogTypes {
  id: string;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

export type NewFlightLog = Omit<FlightLogTypes, "id">;
