import { useState, useEffect } from "react";
import { FlightLogTypes } from "../types/types";
import { getAllFlightLogs } from "../services/logService";

function App() {
  const [flightLogs, setFlightLogs] = useState<FlightLogTypes[]>([]);

  useEffect(() => {
    getAllFlightLogs().then((data) => {
      setFlightLogs(data);
    });
  }, []);

  return (
    <div className="container">
      <h1>Ilari's Flight Log</h1>
    </div>
  );
}

export default App;
