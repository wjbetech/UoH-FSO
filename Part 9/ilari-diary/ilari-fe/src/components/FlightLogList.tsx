import { FlightLogTypes } from "../types/types"

interface FlightLogListProps {
  logs: FlightLogTypes[];
}

export default function FlightLogList({ logs }: FlightLogListProps) {
  return (
    <div>
      {logs.map((log) => (
        <div key={log.id}>
          <p>{log.date}</p>
        </div>
      ))}
    </div>
  );
}
