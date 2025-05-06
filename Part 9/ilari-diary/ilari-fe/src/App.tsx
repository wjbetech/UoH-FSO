import { useState, useEffect } from "react";
import { FlightLogTypes } from "./types/types";
import { getAllFlightLogs } from "./services/logService";
import FlightLogList from "./components/FlightLogList";
import NewFlightLogForm from "./components/NewFlightLogForm";
import { createFlightLog } from "./services/logService";

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
      <NewFlightLogForm
        onSubmit={async (newLog) => {
          const created = await createFlightLog(newLog);
          setFlightLogs([...flightLogs, created]);
        }}
      />
      <FlightLogList logs={flightLogs} />
    </div>
  );
}

export default App;
