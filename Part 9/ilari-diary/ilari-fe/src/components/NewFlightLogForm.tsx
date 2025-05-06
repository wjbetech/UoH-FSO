import { useState, SyntheticEvent } from "react";

import { NewFlightLog } from "../types/types";

type NewFlightLogFormProps = {
  onSubmit: (values: NewFlightLog) => void;
};

export default function NewFlightLogForm({ onSubmit }: NewFlightLogFormProps) {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");

  const addFlightLog = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      date,
      weather,
      visibility,
      comment
    });

    setDate("");
    setWeather("");
    setVisibility("");
    setComment("");
  };

  return (
    <div>
      <form onSubmit={addFlightLog}>
        {/* date */}
        <div>
          <label>Date:</label>
          <input type="text" onChange={({ target }) => setDate(target.value)} />
        </div>
        {/* weather */}
        <div>
          <label>Weather: </label>
          <input type="text" onChange={({ target }) => setWeather(target.value)} />
        </div>
        {/* visibility */}
        <div>
          <label>Visibility: </label>
          <input type="text" onChange={({ target }) => setVisibility(target.value)} />
        </div>
        {/* comment */}
        <div>
          <label>Comment: </label>
          <input type="text" onChange={({ target }) => setComment(target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
