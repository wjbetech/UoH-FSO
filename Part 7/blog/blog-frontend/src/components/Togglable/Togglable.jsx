import { useState } from "react";

// mui components
import { Button } from "@mui/material";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="togglable">
      <div style={hideWhenVisible}>
        <Button variant="contained" size="small" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="contained" onClick={toggleVisibility}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Togglable;
