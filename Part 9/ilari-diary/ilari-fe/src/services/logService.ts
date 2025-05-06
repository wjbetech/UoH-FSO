import axios from "axios";
import { FlightLogTypes, NewFlightLog } from "../types/types";

const baseUrl = "http://localhost:3005/api/flightlogs";

export const getAllFlightLogs = async () => {
  return axios.get<FlightLogTypes[]>(baseUrl).then((response) => response.data);
};

export const createFlightLog = async (object: NewFlightLog) => {
  return axios.post<FlightLogTypes>(baseUrl, object).then((response) => response.data);
};
