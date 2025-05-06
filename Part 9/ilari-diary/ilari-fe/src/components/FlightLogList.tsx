import { FlightLogTypes } from "../types/types";

interface FlightLogListProps {
  logs: FlightLogTypes[];
}

export default function FlightLogList({ logs }: FlightLogListProps) {
  return (
    <div>
      <h3>Flight Logs:</h3>
      {logs.map((log) => (
        <div className="flight-log" key={log.id}>
          <i>{log.date}</i>
          <p>Visibility: {log.visibility}</p>
          <p>Weather: {log.weather}</p>
          <p>{log.comment}</p>
        </div>
      ))}
    </div>
  );
}
