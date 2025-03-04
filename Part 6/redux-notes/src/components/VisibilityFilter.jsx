import React from "react";
import { filterChange } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

export default function VisibilityFilter(props) {
  const dispatch = useDispatch();

  return (
    <div style={{ padding: "8px 4px", display: "flex", flexDirection: "row", gap: "8px", alignItems: "baseline" }}>
      <span>All</span>
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("ALL"))}
      />

      <span>Important</span>
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("IMPORTANT"))}
      />
      <span>Unimportant</span>
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("UNIMPORTANT"))}
      />
    </div>
  );
}
