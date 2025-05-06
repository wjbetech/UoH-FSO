import { useState, SyntheticEvent, useEffect } from "react";

import { NewFlightLog } from "../types/types";
import axios from "axios";

// handle types required for the radial buttons
import { Weather, Visibility } from "../types/types";
const weatherOptions = Object.values(Weather);
const visibilityOptions = Object.values(Visibility);
import { formatLabel } from "../utils/capitalizeLabels";

type NewFlightLogFormProps = {
  onSubmit: (values: NewFlightLog) => Promise<void>;
};

export default function NewFlightLogForm({ onSubmit }: NewFlightLogFormProps) {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const addFlightLog = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      await onSubmit({
        date,
        weather,
        visibility,
        comment
      });
      setDate("");
      setWeather("");
      setVisibility("");
      setComment("");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data) {
        // handle properly defining the error from Axios in the BE
        const errorMessage = error.response.data.error[0].message;
        console.log(errorMessage);
        if (errorMessage.includes("excellent")) {
          setErrorMessage(`Error: Incorrect visibility value passed: ${visibility}`);
        }
        if (errorMessage.includes("cloudy")) {
          setErrorMessage(`Error: Incorrect weather value passed: ${weather}`);
        }
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      {errorMessage && (
        <div className="error-div">
          <strong>Error:</strong> {errorMessage}
        </div>
      )}
      <form onSubmit={addFlightLog}>
        {/* date */}
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={({ target }) => setDate(target.value)} />
        </div>
        {/* weather */}
        <div style={{ display: "flex", flexDirection: "row", gap: "3rem", textAlign: "center" }}>
          <label>Weather:</label>
          {weatherOptions.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="weather"
                value={option}
                checked={weather === option}
                onChange={({ target }) => setWeather(target.value)}
              />
              {formatLabel(option)}
            </label>
          ))}
        </div>
        {/* visibility */}
        <div style={{ display: "flex", flexDirection: "row", gap: "3rem", textAlign: "center" }}>
          <label>Visibility:</label>
          {visibilityOptions.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="visibility"
                value={option}
                checked={visibility === option}
                onChange={({ target }) => setVisibility(target.value)}
              />
              {formatLabel(option)}
            </label>
          ))}
        </div>
        {/* comment */}
        <div>
          <label>Comment: </label>
          <input type="text" value={comment} onChange={({ target }) => setComment(target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
